import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("hackintowndb");
    
    // Get the most recent secondary hero data
    const heroData = await db
      .collection("secondaryHero")
      .findOne({}, { sort: { updatedAt: -1 } });
    
    if (!heroData) {
      // Return default data if none exists in the database
      return NextResponse.json({
        _id: "default",
        tagline: "Next-Generation Platform",
        title: "Next.js SaaS Boilerplate with Modern UI",
        description: "Build scalable applications with our feature-rich template. Designed for developers who value clean code, performance, and exceptional user experience.",
        imageUrl: "https://base.demo.nextjstemplates.com/_next/image?url=%2Fimages%2Fhero%2Fhero.png&w=750&q=75",
        ctaLabel: "Get Started Now",
        ctaLink: "#",
        phoneNumber: "(+91) 8851967714",
        phoneText: "For any question or concern",
        stats: [
          { value: "99.9%", label: "Uptime" },
          { value: "24/7", label: "Support" },
          { value: "10k+", label: "Happy Users" }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    }
    
    return NextResponse.json(heroData);
  } catch (error) {
    console.error("Error fetching secondary hero data:", error);
    return NextResponse.json(
      { error: "Failed to fetch secondary hero data" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    const client = await clientPromise;
    const db = client.db("hackintowndb");
    
    // Check if _id is "default" and handle it specially
    if (data._id === "default") {
      // Create a new record without the _id field
      const { _id, ...newData } = data;
      
      const heroData = {
        ...newData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      const result = await db.collection("secondaryHero").insertOne(heroData);
      const created = await db.collection("secondaryHero").findOne({ _id: result.insertedId });
      return NextResponse.json(created);
    }
    
    // Add timestamps
    const heroData = {
      ...data,
      updatedAt: new Date().toISOString(),
    };
    
    // If there's an _id, update the existing record
    if (data._id && data._id !== "default") {
      try {
        const { _id, ...updateData } = heroData;
        const objectId = new ObjectId(_id);
        
        const result = await db.collection("secondaryHero").updateOne(
          { _id: objectId },
          { $set: { ...updateData, updatedAt: new Date().toISOString() } }
        );
        
        if (result.matchedCount === 0) {
          // If no document was matched, create a new one
          const newResult = await db.collection("secondaryHero").insertOne({
            ...updateData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          });
          
          const created = await db.collection("secondaryHero").findOne({ _id: newResult.insertedId });
          return NextResponse.json(created);
        }
        
        const updated = await db.collection("secondaryHero").findOne({ _id: objectId });
        return NextResponse.json(updated);
      } catch (idError) {
        // If ObjectId conversion fails, create a new document
        console.error("Invalid ObjectId, creating new document instead:", idError);
        const { _id, ...newData } = heroData;
        
        const newResult = await db.collection("secondaryHero").insertOne({
          ...newData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
        
        const created = await db.collection("secondaryHero").findOne({ _id: newResult.insertedId });
        return NextResponse.json(created);
      }
    }
    
    // Otherwise, create a new record
    const result = await db.collection("secondaryHero").insertOne({
      ...heroData,
      createdAt: heroData.createdAt || new Date().toISOString(),
    });
    
    const created = await db.collection("secondaryHero").findOne({ _id: result.insertedId });
    return NextResponse.json(created);
    
  } catch (error) {
    console.error("Error saving secondary hero data:", error);
    return NextResponse.json(
      { 
        error: "Failed to save secondary hero data",
        details: process.env.NODE_ENV === 'development' ? String(error) : undefined
      },
      { status: 500 }
    );
  }
} 