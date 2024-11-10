import User from "@/model/login";
import { connect } from "@/config/Dbconfig";

export async function POST(req) {
  await connect();
  const { email, password } = await req.json();

  const user = await User.findOne({ email, password });

  if (!user) {
    return new Response(JSON.stringify({ message: "User not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ message: "User found", user }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
