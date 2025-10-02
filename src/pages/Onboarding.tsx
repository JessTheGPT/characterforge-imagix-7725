import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Upload, X, CheckCircle2, Loader2 } from "lucide-react";
import { MotionWrapper } from "@/components/ui/motion-wrapper";

const REQUIRED_IMAGES = 15;

export default function Onboarding() {
  const navigate = useNavigate();
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [training, setTraining] = useState(false);

  const handleFileSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    if (images.length + files.length > REQUIRED_IMAGES) {
      toast({
        title: "Too many images",
        description: `You can only upload ${REQUIRED_IMAGES} images`,
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      const newImages: string[] = [];

      for (const file of files) {
        // Convert to base64
        const reader = new FileReader();
        const base64Promise = new Promise<string>((resolve) => {
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });

        const base64 = await base64Promise;
        newImages.push(base64);
      }

      setImages((prev) => [...prev, ...newImages]);

      toast({
        title: "Images uploaded",
        description: `${newImages.length} image(s) added successfully`,
      });
    } catch (error) {
      console.error("Error uploading images:", error);
      toast({
        title: "Error",
        description: "Failed to upload images",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  }, [images.length]);

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleStartTraining = async () => {
    if (images.length < REQUIRED_IMAGES) {
      toast({
        title: "Not enough images",
        description: `Please upload at least ${REQUIRED_IMAGES} images`,
        variant: "destructive",
      });
      return;
    }

    setTraining(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error("No active session");
      }

      const response = await supabase.functions.invoke("train-lora", {
        body: { images },
      });

      if (response.error) {
        throw response.error;
      }

      toast({
        title: "Training started!",
        description: "Your LoRA model is being trained. Check the settings page for updates.",
      });

      navigate("/");
    } catch (error: any) {
      console.error("Error starting training:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to start training",
        variant: "destructive",
      });
    } finally {
      setTraining(false);
    }
  };

  const progress = (images.length / REQUIRED_IMAGES) * 100;

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl min-h-screen">
      <MotionWrapper type="fadeIn">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Create Your AI Model
          </h1>
          <p className="text-muted-foreground text-lg">
            Upload {REQUIRED_IMAGES} selfies or headshots to train your personalized LoRA model
          </p>
        </div>

        <Card className="mb-8 glass-card border-border/50">
          <CardHeader>
            <CardTitle className="text-foreground">Upload Progress</CardTitle>
            <CardDescription className="text-muted-foreground">
              {images.length} of {REQUIRED_IMAGES} images uploaded
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full bg-surface rounded-full h-3 mb-6">
              <div
                className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>

            {images.length < REQUIRED_IMAGES && (
              <div className="border-2 border-dashed border-border/50 rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                <input
                  type="file"
                  id="file-upload"
                  multiple
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  disabled={uploading}
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center gap-4"
                >
                  <Upload className="h-12 w-12 text-muted-foreground" />
                  <div>
                    <p className="text-lg font-medium text-foreground">
                      {uploading ? "Uploading..." : "Click to upload images"}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Upload {REQUIRED_IMAGES - images.length} more image(s)
                    </p>
                  </div>
                </label>
              </div>
            )}

            {images.length === REQUIRED_IMAGES && (
              <div className="bg-success/10 border border-success/50 rounded-lg p-6 text-center">
                <CheckCircle2 className="h-12 w-12 text-success mx-auto mb-3" />
                <p className="text-lg font-medium text-success">
                  All images uploaded! Ready to start training.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {images.length > 0 && (
          <Card className="mb-8 glass-card border-border/50">
            <CardHeader>
              <CardTitle className="text-foreground">Uploaded Images</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative group aspect-square">
                    <img
                      src={image}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg border border-border/50"
                    />
                    <button
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-2 right-2 bg-error text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Remove image"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex gap-4 justify-center">
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate("/")}
            disabled={training}
          >
            Cancel
          </Button>
          <Button
            variant="gradient"
            size="lg"
            onClick={handleStartTraining}
            disabled={images.length < REQUIRED_IMAGES || training}
          >
            {training ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Starting Training...
              </>
            ) : (
              "Start Training"
            )}
          </Button>
        </div>

        <Card className="mt-8 glass-card border-border/50">
          <CardHeader>
            <CardTitle className="text-foreground text-lg">Tips for Best Results</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Use clear, well-lit photos of your face</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Include variety: different angles, expressions, and lighting</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Avoid group photos or images with other people</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>High-resolution images work best (minimum 512x512px)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Training takes 10-30 minutes depending on image quality</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </MotionWrapper>
    </div>
  );
}