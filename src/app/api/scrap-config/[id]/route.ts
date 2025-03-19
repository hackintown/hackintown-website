import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { z } from "zod";

// Type inference from zod schema
type ConfigData = z.infer<typeof configSchema>;

/**
 * Validation schema for scrap configuration
 */
const configSchema = z.object({
  category: z.string().min(1, "Category is required"),
  keywords: z.array(z.string().min(1, "Keyword cannot be empty")),
  sourceUrl: z.string().url("Invalid source URL"),
  isActive: z.boolean(),
});

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await Promise.resolve(params);

  try {
    // Validate ObjectId format
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid configuration ID format" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("newsarchives");

    // Parse and validate request body
    const data = await request.json();
    const validatedData: ConfigData = configSchema.parse(data);

    const result = await db.collection("scrapConfigs").findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...validatedData,
          updatedAt: new Date(),
        },
      },
      {
        returnDocument: "after",
        projection: {
          _id: 1,
          category: 1,
          keywords: 1,
          sourceUrl: 1,
          isActive: 1,
          updatedAt: 1
        }
      }
    );

    if (!result) {
      return NextResponse.json(
        { error: "Configuration not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error updating configuration:", error);

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

    return NextResponse.json(
      { error: "Failed to update configuration" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await Promise.resolve(params);

  try {
    // Validate ObjectId format
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid configuration ID format" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("newsarchives");
    
    const result = await db.collection("scrapConfigs").deleteOne({
      _id: new ObjectId(id)
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "Configuration not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Configuration deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting configuration:", error);
    return NextResponse.json(
      { error: "Failed to delete configuration" },
      { status: 500 }
    );
  }
}
