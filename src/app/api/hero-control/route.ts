import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { z } from "zod";

// Define schema for validation
const heroControlSchema = z.object({
  primaryHeroVisible: z.boolean(),
  secondaryHeroVisible: z.boolean(),
  primaryHeroOrder: z.number().int().positive(),
  secondaryHeroOrder: z.number().int().positive(),
});

// Default values
const DEFAULT_HERO_CONTROL = {
  id: "main",
  primaryHeroVisible: true,
  secondaryHeroVisible: true,
  primaryHeroOrder: 1,
  secondaryHeroOrder: 2,
};

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("hackintowndb");
    
    const heroControl = await db.collection("heroControl").findOne({ id: "main" });
    
    return NextResponse.json(heroControl || DEFAULT_HERO_CONTROL);
  } catch (error) {
    console.error("Error fetching hero control settings:", error);
    return NextResponse.json(
      { error: "Failed to fetch hero control settings" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    
    // Validate input data
    const validationResult = heroControlSchema.safeParse({
      primaryHeroVisible: Boolean(data.primaryHeroVisible),
      secondaryHeroVisible: Boolean(data.secondaryHeroVisible),
      primaryHeroOrder: Number(data.primaryHeroOrder) || 1,
      secondaryHeroOrder: Number(data.secondaryHeroOrder) || 2,
    });
    
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Invalid input data", details: validationResult.error.format() },
        { status: 400 }
      );
    }
    
    const updateData = {
      ...validationResult.data,
      updatedAt: new Date().toISOString()
    };
    
    const client = await clientPromise;
    const db = client.db("hackintowndb");
    
    await db.collection("heroControl").updateOne(
      { id: "main" },
      { 
        $set: updateData,
        $setOnInsert: { id: "main", createdAt: new Date().toISOString() }
      },
      { upsert: true }
    );
    
    return NextResponse.json({
      success: true,
      message: "Hero control settings updated successfully",
      data: { id: "main", ...updateData }
    });
  } catch (error) {
    console.error("Error updating hero control settings:", error);
    
    // Check if it's a JSON parsing error
    if (error instanceof SyntaxError && error.message.includes('JSON')) {
      return NextResponse.json(
        { error: "Invalid JSON in request body" },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: "Failed to update hero control settings" },
      { status: 500 }
    );
  }
}
