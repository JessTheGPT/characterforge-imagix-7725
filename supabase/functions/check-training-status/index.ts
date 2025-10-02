import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);

    if (userError || !user) {
      throw new Error('Invalid user token');
    }

    const { training_id } = await req.json();

    if (!training_id) {
      throw new Error('Training ID is required');
    }

    // Get user's fal.ai key
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('fal_ai_key')
      .eq('user_id', user.id)
      .single();

    if (profileError || !profile?.fal_ai_key) {
      throw new Error('fal.AI API key not found');
    }

    // Check status with fal.ai
    const statusResponse = await fetch(`https://queue.fal.run/fal-ai/flux-lora-fast-training/requests/${training_id}/status`, {
      headers: {
        'Authorization': `Key ${profile.fal_ai_key}`,
      },
    });

    if (!statusResponse.ok) {
      throw new Error(`Failed to check training status: ${statusResponse.status}`);
    }

    const statusData = await statusResponse.json();
    console.log('Training status:', statusData);

    // Update database if training is complete
    if (statusData.status === 'COMPLETED' && statusData.response_url) {
      const resultResponse = await fetch(statusData.response_url, {
        headers: {
          'Authorization': `Key ${profile.fal_ai_key}`,
        },
      });

      const resultData = await resultResponse.json();

      await supabase
        .from('lora_links')
        .update({
          status: 'completed',
          lora_url: resultData.diffusers_lora_file?.url || resultData.config_file?.url,
        })
        .eq('training_id', training_id)
        .eq('user_id', user.id);

      return new Response(
        JSON.stringify({
          status: 'completed',
          lora_url: resultData.diffusers_lora_file?.url || resultData.config_file?.url,
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        status: statusData.status.toLowerCase(),
        progress: statusData.logs?.length || 0,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error checking training status:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});