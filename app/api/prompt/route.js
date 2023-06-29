import Prompt from "@models/prompt";
import { connectToDatabase } from "@utils/database";

export const GET = async (request) => {
  try {
    await connectToDatabase();

    const prompts = await Prompt.find({}).populate("creator");

    const headers = {
      "Cache-Control": "no-cache, no-store, max-age=0, must-revalidate",
    };

    return new Response(JSON.stringify(prompts), {
      status: 200,
      revalidate: 0,
      headers,
    });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
