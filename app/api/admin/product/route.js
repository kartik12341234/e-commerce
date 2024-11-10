import Product from "@/model/Product";
import mongoose from "mongoose";
import { connect } from "@/config/Dbconfig";
import cloudinary from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: "ddvgkjoxl",
  api_key: "341847865211555",
  api_secret: "ty4IMyAhYEfrue3y7-HyBov9fQc",
});

export async function POST(req) {
  try {
    await connect();

    const { name, description, price, size, image } = await req.json();

    // 1. Check if the image is present
    if (!image) {
      throw new Error("Image is required.");
    }

    // 2. Upload image to Cloudinary
    const uploadResponse = await cloudinary.v2.uploader.upload(image, {
      folder: "organic",
      resource_type: "image",
    });

    // 3. Create new product with image URL from Cloudinary
    const newProduct = new Product({
      name,
      description,
      price,
      size,
      imageUrl: uploadResponse.secure_url,
    });

    await newProduct.save();

    // Return JSON response with status code 201
    return new Response(
      JSON.stringify({ success: true, product: newProduct }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error adding product:", error);

    return new Response(
      JSON.stringify({ success: false, message: "Error adding product" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
export async function GET(req) {
  try {
    await connect();

    // Fetch all products from the database
    const products = await Product.find({});

    // Return JSON response with status code 200
    return new Response(JSON.stringify({ success: true, products }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching products:", error);

    // Return JSON response with status code 500
    return new Response(
      JSON.stringify({ success: false, message: "Error fetching products" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
