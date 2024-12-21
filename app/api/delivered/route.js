import Razorpay from "razorpay";
import { connect } from "@/config/Dbconfig";
import order from "@/model/Order";
import { NextResponse } from "next/server";
import Delivered from "@/model/Delivered";

export async function POST(req) {
  await connect();

  try {
    // Parse the request body
    const { orderId, productId, amount } = await req.json();

    // Create a new delivered entry
    const delivered = new Delivered({ orderId, productId, amount });
    await delivered.save();

    // Return a successful response
    return NextResponse.json({
      success: true,
      message: "Order marked as delivered.",
    });
  } catch (error) {
    // Handle errors and return an error response
    return NextResponse.json(
      { success: false, message: error.message || "An error occurred." },
      { status: 500 }
    );
  }
}
export async function GET(req) {
  connect();
  try {
    const orders = await Delivered.find({});
    return NextResponse.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { message: "Error fetching orders.", error },
      { status: 500 }
    );
  }
}
