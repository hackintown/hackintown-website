import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { z } from "zod";

const heroSchema = z.object({
    badge: z.string().min(1, "Badge is required"),
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    flipWords: z.array(z.string()).min(1, "At least one flip word is required"),
    buttonText: z.string().min(1, "Button text is required"),
});

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("hackintowndb");

        // Get the hero content - assuming there's only one document
        const heroContent = await db.collection("hero-content").findOne({});

        if (!heroContent) {
            // Return default values if no content exists
            return NextResponse.json({
                badge: "Trusted by Global Enterprise Leaders",
                title: "Professional IT Solutions for",
                description: "Comprehensive IT services including custom software development, cloud solutions, enterprise systems, and digital transformation. From MVF development to full-scale enterprise solutions, we deliver excellence.",
                flipWords: [
                    "Mobile App Development",
                    "Custom Development",
                    "Cloud Architecture",
                    "Digital Transformation",
                    "DevOps Excellence",
                ],
                buttonText: "Talk to an Expert",
            });
        }

        return NextResponse.json(heroContent);
    } catch (error) {
        console.error("Error fetching hero content:", error);
        return NextResponse.json(
            { error: "Failed to fetch hero content" },
            { status: 500 }
        );
    }
}

export async function PUT(request: Request) {
    try {
        const data = await request.json();

        // Validate input data
        const validatedData = heroSchema.parse(data);

        const client = await clientPromise;
        const db = client.db("hackintowndb");

        // Update or create the hero content
        await db.collection("hero-content").updateOne(
            {}, // Empty filter to match any document
            {
                $set: {
                    ...validatedData,
                    updatedAt: new Date()
                }
            },
            { upsert: true } // Create if doesn't exist
        );

        return NextResponse.json({
            success: true,
            message: "Hero content updated successfully"
        });
    } catch (error) {
        console.error("Error updating hero content:", error);

        // Handle validation errors
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                {
                    error: "Validation failed",
                    details: error.errors
                },
                { status: 400 }
            );
        }

        // Handle other errors
        return NextResponse.json(
            { error: "Failed to update hero content" },
            { status: 500 }
        );
    }
} 