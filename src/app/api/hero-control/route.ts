import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("hackintowndb");
    
    const heroControl = await db.collection("heroControl").findOne({ id: "main" });
    
    return NextResponse.json(
      heroControl || { 
        id: "main", 
        primaryHeroVisible: true, 
        secondaryHeroVisible: true,
        primaryHeroOrder: 1,
        secondaryHeroOrder: 2
      }
    );
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
    
    const client = await clientPromise;
    // const db = client.db("hackintowndb");
    
    // Ensure we have the required fields
    const updateData = {
      primaryHeroVisible: Boolean(data.primaryHeroVisible),
      secondaryHeroVisible: Boolean(data.secondaryHeroVisible),
      primaryHeroOrder: Number(data.primaryHeroOrder) || 1,
      secondaryHeroOrder: Number(data.secondaryHeroOrder) || 2,
      updatedAt: new Date().toISOString()
    };
    
    // const result = await db.collection("heroControl").updateOne(
    //   { id: "main" },
    //   { 
    //     $set: updateData,
    //     $setOnInsert: { id: "main", createdAt: new Date().toISOString() }
    //   },
    //   { upsert: true }
    // );
    
    return NextResponse.json({
      success: true,
      message: "Hero control settings updated successfully",
      data: { id: "main", ...updateData }
    });
  } catch (error) {
    console.error("Error updating hero control settings:", error);
    return NextResponse.json(
      { error: "Failed to update hero control settings" },
      { status: 500 }
    );
  }
}
