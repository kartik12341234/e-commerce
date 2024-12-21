import mongoose from "mongoose";
import cart from "@/model/cart";
import { connect } from "@/config/Dbconfig";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { useremail } = params; // Access useremail from req.query instead of req.params
  try {
    await connect(); // Ensure the database connection
    const data = await cart.find({ useremail });
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching cart items:", error);
    return NextResponse.json(
      { message: "Failed to fetch cart items", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req, res) {
  try {
    const { useremail, productId, price, productName } = await req.json(); // Correctly parse JSON body
    await connect(); // Ensure the database connection
    const data = await cart.create({
      useremail,
      productId,
      price,
      productName,
    });
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Error creating cart item:", error);
    return NextResponse.json(
      { message: "Failed to add cart item", error: error.message },
      { status: 500 }
    );
  }
}
