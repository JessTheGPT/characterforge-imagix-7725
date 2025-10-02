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

    const { images } = await req.json();

    if (!images || images.length < 5) {
      throw new Error('At least 5 images are required for training');
    }

    // Get user's fal.ai key from profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('fal_ai_key')
      .eq('user_id', user.id)
      .single();

    if (profileError || !profile?.fal_ai_key) {
      throw new Error('fal.AI API key not found in user profile');
    }

    console.log('Starting LoRA training with fal.ai...');

    // Call fal.ai API to start training
    const falResponse = await fetch('https://queue.fal.run/fal-ai/flux-lora-fast-training', {
      method: 'POST',
      headers: {
        'Authorization': `Key ${profile.fal_ai_key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        images_data_url: images,
        trigger_word: 'TOK',
        steps: 1000,
        lora_rank: 16,
      }),
    });

    if (!falResponse.ok) {
      const errorText = await falResponse.text();
      console.error('fal.ai API error:', errorText);
      throw new Error(`fal.ai API error: ${falResponse.status} - ${errorText}`);
    }

    const falData = await falResponse.json();
    console.log('Training started:', falData);

    // Store the training request in database
    const { data: loraLink, error: loraError } = await supabase
      .from('lora_links')
      .insert({
        user_id: user.id,
        lora_url: falData.diffusers_lora_file?.url || '',
        status: 'training',
        training_id: falData.request_id || falData.id,
      })
      .select()
      .single();

    if (loraError) {
      console.error('Database error:', loraError);
      throw new Error('Failed to save training data');
    }

    // Store training images
    const imageRecords = images.map((imageUrl: string) => ({
      user_id: user.id,
      image_url: imageUrl,
      lora_link_id: loraLink.id,
    }));

    await supabase.from('training_images').insert(imageRecords);

    return new Response(
      JSON.stringify({
        success: true,
        lora_link_id: loraLink.id,
        training_id: falData.request_id || falData.id,
        message: 'LoRA training started successfully',
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in train-lora function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});