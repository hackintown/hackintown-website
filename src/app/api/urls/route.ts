import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { z } from "zod";

const urlSchema = z.object({
  url: z.string().url("Invalid URL"),
  isActive: z.boolean(),
});

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("newsarchives");
    const urls = await db.collection("urls")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    
    return NextResponse.json(urls);
  } catch (error) {
    console.error('Error fetching URLs:', error);
    return NextResponse.json(
      { error: "Failed to fetch URLs" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const validatedData = urlSchema.parse(data);

    const client = await clientPromise;
    const db = client.db("newsarchives");
    
    const result = await db.collection("urls").insertOne({
      ...validatedData,
      createdAt: new Date(),
    });

    const newUrl = {
      _id: result.insertedId,
      ...validatedData,
    };

    return NextResponse.json(newUrl);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to create URL" },
      { status: 500 }
    );
  }
} 