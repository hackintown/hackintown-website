"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { ArrowUpDown, Eye, EyeOff, SaveIcon } from "lucide-react";
import { Card } from "@/components/ui/Card";
import Loader from "@/components/ui/Loader";

interface HeroControlSettings {
  id: string;
  primaryHeroVisible: boolean;
  secondaryHeroVisible: boolean;
  primaryHeroOrder: number;
  secondaryHeroOrder: number;
}

export default function HeroControlPage() {
  const [settings, setSettings] = useState<HeroControlSettings>({
    id: "main",
    primaryHeroVisible: true,
    secondaryHeroVisible: true,
    primaryHeroOrder: 1,
    secondaryHeroOrder: 2
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/hero-control");

      if (!response.ok) {
        throw new Error("Failed to fetch hero control settings");
      }

      const data = await response.json();
      setSettings(data);
    } catch (error) {
      console.error("Error fetching hero control settings:", error);
      toast.error("Failed to load hero settings");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const response = await fetch("/api/hero-control", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settings),
      });

      if (!response.ok) {
        throw new Error("Failed to update hero control settings");
      }

      toast.success("Hero settings saved successfully");
    } catch (error) {
      console.error("Error saving hero control settings:", error);
      toast.error("Failed to save hero settings");
    } finally {
      setIsSaving(false);
    }
  };

  const toggleVisibility = (hero: 'primary' | 'secondary') => {
    if (hero === 'primary') {
      setSettings({
        ...settings,
        primaryHeroVisible: !settings.primaryHeroVisible
      });
    } else {
      setSettings({
        ...settings,
        secondaryHeroVisible: !settings.secondaryHeroVisible
      });
    }
  };

  const swapOrder = () => {
    setSettings({
      ...settings,
      primaryHeroOrder: settings.secondaryHeroOrder,
      secondaryHeroOrder: settings.primaryHeroOrder
    });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Hero Sections Control</h1>
        <Button
          onClick={handleSave}
          disabled={isSaving}
          variant="primary"
          size="md"
          leftIcon={<SaveIcon />}
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <p className="text-muted-foreground">
        Control which hero sections are visible on the homepage and their display order.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 relative">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-xl font-semibold">Primary Hero</h2>
              <p className="text-sm text-muted-foreground">Main hero section with slider</p>
            </div>
            <Button
              variant="primary"
              size="icon"
              onClick={() => toggleVisibility('primary')}
              title={settings.primaryHeroVisible ? "Hide section" : "Show section"}
            >
              {settings.primaryHeroVisible ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
            </Button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Visibility:</span>
              <span className={`text-sm font-medium ${settings.primaryHeroVisible ? 'text-green-500' : 'text-red-500'}`}>
                {settings.primaryHeroVisible ? 'Visible' : 'Hidden'}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Display Order:</span>
              <span className="text-sm font-medium">{settings.primaryHeroOrder}</span>
            </div>
          </div>

        </Card>

        <Card className="p-6 relative">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-xl font-semibold">Secondary Hero</h2>
              <p className="text-sm text-muted-foreground">Alternative hero section with stats</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => toggleVisibility('secondary')}
              title={settings.secondaryHeroVisible ? "Hide section" : "Show section"}
            >
              {settings.secondaryHeroVisible ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
            </Button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Visibility:</span>
              <span className={`text-sm font-medium ${settings.secondaryHeroVisible ? 'text-green-500' : 'text-red-500'}`}>
                {settings.secondaryHeroVisible ? 'Visible' : 'Hidden'}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Display Order:</span>
              <span className="text-sm font-medium">{settings.secondaryHeroOrder}</span>
            </div>
          </div>

        </Card>
      </div>

      <div className="flex justify-center mt-8">
        <Button
          onClick={swapOrder}
          variant="outline"
          className="flex items-center gap-2"
        >
          <ArrowUpDown className="h-4 w-4" />
          Swap Display Order
        </Button>
      </div>

      <Card className="p-6 mt-6">
        <h3 className="text-lg font-medium mb-4">Preview</h3>
        <div className="border rounded-md p-4 bg-muted/30">
          <div className="space-y-4">
            {[...Array(2)].map((_, i) => {
              const order = i + 1;
              let heroType = null;

              if (settings.primaryHeroOrder === order && settings.primaryHeroVisible) {
                heroType = "Primary Hero";
              } else if (settings.secondaryHeroOrder === order && settings.secondaryHeroVisible) {
                heroType = "Secondary Hero";
              }

              if (!heroType) return null;

              return (
                <div key={i} className="border border-dashed border-border p-4 rounded-md">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{order}. {heroType}</span>
                    <span className="text-xs text-muted-foreground">
                      {heroType === "Primary Hero" ? "Slider-based hero" : "Stats-based hero"}
                    </span>
                  </div>
                </div>
              );
            })}

            {!settings.primaryHeroVisible && !settings.secondaryHeroVisible && (
              <div className="text-center py-8 text-muted-foreground">
                No hero sections will be displayed
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
