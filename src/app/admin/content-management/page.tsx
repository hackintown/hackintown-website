"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { Pencil,Trash2, Users, Presentation, ChevronDown, ChevronUp } from "lucide-react";
import { Card } from "@/components/ui/Card";
import Loader from "@/components/ui/Loader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Team Member interface
interface TeamMember {
    _id: string;
    name: string;
    designation: string;
    image: string;
    createdAt: string;
    updatedAt: string;
}

// Hero Slide interface
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

export default function ContentManagementPage() {
    // State for active tab
    const [activeTab, setActiveTab] = useState("team-members");

    // Team Members state
    const [members, setMembers] = useState<TeamMember[]>([]);
    const [isLoadingMembers, setIsLoadingMembers] = useState(true);
    const [isEditingMember, setIsEditingMember] = useState(false);
    const [currentMember, setCurrentMember] = useState<TeamMember | null>(null);
    const [memberFormData, setMemberFormData] = useState({
        name: "",
        designation: "",
        image: "",
    });

    // Hero Slides state
    const [slides, setSlides] = useState<IHeroSlide[]>([]);
    const [isLoadingSlides, setIsLoadingSlides] = useState(true);
    const [isEditingSlide, setIsEditingSlide] = useState(false);
    const [currentSlide, setCurrentSlide] = useState<IHeroSlide | null>(null);
    const [slideFormData, setSlideFormData] = useState({
        title: "",
        tagline: "",
        description: "",
        imageUrl: "",
        ctaLabel: "",
        ctaLink: "",
    });

    // Sections collapse state
    const [sectionsOpen, setSectionsOpen] = useState({
        teamMembersForm: true,
        teamMembersList: true,
        slidesForm: true,
        slidesList: true
    });

    const toggleSection = (section: keyof typeof sectionsOpen) => {
        setSectionsOpen({
            ...sectionsOpen,
            [section]: !sectionsOpen[section]
        });
    };

    // Team Members functions
    useEffect(() => {
        if (activeTab === "team-members") {
            fetchMembers();
        }
    }, [activeTab]);

    const fetchMembers = async () => {
        try {
            setIsLoadingMembers(true);
            const response = await fetch("/api/team-members");
            if (!response.ok) throw new Error("Failed to fetch team members");

            const data = await response.json();
            setMembers(data);
        } catch (error) {
            console.error("Error fetching team members:", error);
            toast.error("Failed to fetch team members");
        } finally {
            setIsLoadingMembers(false);
        }
    };

    const handleMemberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setMemberFormData({
            ...memberFormData,
            [name]: value,
        });
    };

    const resetMemberForm = () => {
        setMemberFormData({
            name: "",
            designation: "",
            image: "",
        });
        setIsEditingMember(false);
        setCurrentMember(null);
    };

    const handleEditMember = (member: TeamMember) => {
        setCurrentMember(member);
        setMemberFormData({
            name: member.name,
            designation: member.designation,
            image: member.image,
        });
        setIsEditingMember(true);

        // Ensure the form section is open
        setSectionsOpen({
            ...sectionsOpen,
            teamMembersForm: true
        });

        // Scroll to form
        document.getElementById("team-members-form")?.scrollIntoView({ behavior: "smooth" });
    };

    const handleDeleteMember = async (id: string) => {
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

    const handleMemberSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const url = isEditingMember && currentMember
                ? `/api/team-members/${currentMember._id}`
                : "/api/team-members";

            const method = isEditingMember ? "PUT" : "POST";

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(memberFormData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to save team member");
            }

            toast.success(
                isEditingMember
                    ? "Team member updated successfully"
                    : "Team member added successfully"
            );

            resetMemberForm();
            fetchMembers();
        } catch (error) {
            console.error("Error saving team member:", error);
            toast.error(error instanceof Error ? error.message : "Failed to save team member");
        }
    };

    // Hero Slides functions
    useEffect(() => {
        if (activeTab === "hero-slides") {
            fetchSlides();
        }
    }, [activeTab]);

    const fetchSlides = async () => {
        try {
            setIsLoadingSlides(true);
            const response = await fetch("/api/hero-slides");
            if (!response.ok) throw new Error("Failed to fetch slides");

            const data = await response.json();
            setSlides(data);
        } catch (error) {
            console.error("Error fetching slides:", error);
            toast.error("Failed to fetch slides");
        } finally {
            setIsLoadingSlides(false);
        }
    };

    const handleSlideInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setSlideFormData({
            ...slideFormData,
            [name]: value,
        });
    };

    const resetSlideForm = () => {
        setSlideFormData({
            title: "",
            tagline: "",
            description: "",
            imageUrl: "",
            ctaLabel: "",
            ctaLink: "",
        });
        setIsEditingSlide(false);
        setCurrentSlide(null);
    };

    const handleEditSlide = (slide: IHeroSlide) => {
        setCurrentSlide(slide);
        setSlideFormData({
            title: slide.title,
            tagline: slide.tagline,
            description: slide.description,
            imageUrl: slide.imageUrl,
            ctaLabel: slide.ctaLabel,
            ctaLink: slide.ctaLink,
        });
        setIsEditingSlide(true);

        // Ensure the form section is open
        setSectionsOpen({
            ...sectionsOpen,
            slidesForm: true
        });

        // Scroll to form
        document.getElementById("hero-slides-form")?.scrollIntoView({ behavior: "smooth" });
    };

    const handleDeleteSlide = async (id: string) => {
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

    const handleSlideSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const url = isEditingSlide && currentSlide
                ? `/api/hero-slides/${currentSlide._id}`
                : "/api/hero-slides";

            const method = isEditingSlide ? "PUT" : "POST";

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(slideFormData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to save slide");
            }

            toast.success(
                isEditingSlide
                    ? "Slide updated successfully"
                    : "Slide added successfully"
            );

            resetSlideForm();
            fetchSlides();
        } catch (error) {
            console.error("Error saving slide:", error);
            toast.error(error instanceof Error ? error.message : "Failed to save slide");
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Content Management</h1>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="team-members" className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Team Members
                    </TabsTrigger>
                    <TabsTrigger value="hero-slides" className="flex items-center gap-2">
                        <Presentation className="h-4 w-4" />
                        Hero Slides
                    </TabsTrigger>
                </TabsList>

                {/* Team Members Tab Content */}
                <TabsContent value="team-members" className="space-y-6">
                    {/* Team Members Form */}
                    <Card className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold flex items-center gap-2">
                                <Users className="h-5 w-5" />
                                {isEditingMember ? "Edit Team Member" : "Add Team Member"}
                            </h2>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleSection('teamMembersForm')}
                                className="h-8 w-8 p-0"
                            >
                                {sectionsOpen.teamMembersForm ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                            </Button>
                        </div>

                        {sectionsOpen.teamMembersForm && (
                            <form id="team-members-form" onSubmit={handleMemberSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={memberFormData.name}
                                        onChange={handleMemberInputChange}
                                        className="w-full p-2 border rounded-md"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Designation</label>
                                    <input
                                        type="text"
                                        name="designation"
                                        value={memberFormData.designation}
                                        onChange={handleMemberInputChange}
                                        className="w-full p-2 border rounded-md"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Image URL</label>
                                    <input
                                        type="url"
                                        name="image"
                                        value={memberFormData.image}
                                        onChange={handleMemberInputChange}
                                        className="w-full p-2 border rounded-md"
                                        required
                                    />
                                    {memberFormData.image && (
                                        <div className="mt-2 relative h-40 w-full overflow-hidden rounded-md">
                                            <Image
                                                src={memberFormData.image}
                                                alt="Preview"
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    )}
                                </div>

                                <div className="flex gap-2 pt-2">
                                    <Button type="submit" variant="primary">
                                        {isEditingMember ? "Update Member" : "Add Member"}
                                    </Button>

                                    {isEditingMember && (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={resetMemberForm}
                                        >
                                            Cancel
                                        </Button>
                                    )}
                                </div>
                            </form>
                        )}
                    </Card>

                    {/* Team Members List */}
                    <Card className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold">Team Members List</h2>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleSection('teamMembersList')}
                                className="h-8 w-8 p-0"
                            >
                                {sectionsOpen.teamMembersList ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                            </Button>
                        </div>

                        {sectionsOpen.teamMembersList && (
                            <>
                                {isLoadingMembers ? (
                                    <div className="flex justify-center items-center h-64">
                                        <Loader />
                                    </div>
                                ) : members.length === 0 ? (
                                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 text-center">
                                        <p className="text-gray-500 dark:text-gray-400">No team members available. Add your first team member!</p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                                                                onClick={() => handleEditMember(member)}
                                                            >
                                                                <Pencil className="h-4 w-4" />
                                                            </Button>
                                                            <Button
                                                                size="sm"
                                                                variant="ghost"
                                                                onClick={() => handleDeleteMember(member._id)}
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
                            </>
                        )}
                    </Card>
                </TabsContent>

                {/* Hero Slides Tab Content */}
                <TabsContent value="hero-slides" className="space-y-6">
                    {/* Hero Slides Form */}
                    <Card className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold flex items-center gap-2">
                                <Presentation className="h-5 w-5" />
                                {isEditingSlide ? "Edit Hero Slide" : "Add Hero Slide"}
                            </h2>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleSection('slidesForm')}
                                className="h-8 w-8 p-0"
                            >
                                {sectionsOpen.slidesForm ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                            </Button>
                        </div>

                        {sectionsOpen.slidesForm && (
                            <form id="hero-slides-form" onSubmit={handleSlideSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={slideFormData.title}
                                        onChange={handleSlideInputChange}
                                        className="w-full p-2 border rounded-md"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Tagline</label>
                                    <input
                                        type="text"
                                        name="tagline"
                                        value={slideFormData.tagline}
                                        onChange={handleSlideInputChange}
                                        className="w-full p-2 border rounded-md"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Description</label>
                                    <textarea
                                        name="description"
                                        value={slideFormData.description}
                                        onChange={handleSlideInputChange}
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
                                        value={slideFormData.imageUrl}
                                        onChange={handleSlideInputChange}
                                        className="w-full p-2 border rounded-md"
                                        required
                                    />
                                    {slideFormData.imageUrl && (
                                        <div className="mt-2 relative h-40 w-full overflow-hidden rounded-md">
                                            <Image
                                                src={slideFormData.imageUrl}
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
                                        value={slideFormData.ctaLabel}
                                        onChange={handleSlideInputChange}
                                        className="w-full p-2 border rounded-md"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">CTA Link</label>
                                    <input
                                        type="url"
                                        name="ctaLink"
                                        value={slideFormData.ctaLink}
                                        onChange={handleSlideInputChange}
                                        className="w-full p-2 border rounded-md"
                                        required
                                    />
                                </div>

                                <div className="flex gap-2 pt-2">
                                    <Button type="submit" variant="primary">
                                        {isEditingSlide ? "Update Slide" : "Add Slide"}
                                    </Button>

                                    {isEditingSlide && (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={resetSlideForm}
                                        >
                                            Cancel
                                        </Button>
                                    )}
                                </div>
                            </form>
                        )}
                    </Card>

                    {/* Hero Slides List */}
                    <Card className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold">Hero Slides List</h2>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleSection('slidesList')}
                                className="h-8 w-8 p-0"
                            >
                                {sectionsOpen.slidesList ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                            </Button>
                        </div>

                        {sectionsOpen.slidesList && (
                            <>
                                {isLoadingSlides ? (
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
                                                                onClick={() => handleEditSlide(slide)}
                                                            >
                                                                <Pencil className="h-4 w-4" />
                                                            </Button>
                                                            <Button
                                                                size="sm"
                                                                variant="ghost"
                                                                onClick={() => handleDeleteSlide(slide._id)}
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
                            </>
                        )}
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
