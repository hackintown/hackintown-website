import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { z } from "zod";

const teamMemberSchema = z.object({
  name: z.string().min(1, "Name is required"),
  designation: z.string().min(1, "Designation is required"),
  image: z.string().url("Image must be a valid URL"),
});

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("hackintowndb");
    
    const teamMembers = await db
      .collection("team-members")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    
    return NextResponse.json(teamMembers);
  } catch (error) {
    console.error("Error fetching team members:", error);
    return NextResponse.json(
      { error: "Failed to fetch team members" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Validate input data
    const validatedData = teamMemberSchema.parse(data);
    
    const client = await clientPromise;
    const db = client.db("hackintowndb");
    
    const now = new Date();
    
    const result = await db.collection("team-members").insertOne({
      ...validatedData,
      createdAt: now,
      updatedAt: now,
    });
    
    return NextResponse.json({
      _id: result.insertedId,
      ...validatedData,
      createdAt: now,
      updatedAt: now,
    });
  } catch (error) {
    console.error("Error creating team member:", error);
    
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
      { error: "Failed to create team member" },
      { status: 500 }
    );
  }
} 