"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useState, useEffect } from "react";

interface UrlModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (url: { url: string; isActive: boolean }) => void;
  initialData?: { url: string; isActive: boolean };
}

export default function UrlModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: UrlModalProps) {
  const [formData, setFormData] = useState({
    url: "",
    isActive: true,
    ...initialData,
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({ url: "", isActive: true });
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-card text-card-foreground p-6 rounded-lg w-full max-w-md relative shadow-lg border border-border animate-in fade-in-0 zoom-in-95">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 hover:bg-muted"
          onClick={onClose}
        >
          <X className="h-4 w-4 text-muted-foreground" />
        </Button>

        <h2 className="text-xl font-semibold mb-4 text-foreground">
          {initialData ? "Edit URL" : "Add New URL"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-sm font-medium mb-1 text-foreground">URL</label>
            <input
              type="url"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              className="w-full p-2 rounded-md bg-input border border-border focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
              required
              placeholder="https://example.com"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="rounded border-border text-primary focus:ring-ring"
            />
            <label className="text-sm font-medium text-foreground">Active</label>
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-2 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="w-full sm:w-auto border-border hover:bg-muted"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {initialData ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
} 