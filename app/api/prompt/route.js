import Prompt from "@models/prompt";
import { connectToDatabase } from "@utils/database";

export const revalidate = 1;
export const GET = async (request) => {
  try {
    await connectToDatabase();

    const prompts = await Prompt.find({}).populate("creator");

    const headers = {
      "Cache-Control": "max-age=300",
    };

    return new Response(JSON.stringify(prompts), {
      status: 200,
      revalidate: 1,
      headers,
    });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
