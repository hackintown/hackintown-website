import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const client = await clientPromise;
        const db = client.db("hackintowndb");

        const contact = {
            name: body.name,
            businessEmail: body.businessEmail,
            companyName: body.companyName,
            interestedServices: body.interestedServices,
            launchTimeline: body.launchTimeline,
            budget: body.budget,
            aboutProject: body.aboutProject,
            createdAt: new Date(),
            status: "new" // Can be used for tracking: new, contacted, completed, etc.
        };

        const result = await db.collection("getintouch").insertOne(contact);

        return NextResponse.json({
            message: "Contact request submitted successfully",
            contactId: result.insertedId
        }, { status: 201 });

    } catch (error) {
        console.error("Database Error:", error);
        return NextResponse.json(
            { message: "Error submitting contact request" },
            { status: 500 }
        );
    }
} 