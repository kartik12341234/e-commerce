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
      Skincare,
      Haircare,
      Wellness,
      Massage,
      OilPulling,
      MakeupRemoval,
      HairLoss,
      ShelfLife,
      Certifications,
      WhyChooseUs,
      comparisons,
    } = await req.json();

    // Upload main product image to Cloudinary
    const uploadResponse = await cloudinary.v2.uploader.upload(image, {
      folder: "organic",
      resource_type: "image",
    });

    // Upload additional images to Cloudinary
    const additionalImageUrls = await Promise.all(
      (additionalImages || []).map(async (img) => {
        const res = await cloudinary.v2.uploader.upload(img, {
          folder: "organic",
          resource_type: "image",
        });
        return res.secure_url;
      })
    );

    // Create the new product with all the fields, including new ones
    const newProduct = new Product({
      name,
      description: description.map((desc) => ({
        paragraph: desc.paragraph, // Make sure each 'paragraph' is a string
        imageUrl: desc.imageUrl, // Make sure each 'imageUrl' is a string
      })),

      ingredients: ingredients.map((ing) => ({
        paragraph: ing.paragraph, // Make sure each 'paragraph' is a string
        imageUrl: ing.imageUrl, // Make sure each 'imageUrl' is a string
      })),

      Benefits,
      storageinfo,
      sizes,
      imageUrl: uploadResponse.secure_url,
      additionalImages: additionalImageUrls,

      // Add new fields (Skincare, Haircare, etc.)
      Skincare: Skincare?.map((item) => ({
        paragraph: item.paragraph,
        imageUrl: item.imageUrl,
      })),
      Haircare: Haircare?.map((item) => ({
        paragraph: item.paragraph,
        imageUrl: item.imageUrl,
      })),
      Wellness: Wellness?.map((item) => ({
        paragraph: item.paragraph,
        imageUrl: item.imageUrl,
      })),
      Massage: Massage?.map((item) => ({
        paragraph: item.paragraph,
        imageUrl: item.imageUrl,
      })),
      OilPulling: OilPulling?.map((item) => ({
        paragraph: item.paragraph,
        imageUrl: item.imageUrl,
      })),
      MakeupRemoval: MakeupRemoval?.map((item) => ({
        paragraph: item.paragraph,
        imageUrl: item.imageUrl,
      })),
      HairLoss: HairLoss?.map((item) => ({
        paragraph: item.paragraph,
        imageUrl: item.imageUrl,
      })),
      ShelfLife: ShelfLife?.map((item) => ({
        paragraph: item.paragraph,
        imageUrl: item.imageUrl,
      })),
      Certifications: Certifications?.map((item) => ({
        paragraph: item.paragraph,
        imageUrl: item.imageUrl,
      })),
      WhyChooseUs: WhyChooseUs?.map((item) => ({
        paragraph: item.paragraph,
        imageUrl: item.imageUrl,
      })),
      comparisons: comparisons?.map((item) => ({
        paragraph: item.paragraph,
        imageUrl: item.imageUrl,
      })),
    });

    // Save the new product to the database
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
