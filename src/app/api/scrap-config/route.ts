import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { z } from "zod";

/**
 * Validation schema for scrap configuration
 * Defines required fields and their validation rules
 */
const configSchema = z.object({
  category: z.string().min(1, "Category is required"),
  keywords: z.array(z.string().min(1, "Keyword cannot be empty")),
  sourceUrl: z.string().url("Invalid source URL"),
  isActive: z.boolean(),
});

// Type inference from zod schema
type ConfigData = z.infer<typeof configSchema>;

/**
 * GET handler - Retrieves all scrap configurations
 * Sorted by creation date in descending order
 */
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("newsarchives");
    
    const configs = await db.collection("scrapConfigs")
      .find({})
      .sort({ createdAt: -1 })
      .project({
        category: 1,
        keywords: 1,
        sourceUrl: 1,
        isActive: 1,
        createdAt: 1,
        updatedAt: 1
      })
      .toArray();
    
    return NextResponse.json(configs);
  } catch (error) {
    console.error("Error fetching configurations:", error);
    return NextResponse.json(
      { 
        error: "Failed to fetch configurations",
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    );
  }
}

/**
 * POST handler - Creates a new scrap configuration
 * Includes validation and proper error handling
 */
export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Validate input data against schema
    const validatedData: ConfigData = configSchema.parse(data);
    
    const client = await clientPromise;
    const db = client.db("newsarchives");
    
    // Add timestamps
    const configWithTimestamps = {
      ...validatedData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    const result = await db.collection("scrapConfigs").insertOne(configWithTimestamps);
    
    if (!result.acknowledged) {
      throw new Error("Failed to insert configuration");
    }
    
    return NextResponse.json({
      success: true,
      id: result.insertedId,
      message: "Configuration created successfully"
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating configuration:", error);
    
    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: "Validation failed", 
          details: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        },
        { status: 400 }
      );
    }
    
    // Handle other errors
    return NextResponse.json(
      { 
        error: "Failed to create configuration",
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    );
  }
}
