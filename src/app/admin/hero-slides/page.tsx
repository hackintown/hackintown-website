"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/Card";
import Loader from "@/components/ui/Loader";

interface IHeroSlide {
  _id: string;
  title: string;
  tagline: string;
  description: string;
  imageUrl: string;
  ctaLabel: string;
  ctaLink: string;
  createdAt: string;
  updatedAt: string;
}

export default function HeroSlidesManagement() {
  const [slides, setSlides] = useState<IHeroSlide[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentSlide, setCurrentSlide] = useState<IHeroSlide | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    tagline: "",
    description: "",
    imageUrl: "",
    ctaLabel: "",
    ctaLink: "",
  });

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/hero-slides");
      if (!response.ok) throw new Error("Failed to fetch slides");

      const data = await response.json();
      setSlides(data);
    } catch (error) {
      console.error("Error fetching slides:", error);
      toast.error("Failed to load hero slides");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const resetForm = () => {
    setFormData({
      title: "",
      tagline: "",
      description: "",
      imageUrl: "",
      ctaLabel: "",
      ctaLink: "",
    });
    setCurrentSlide(null);
    setIsEditing(false);
  };

  const handleEdit = (slide: IHeroSlide) => {
    setCurrentSlide(slide);
    setFormData({
      title: slide.title,
      tagline: slide.tagline,
      description: slide.description,
      imageUrl: slide.imageUrl,
      ctaLabel: slide.ctaLabel,
      ctaLink: slide.ctaLink,
    });
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this slide?")) return;

    try {
      const response = await fetch(`/api/hero-slides/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete slide");

      toast.success("Slide deleted successfully");
      fetchSlides();
    } catch (error) {
      console.error("Error deleting slide:", error);
      toast.error("Failed to delete slide");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = isEditing && currentSlide
        ? `/api/hero-slides/${currentSlide._id}`
        : "/api/hero-slides";

      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error(`Failed to ${isEditing ? 'update' : 'create'} slide`);

      toast.success(`Slide ${isEditing ? 'updated' : 'created'} successfully`);
      resetForm();
      fetchSlides();
    } catch (error) {
      console.error(`Error ${isEditing ? 'updating' : 'creating'} slide:`, error);
      toast.error(`Failed to ${isEditing ? 'update' : 'create'} slide`);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Hero Slides Management</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-1">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">
              {isEditing ? "Edit Slide" : "Add New Slide"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Tagline</label>
                <input
                  type="text"
                  name="tagline"
                  value={formData.tagline}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  rows={3}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Image URL</label>
                <input
                  type="url"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
                {formData.imageUrl && (
                  <div className="mt-2 relative h-40 w-full overflow-hidden rounded-md">
                    <Image
                      src={formData.imageUrl}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">CTA Label</label>
                <input
                  type="text"
                  name="ctaLabel"
                  value={formData.ctaLabel}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">CTA Link</label>
                <input
                  type="url"
                  name="ctaLink"
                  value={formData.ctaLink}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>

              <div className="flex gap-2 pt-2">
                <Button type="submit" variant="primary">
                  {isEditing ? "Update Slide" : "Add Slide"}
                </Button>

                {isEditing && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={resetForm}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </Card>
        </div>

        {/* Slides List Section */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Existing Slides</h2>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader />
            </div>
          ) : slides.length === 0 ? (
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 text-center">
              <p className="text-gray-500 dark:text-gray-400">No slides available. Create your first slide!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {slides.map((slide) => (
                <Card key={slide._id} className="overflow-hidden">
                  <div className="relative h-48 w-full">
                    <Image
                      src={slide.imageUrl}
                      alt={slide.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">{slide.title}</h3>
                        <p className="text-sm text-primary">{slide.tagline}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEdit(slide)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(slide._id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                      {slide.description}
                    </p>

                    <div className="mt-3 flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">
                        {new Date(slide.updatedAt).toLocaleDateString()}
                      </span>
                      <span className="text-xs font-medium text-primary">
                        {slide.ctaLabel}
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 