import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { z } from "zod";

const urlSchema = z.object({
  url: z.string().url("Invalid URL"),
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
        { error: "Invalid URL ID" },
        { status: 400 }
      );
    }

    const data = await request.json();
    const validatedData = urlSchema.parse(data);

    const client = await clientPromise;
    const db = client.db("newsarchives");
    
    const result = await db.collection("urls").findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: validatedData },
      { returnDocument: "after" }
    );

    if (!result) {
      return NextResponse.json(
        { error: "URL not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to update URL" },
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
        { error: "Invalid URL ID" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("newsarchives");
    
    const result = await db.collection("urls").deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "URL not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error Failed to delete URL:', error);
    return NextResponse.json(
      { error: "Failed to delete URL" },
      { status: 500 }
    );
  }
} 