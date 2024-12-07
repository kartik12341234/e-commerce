import Hproduct from "@/model/Hproduct";
import { connect } from "@/config/Dbconfig";
import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: "ddvgkjoxl",
  api_key: "341847865211555",
  api_secret: "ty4IMyAhYEfrue3y7-HyBov9fQc",
});

export async function POST(req) {
  try {
    await connect();
    const {
      name,
      description,
      ingredients,
      Benefits,
      storageinfo,
      sizes,
      image,
      additionalImages,
    } = await req.json();

    const uploadResponse = await cloudinary.v2.uploader.upload(image, {
      folder: "organic",
      resource_type: "image",
    });

    const additionalImageUrls = await Promise.all(
      (additionalImages || []).map(async (img) => {
        const res = await cloudinary.v2.uploader.upload(img, {
          folder: "organic",
          resource_type: "image",
        });
        return res.secure_url;
      })
    );

    const newProduct = new Hproduct({
      name,
      description,
      ingredients,
      Benefits,
      storageinfo,
      sizes,
      imageUrl: uploadResponse.secure_url,
      additionalImages: additionalImageUrls,
    });

    await newProduct.save();

    return new Response(
      JSON.stringify({ success: true, message: "Product added successfully" }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error adding product:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Failed to add product" }),
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    await connect();
    const products = await Hproduct.find({});
    return new Response(JSON.stringify({ success: true, products }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Error fetching products" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
