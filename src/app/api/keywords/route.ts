import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { z } from "zod";

const keywordSchema = z.object({
  word: z.string().min(1, "Keyword is required"),
  category: z.string().optional(),
  isActive: z.boolean(),
});

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("newsarchives");
    const keywords = await db.collection("keywords").find().toArray();
    return NextResponse.json(keywords);
  } catch (error) {
    console.error('Error Failed to fetch keywords:', error);
    return NextResponse.json(
      { error: "Failed to fetch keywords" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const validatedData = keywordSchema.parse(data);
    
    const client = await clientPromise;
    const db = client.db("newsarchives");
    const result = await db.collection("keywords").insertOne(validatedData);
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error Failed to create keyword:', error);
    return NextResponse.json(
      { error: "Failed to create keyword" },
      { status: 500 }
    );
  }
} 