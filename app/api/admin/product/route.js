import Product from "@/model/Product";
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

    const { name, description, price, size, image, additionalImages } =
      await req.json();
    console.log(name, description, price, size, image, additionalImages);

    // 1. Validate the price
    if (isNaN(price) || price <= 0) {
      throw new Error("Invalid price.");
    }

    // 2. Upload the primary image to Cloudinary
    const uploadResponse = await cloudinary.v2.uploader.upload(image, {
      folder: "organic",
      resource_type: "image",
    });

    // 3. Upload additional images (if any)
    const additionalImageUrls = await Promise.all(
      (additionalImages || []).map(async (img) => {
        const res = await cloudinary.v2.uploader.upload(img, {
          folder: "organic",
          resource_type: "image",
        });
        return res.secure_url;
      })
    );

    // 4. Create the new product with the image URLs
    const newProduct = new Product({
      name,
      description,
      price,
      size,
      imageUrl: uploadResponse.secure_url,
      additionalImages: additionalImageUrls,
    });

    await newProduct.save();

    // 5. Return success response
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

    const products = await Product.find({});

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
