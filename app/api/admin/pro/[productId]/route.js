import Product from "@/model/Product";
import { connect } from "@/config/Dbconfig";

export async function GET(req, { params }) {
  try {
    await connect();

    const { productId } = params;
    const product = await Product.findById(productId);

    if (!product) {
      return new Response(
        JSON.stringify({ success: false, message: "Product not found" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(JSON.stringify({ success: true, product }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Error fetching product" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
