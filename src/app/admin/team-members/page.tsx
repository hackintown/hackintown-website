"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/Card";
import Loader from "@/components/ui/Loader";

interface TeamMember {
  _id: string;
  name: string;
  designation: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export default function TeamMembersManagement() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentMember, setCurrentMember] = useState<TeamMember | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    image: "",
  });

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/team-members");
      if (!response.ok) throw new Error("Failed to fetch team members");
      
      const data = await response.json();
      setMembers(data);
    } catch (error) {
      console.error("Error fetching team members:", error);
      toast.error("Failed to load team members");
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
      name: "",
      designation: "",
      image: "",
    });
    setCurrentMember(null);
    setIsEditing(false);
  };

  const handleEdit = (member: TeamMember) => {
    setCurrentMember(member);
    setFormData({
      name: member.name,
      designation: member.designation,
      image: member.image,
    });
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this team member?")) return;
    
    try {
      const response = await fetch(`/api/team-members/${id}`, {
        method: "DELETE",
      });
      
      if (!response.ok) throw new Error("Failed to delete team member");
      
      toast.success("Team member deleted successfully");
      fetchMembers();
    } catch (error) {
      console.error("Error deleting team member:", error);
      toast.error("Failed to delete team member");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = isEditing && currentMember 
        ? `/api/team-members/${currentMember._id}` 
        : "/api/team-members";
      
      const method = isEditing ? "PUT" : "POST";
      
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) throw new Error(`Failed to ${isEditing ? 'update' : 'create'} team member`);
      
      toast.success(`Team member ${isEditing ? 'updated' : 'created'} successfully`);
      resetForm();
      fetchMembers();
    } catch (error) {
      console.error(`Error ${isEditing ? 'updating' : 'creating'} team member:`, error);
      toast.error(`Failed to ${isEditing ? 'update' : 'create'} team member`);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Team Members Management</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-1">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">
              {isEditing ? "Edit Team Member" : "Add New Team Member"}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Designation</label>
                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Image URL</label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
                {formData.image && (
                  <div className="mt-2 relative h-40 w-full overflow-hidden rounded-md">
                    <Image
                      src={formData.image}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
              
              <div className="flex gap-2 pt-2">
                <Button type="submit" variant="primary">
                  {isEditing ? "Update Member" : "Add Member"}
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
        
        {/* Team Members List Section */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Existing Team Members</h2>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader />
            </div>
          ) : members.length === 0 ? (
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 text-center">
              <p className="text-gray-500 dark:text-gray-400">No team members available. Add your first team member!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {members.map((member) => (
                <Card key={member._id} className="overflow-hidden">
                  <div className="relative h-48 w-full">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">{member.name}</h3>
                        <p className="text-sm text-primary">{member.designation}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => handleEdit(member)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => handleDelete(member._id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="mt-3 flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">
                        {new Date(member.updatedAt).toLocaleDateString()}
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