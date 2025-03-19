import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await Promise.resolve(params);
    const client = await clientPromise;
    const db = client.db("newsarchives");

    // First, try to find by the exact UUID
    const article = await db.collection("articles").findOne({
      _id: id as unknown as ObjectId
    });

    if (!article) {
      return NextResponse.json(
        { error: "Article not found" },
        { status: 404 }
      );
    }

    // Set cache control headers for better performance
    const response = NextResponse.json(article, {
      headers: {
        'Cache-Control': 'public, max-age=60, stale-while-revalidate=30',
        'Content-Type': 'application/json',
      },
    });

    return response;

  } catch (error) {
    console.error("Error fetching article:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch article",
        details: process.env.NODE_ENV === "development" ? String(error) : undefined,
      },
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
