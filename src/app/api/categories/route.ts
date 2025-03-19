import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { z } from "zod";

const categorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
  isActive: z.boolean(),
});

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("newsarchives");

    const categories = await db.collection("categories")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const validatedData = categorySchema.parse(data);

    const client = await clientPromise;
    const db = client.db("newsarchives");

    const result = await db.collection("categories").insertOne({
      ...validatedData,
      createdAt: new Date(),
    });

    const newCategory = {
      _id: result.insertedId,
      ...validatedData,
    };

    return NextResponse.json(newCategory);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to create category" },
      { status: 500 }
    );
  }
}
