import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { z } from "zod";

const keywordSchema = z.object({
    word: z.string().min(1, "Keyword is required"),
    category: z.string().optional(),
    isActive: z.boolean(),
});

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await Promise.resolve(params);
        if (!ObjectId.isValid(id)) {
            return NextResponse.json(
                { error: "Invalid keyword ID" },
                { status: 400 }
            );
        }

        const data = await request.json();
        const validatedData = keywordSchema.parse(data);

        const client = await clientPromise;
        const db = client.db("newsarchives");

        const result = await db.collection("keywords").updateOne(
            { _id: new ObjectId(id) },
            { $set: validatedData }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json(
                { error: "Keyword not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: "Validation failed", details: error.errors },
                { status: 400 }
            );
        }
        return NextResponse.json(
            { error: "Failed to update keyword" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await Promise.resolve(params);
        if (!ObjectId.isValid(id)) {
            return NextResponse.json(
                { error: "Invalid keyword ID" },
                { status: 400 }
            );
        }

        const client = await clientPromise;
        const db = client.db("newsarchives");

        const result = await db.collection("keywords").deleteOne({
            _id: new ObjectId(id),
        });

        if (result.deletedCount === 0) {
            return NextResponse.json(
                { error: "Keyword not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error delete keyword:", error);
        return NextResponse.json(
            { error: "Failed to delete keyword" },
            { status: 500 }
        );
    }
} 