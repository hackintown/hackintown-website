import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { z } from "zod";

const teamMemberSchema = z.object({
  name: z.string().min(1, "Name is required"),
  designation: z.string().min(1, "Designation is required"),
  image: z.string().url("Image must be a valid URL"),
});

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> } 
) {
  try {
    const { id } = await Promise.resolve(params);
    
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid ID format" },
        { status: 400 }
      );
    }
    
    const client = await clientPromise;
    const db = client.db("hackintowndb");
    
    const teamMember = await db
      .collection("team-members")
      .findOne({ _id: new ObjectId(id) });
    
    if (!teamMember) {
      return NextResponse.json(
        { error: "Team member not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(teamMember);
  } catch (error) {
    console.error("Error fetching team member:", error);
    return NextResponse.json(
      { error: "Failed to fetch team member" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await Promise.resolve(params);
    
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid ID format" },
        { status: 400 }
      );
    }
    
    const data = await request.json();
    
    // Validate input data
    const validatedData = teamMemberSchema.parse(data);
    
    const client = await clientPromise;
    const db = client.db("hackintowndb");
    
    const result = await db.collection("team-members").updateOne(
      { _id: new ObjectId(id) },
      { 
        $set: {
          ...validatedData,
          updatedAt: new Date()
        } 
      }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "Team member not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: "Team member updated successfully"
    });
  } catch (error) {
    console.error("Error updating team member:", error);
    
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
      { error: "Failed to update team member" },
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
        { error: "Invalid ID format" },
        { status: 400 }
      );
    }
    
    const client = await clientPromise;
    const db = client.db("hackintowndb");
    
    const result = await db
      .collection("team-members")
      .deleteOne({ _id: new ObjectId(id) });
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "Team member not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: "Team member deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting team member:", error);
    return NextResponse.json(
      { error: "Failed to delete team member" },
      { status: 500 }
    );
  }
} 