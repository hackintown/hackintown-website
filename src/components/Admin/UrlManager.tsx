"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { Plus, Pencil, Trash2, Search, Globe } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { toast } from "react-hot-toast";
import UrlModal from "./UrlModal";

interface SourceUrl {
  _id?: string;
  url: string;
  isActive: boolean;
}

export default function UrlManager() {
  const [urls, setUrls] = useState<SourceUrl[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUrl, setEditingUrl] = useState<SourceUrl | null>(null);

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    try {
      const response = await fetch("/api/urls");
      const data = await response.json();
      setUrls(data);
    } catch (error: unknown) {
      console.error('Failed to fetch URLs:', error);
      toast.error("Failed to fetch URLs");
    }
  };

  const filteredUrls = urls.filter(url =>
    (url?.url?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    url?.url?.toLowerCase().includes(searchTerm.toLowerCase())) ?? false
  );

  const handleCreate = async (data: Omit<SourceUrl, '_id'>) => {
    try {
      const response = await fetch("/api/urls", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to create URL");

      const newUrl = await response.json();
      setUrls([...urls, newUrl]);
      toast.success("URL created successfully");
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Failed to create URL");
      console.error(error);
    }
  };

  const handleUpdate = async (data: SourceUrl) => {
    try {
      const response = await fetch(`/api/urls/${editingUrl?._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to update URL");

      const updatedUrl = await response.json();
      setUrls(urls.map(url => 
        url._id === updatedUrl._id ? updatedUrl : url
      ));
      toast.success("URL updated successfully");
      setIsModalOpen(false);
      setEditingUrl(null);
    } catch (error) {
      toast.error("Failed to update URL");
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this URL?")) return;

    try {
      const response = await fetch(`/api/urls/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete URL");

      setUrls(urls.filter(url => url._id !== id));
      toast.success("URL deleted successfully");
    } catch (error) {
      toast.error("Failed to delete URL");
      console.error(error);
    }
  };

  return (
    <div className="space-y-6 p-4 sm:p-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-foreground">Source URLs</h2>
        <Button
          onClick={() => setIsModalOpen(true)}
          leftIcon={<Plus className="w-4 h-4" />}
        >
        Add URL
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search URLs..."
          className="pl-10 bg-background border-border focus:ring-ring"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredUrls.map((url) => (
          <Card
            key={url._id}
            className="p-4 bg-card text-card-foreground hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <a
                  href={url.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:text-primary/90 flex items-center gap-1 transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  <span className="truncate max-w-[200px]">{url.url}</span>
                </a>
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${url.isActive
                      ? 'bg-success/10 text-success'
                      : 'bg-destructive/10 text-destructive'
                    }`}>
                    {url.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:bg-muted"
                  onClick={() => {
                    setEditingUrl(url);
                    setIsModalOpen(true);
                  }}
                >
                  <Pencil className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:bg-destructive/10"
                  onClick={() => handleDelete(url._id!)}
                >
                  <Trash2 className="w-4 h-4 text-destructive hover:text-destructive/80" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {isModalOpen && (
        <UrlModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingUrl(null);
          }}
          onSubmit={editingUrl ? handleUpdate : handleCreate}
          initialData={editingUrl || undefined}
        />
      )}
    </div>
  );
} 