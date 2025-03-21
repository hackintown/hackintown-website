"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import Loader from "@/components/ui/Loader";

interface HeroContent {
  badge: string;
  title: string;
  description: string;
  flipWords: string[];
  buttonText: string;
}

export default function HeroContentManagement() {
  const [content, setContent] = useState<HeroContent>({
    badge: "",
    title: "",
    description: "",
    flipWords: [],
    buttonText: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [newFlipWord, setNewFlipWord] = useState("");

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch("/api/hero");
        if (response.ok) {
          const data = await response.json();
          setContent(data);
        }
      } catch (error) {
        console.error("Error fetching hero content:", error);
        toast.error("Failed to load hero content");
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/hero", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to update hero content");
      }

      toast.success("Hero content updated successfully");
    } catch (error) {
      console.error("Error updating hero content:", error);
      toast.error(error instanceof Error ? error.message : "Failed to update hero content");
    }
  };

  const addFlipWord = () => {
    if (newFlipWord.trim()) {
      setContent({
        ...content,
        flipWords: [...content.flipWords, newFlipWord.trim()]
      });
      setNewFlipWord("");
    }
  };

  const removeFlipWord = (index: number) => {
    setContent({
      ...content,
      flipWords: content.flipWords.filter((_, i) => i !== index)
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-8">Hero Content Management</h1>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
        <div>
          <label className="block text-sm font-medium mb-1">Badge Text</label>
          <input
            type="text"
            value={content.badge}
            onChange={(e) => setContent({ ...content, badge: e.target.value })}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            value={content.title}
            onChange={(e) => setContent({ ...content, title: e.target.value })}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={content.description}
            onChange={(e) => setContent({ ...content, description: e.target.value })}
            className="w-full p-2 border rounded-md"
            rows={4}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Flip Words</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={newFlipWord}
              onChange={(e) => setNewFlipWord(e.target.value)}
              className="flex-1 p-2 border rounded-md"
              placeholder="Add new flip word"
            />
            <Button type="button" onClick={addFlipWord}>Add</Button>
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            {content.flipWords.map((word, index) => (
              <div key={index} className="flex items-center bg-primary/10 rounded-full px-3 py-1">
                <span className="mr-2">{word}</span>
                <button
                  type="button"
                  onClick={() => removeFlipWord(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Button Text</label>
          <input
            type="text"
            value={content.buttonText}
            onChange={(e) => setContent({ ...content, buttonText: e.target.value })}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <Button type="submit" variant="primary" className="mt-4">
          Save Changes
        </Button>
      </form>
    </div>
  );
} 