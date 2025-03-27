"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { Plus, Pencil, Trash2, Search, Tag } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { toast } from "react-hot-toast";
import KeywordModal from "./KeywordModal";

interface Keyword {
  _id?: string;
  word: string;
  category?: string;
  isActive: boolean;
}

export default function KeywordManager() {
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingKeyword, setEditingKeyword] = useState<Keyword | null>(null);

  // Fetch keywords on component mount
  useEffect(() => {
    fetchKeywords();
  }, []);

  const fetchKeywords = async () => {
    try {
      const response = await fetch("/api/keywords");
      if (!response.ok) throw new Error("Failed to fetch keywords");
      const data = await response.json();
      setKeywords(data);
    } catch (error: unknown) {
      console.error('Error fetching keywords:', error);
      toast.error("Failed to fetch keywords");
    }
  };

  const handleCreate = async (keywordData: Omit<Keyword, '_id'>) => {
    try {
      const response = await fetch("/api/keywords", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(keywordData),
      });

      if (!response.ok) throw new Error("Failed to create keyword");
      await fetchKeywords();
      setIsModalOpen(false);
      toast.success("Keyword created successfully");
    } catch (error) {
      console.error('Error create keyword:', error);
      toast.error("Failed to create keyword");
    }
  };

  const handleUpdate = async (keywordData: Keyword) => {
    if (!editingKeyword?._id) return;

    try {
      const response = await fetch(`/api/keywords/${editingKeyword._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(keywordData),
      });

      if (!response.ok) throw new Error("Failed to update keyword");
      await fetchKeywords();
      setIsModalOpen(false);
      setEditingKeyword(null);
      toast.success("Keyword updated successfully");
    } catch (error: unknown) {
      console.error('Error updating keyword:', error);
      toast.error("Failed to update keyword");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this keyword?")) return;

    try {
      const response = await fetch(`/api/keywords/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete keyword");
      await fetchKeywords();
      toast.success("Keyword deleted successfully");
    } catch (error: unknown) {
      console.error('Error deleting keyword:', error);
      toast.error("Failed to delete keyword");
    }
  };

  const filteredKeywords = keywords.filter((keyword) =>
    keyword.word.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="relative flex-1 w-full sm:max-w-xs">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search keywords..."
            className="pl-10 bg-background border-border focus:ring-ring"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button
          onClick={() => {
            setEditingKeyword(null);
            setIsModalOpen(true);
          }}
          leftIcon={
            <Plus className="w-4 h-4 mr-2" />
          }
        >
          Add Keyword
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredKeywords.map((keyword) => (
          <Card key={keyword._id} className="p-4">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-primary" />
                  <h3 className="font-semibold text-foreground">{keyword.word}</h3>
                </div>
                {keyword.category && (
                  <p className="text-sm text-muted-foreground">
                    Category: {keyword.category}
                  </p>
                )}
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${keyword.isActive
                      ? "bg-success/10 text-success"
                      : "bg-destructive/10 text-destructive"
                      }`}
                  >
                    {keyword.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setEditingKeyword(keyword);
                    setIsModalOpen(true);
                  }}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => keyword._id && handleDelete(keyword._id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {isModalOpen && (
        <KeywordModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingKeyword(null);
          }}
          onSubmit={editingKeyword ? handleUpdate : handleCreate}
          initialData={editingKeyword || undefined}
        />
      )}
    </div>
  );
} 