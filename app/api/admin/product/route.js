import Product from "@/model/Product";
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
    // console.log(
    //   name,
    //   description,
    //   ingredients,
    //   Benefits,
    //   storageinfo,
    //   sizes,
    //   image,
    //   additionalImages
    // );

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

    const newProduct = new Product({
      name,
      description: description.map((desc) => ({
        paragraph: desc.paragraph, // Make sure each 'paragraph' is a string
        imageUrl: desc.imageUrl, // Make sure each 'imageUrl' is a string
      })),
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
