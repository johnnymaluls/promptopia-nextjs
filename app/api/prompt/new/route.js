import { connectToDatabase } from "@utils/database.js";

export const POST = async (req, res) => {
  const { userId, prompt, tag } = await req.json();

  try {
    await connectToDatabase();
  } catch (error) {
    console.log(error);
  }
};
