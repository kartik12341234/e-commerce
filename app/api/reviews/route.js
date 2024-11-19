import Review from "@/model/review";
import { connect } from "@/config/Dbconfig";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connect();

  try {
    // Parse the JSON body of the request
    const body = await req.json();
    const { username, verified, rating, comment } = body;

    // Validate required fields
    if (!username || !rating || !comment) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }

    // Create and save the new review
    const review = new Review({ username, verified, rating, comment });
    await review.save();

    return NextResponse.json(
      {
        message: "Review submitted successfully!",
        review,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving review:", error);
    return NextResponse.json(
      { message: "Error saving review.", error },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  await connect();

  try {
    // Fetch and sort reviews by date (newest first)
    const reviews = await Review.find().sort({ date: -1 });
    return NextResponse.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { message: "Error fetching reviews.", error },
      { status: 500 }
    );
  }
}
