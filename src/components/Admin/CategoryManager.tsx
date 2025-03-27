import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { toast } from "react-hot-toast";
import CategoryModal from "./CategoryModal";

interface Category {
  _id?: string;
  name: string;
  description?: string;
  isActive: boolean;
}

export default function CategoryManager() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  // Fetch categories
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error("Failed to fetch categories");
    }
  };

  const handleCreate = async (categoryData: Omit<Category, '_id'>) => {
    try {
      const response = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(categoryData),
      });

      if (!response.ok) throw new Error("Failed to create category");

      const newCategory = await response.json();
      if (!newCategory._id) throw new Error("Invalid response from server");
      setCategories([...categories, newCategory]);
      toast.success("Category created successfully");
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Failed to create category");
      console.error(error);
    }
  };

  const handleUpdate = async (categoryData: Omit<Category, '_id'>) => {
    if (!editingCategory?._id) return;

    try {
      const response = await fetch(`/api/categories/${editingCategory._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(categoryData),
      });

      if (!response.ok) throw new Error("Failed to update category");

      const updatedCategory = await response.json();
      setCategories(categories.map(cat =>
        cat._id === editingCategory._id ? { ...updatedCategory, _id: editingCategory._id } : cat
      ));
      toast.success("Category updated successfully");
      setIsModalOpen(false);
      setEditingCategory(null);
    } catch (error) {
      toast.error("Failed to update category");
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    try {
      const response = await fetch(`/api/categories/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete category");

      setCategories(categories.filter(cat => cat._id !== id));
      toast.success("Category deleted successfully");
    } catch (error) {
      toast.error("Failed to delete category");
      console.error(error);
    }
  };

  // Filter categories based on search term
  const filteredCategories = categories.filter(category =>
    (category.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (category.description?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search categories..."
            className="pl-10 bg-background border-border focus:ring-ring"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button
          onClick={() => {
            setEditingCategory(null);
            setIsModalOpen(true);
          }}
          leftIcon={<Plus className="h-4 w-4" />}
        >
          Add Category
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCategories.map((category) => (
          <Card
            key={category._id}
            className="p-4 bg-card text-card-foreground hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <h3 className="font-semibold text-foreground">{category.name}</h3>
                {category.description && (
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                )}
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${category.isActive
                  ? 'bg-success/10 text-success'
                  : 'bg-destructive/10 text-destructive'
                  }`}>
                  {category.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setEditingCategory(category);
                    setIsModalOpen(true);
                  }}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(category._id!)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {isModalOpen && (
        <CategoryModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingCategory(null);
          }}
          onSubmit={editingCategory ? handleUpdate : handleCreate}
          initialData={editingCategory || undefined}
        />
      )}
    </div>
  );
}
