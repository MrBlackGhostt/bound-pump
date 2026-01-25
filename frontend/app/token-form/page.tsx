"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TokenLaunchPage() {
  const [formData, setFormData] = useState({
    name: "",
    symbol: "",
    uri: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [uploadMethod, setUploadMethod] = useState<"url" | "file">("url");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Update preview if URL is changed
    if (name === "uri" && uploadMethod === "url") {
      setImagePreview(value);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement token creation logic
    console.log("Form Data:", formData);
    console.log("Image File:", imageFile);
    console.log("Upload Method:", uploadMethod);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10">
      <Card className="w-full max-w-2xl shadow-2xl border-2 bg-card/95 backdrop-blur">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Launch Your Token
            </CardTitle>
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <span className="text-2xl">🚀</span>
            </div>
          </div>
          <CardDescription className="text-base">
            Create your own token on Solana with bonding curve mechanics
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Token Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Token Name *
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="e.g., My Awesome Token"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="h-11"
              />
              <p className="text-xs text-muted-foreground">
                The full name of your token
              </p>
            </div>

            {/* Token Symbol */}
            <div className="space-y-2">
              <Label htmlFor="symbol" className="text-sm font-medium">
                Token Symbol *
              </Label>
              <Input
                id="symbol"
                name="symbol"
                placeholder="e.g., MAT"
                value={formData.symbol}
                onChange={handleInputChange}
                required
                className="h-11 uppercase"
                maxLength={10}
              />
              <p className="text-xs text-muted-foreground">
                Short ticker symbol (usually 3-5 characters)
              </p>
            </div>

            {/* Image/Metadata Upload */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Token Image *</Label>
              
              <Tabs defaultValue="url" className="w-full" onValueChange={(v) => setUploadMethod(v as "url" | "file")}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="url">Image URL</TabsTrigger>
                  <TabsTrigger value="file">Upload File</TabsTrigger>
                </TabsList>

                <TabsContent value="url" className="space-y-2">
                  <Input
                    id="uri"
                    name="uri"
                    type="url"
                    placeholder="https://example.com/token-image.png"
                    value={formData.uri}
                    onChange={handleInputChange}
                    required={uploadMethod === "url"}
                    className="h-11"
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter the URL of your token image (IPFS, Arweave, or any public URL)
                  </p>
                </TabsContent>

                <TabsContent value="file" className="space-y-2">
                  <div className="relative">
                    <Input
                      id="file"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      required={uploadMethod === "file"}
                      className="h-11 cursor-pointer"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Upload an image file (will be uploaded to IPFS)
                  </p>
                </TabsContent>
              </Tabs>

              {/* Image Preview */}
              {imagePreview && (
                <div className="mt-4 space-y-2">
                  <Label className="text-sm font-medium">Preview</Label>
                  <div className="relative w-32 h-32 rounded-lg border-2 border-border overflow-hidden bg-muted">
                    <img
                      src={imagePreview}
                      alt="Token preview"
                      className="w-full h-full object-cover"
                      onError={() => setImagePreview("")}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Token Economics Info */}
            <div className="rounded-lg bg-muted/50 p-4 space-y-2 border border-border">
              <h3 className="font-semibold text-sm flex items-center gap-2">
                <span>📊</span> Bonding Curve Economics
              </h3>
              <ul className="text-xs text-muted-foreground space-y-1 ml-6">
                <li>• Initial Supply: 1,000,000,000 tokens</li>
                <li>• Virtual SOL Reserve: 30 SOL</li>
                <li>• Virtual Token Reserve: 1,073,000,000 tokens</li>
                <li>• Graduation Threshold: 85 SOL market cap</li>
                <li>• Trading Fee: 1% on buys (sent to protocol)</li>
              </ul>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              className="w-full h-12 text-base font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg"
            >
              Create Token
            </Button>

            {/* Disclaimer */}
            <p className="text-xs text-center text-muted-foreground">
              By creating a token, you agree that you are responsible for the token's content and comply with all applicable laws.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
