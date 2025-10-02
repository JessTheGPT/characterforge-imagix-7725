import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Copy, Trash2, Eye, EyeOff, RefreshCw } from "lucide-react";
import { MotionWrapper } from "@/components/ui/motion-wrapper";

interface Profile {
  id: string;
  user_id: string;
  full_name: string | null;
  fal_ai_key: string | null;
}

interface LoraLink {
  id: string;
  lora_url: string;
  status: string;
  created_at: string;
  training_id: string | null;
}

export default function Settings() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loraLinks, setLoraLinks] = useState<LoraLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [showApiKey, setShowApiKey] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [fullName, setFullName] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadProfile();
    loadLoraLinks();
  }, []);

  const loadProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (error) throw error;

      setProfile(data);
      setFullName(data.full_name || "");
      setApiKey(data.fal_ai_key || "");
    } catch (error) {
      console.error("Error loading profile:", error);
      toast({
        title: "Error",
        description: "Failed to load profile settings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const loadLoraLinks = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("lora_links")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setLoraLinks(data || []);
    } catch (error) {
      console.error("Error loading lora links:", error);
    }
  };

  const handleSaveProfile = async () => {
    if (!profile) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: fullName,
          fal_ai_key: apiKey,
        })
        .eq("user_id", profile.user_id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Settings saved successfully",
      });
      
      loadProfile();
    } catch (error) {
      console.error("Error saving profile:", error);
      toast({
        title: "Error",
        description: "Failed to save settings",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleCopyLoraLink = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: "Copied",
      description: "LoRA link copied to clipboard",
    });
  };

  const handleDeleteLoraLink = async (id: string) => {
    try {
      const { error } = await supabase
        .from("lora_links")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "LoRA link deleted successfully",
      });
      
      loadLoraLinks();
    } catch (error) {
      console.error("Error deleting lora link:", error);
      toast({
        title: "Error",
        description: "Failed to delete LoRA link",
        variant: "destructive",
      });
    }
  };

  const handleRefreshStatus = async (link: LoraLink) => {
    if (!link.training_id) return;

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("No session");

      const response = await supabase.functions.invoke("check-training-status", {
        body: { training_id: link.training_id },
      });

      if (response.error) throw response.error;

      toast({
        title: "Status Updated",
        description: `Training status: ${response.data.status}`,
      });
      
      loadLoraLinks();
    } catch (error) {
      console.error("Error refreshing status:", error);
      toast({
        title: "Error",
        description: "Failed to refresh training status",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <MotionWrapper type="fadeIn">
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Settings
        </h1>

        {/* Profile Settings */}
        <Card className="mb-8 glass-card border-border/50">
          <CardHeader>
            <CardTitle className="text-foreground">Profile Settings</CardTitle>
            <CardDescription className="text-muted-foreground">
              Manage your account information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-foreground">Full Name</Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                className="bg-surface/50 border-border/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="apiKey" className="text-foreground">fal.AI API Key</Label>
              <div className="flex gap-2">
                <Input
                  id="apiKey"
                  type={showApiKey ? "text" : "password"}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter your fal.AI API key"
                  className="bg-surface/50 border-border/50"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="flex-shrink-0"
                >
                  {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Get your API key from{" "}
                <a
                  href="https://fal.ai/dashboard/keys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  fal.ai/dashboard/keys
                </a>
              </p>
            </div>

            <Button
              onClick={handleSaveProfile}
              disabled={saving}
              className="w-full"
              variant="gradient"
            >
              {saving ? "Saving..." : "Save Settings"}
            </Button>
          </CardContent>
        </Card>

        {/* LoRA Links */}
        <Card className="glass-card border-border/50">
          <CardHeader>
            <CardTitle className="text-foreground">Your LoRA Links</CardTitle>
            <CardDescription className="text-muted-foreground">
              Manage your trained LoRA models
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loraLinks.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No LoRA models yet. Complete the onboarding to create your first model.
              </p>
            ) : (
              <div className="space-y-4">
                {loraLinks.map((link) => (
                  <div
                    key={link.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg bg-surface/50 border border-border/50"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            link.status === "completed"
                              ? "bg-success/20 text-success"
                              : link.status === "training"
                              ? "bg-warning/20 text-warning"
                              : "bg-error/20 text-error"
                          }`}
                        >
                          {link.status}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(link.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-foreground truncate font-mono">
                        {link.lora_url || "Processing..."}
                      </p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      {link.status === "training" && link.training_id && (
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleRefreshStatus(link)}
                        >
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                      )}
                      {link.lora_url && (
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleCopyLoraLink(link.lora_url)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDeleteLoraLink(link.id)}
                        className="text-error hover:text-error"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </MotionWrapper>
    </div>
  );
}