import Review from "@/model/review";
import { connect } from "@/config/Dbconfig";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  await connect();

  try {
    // Parse the JSON body of the request
    const body = await req.json();
    const { username, verified, rating, comment } = body;
    const { productId } = params; // Ensure productId comes from params

    // Validate required fields
    if (!username || !rating || !comment || !productId) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }

    // Create and save the new review
    const review = new Review({
      username,
      verified: verified || false, // Default to false if not provided
      rating,
      comment,
      productId,
      date: new Date(), // Ensure we have a date field for sorting
    });

    await review.save();
    console.log("Review saved:", review);

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

export async function GET(req, { params }) {
  await connect();

  try {
    const { productId } = params;

    if (!productId) {
      return NextResponse.json(
        { message: "Product ID is required." },
        { status: 400 }
      );
    }

    // Fetch and sort reviews by date (newest first)
    const reviews = await Review.find({ productId }).sort({ date: -1 });

    return NextResponse.json(reviews, { status: 200 });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { message: "Error fetching reviews.", error },
      { status: 500 }
    );
  }
}
