import User from "@/model/signup";
import { connect } from "@/config/Dbconfig";

export async function POST(req) {
  await connect();

  try {
    const { name, email, number, password } = await req.json();

    console.log(name, email, number, password);

    if (!name || !email || !number || !password) {
      return new Response(
        JSON.stringify({ message: "Please fill all the fields" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ message: "Email already exists" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const user = new User({ name, email, number, password });

    const result = await user.save();

    return new Response(
      JSON.stringify({
        message: "User created successfully",
        data: result,
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error(error);
    return new Response("Failed to create a new user", { status: 500 });
  }
}
