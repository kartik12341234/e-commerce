import Order from "@/model/Order";
import { connect } from "@/config/Dbconfig";

export async function GET(req, { params }) {
  await connect(); // Ensure the database connection is established

  const { useremail } = params; // Use 'params' for dynamic routes

  try {
    const orders = await Order.find({ useremail }); // Filter orders by useremail
    return new Response(JSON.stringify(orders), { status: 200 });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return new Response(
      JSON.stringify({ message: "Error fetching orders.", error }),
      { status: 500 }
    );
  }
}
