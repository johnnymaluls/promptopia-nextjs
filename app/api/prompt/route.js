import Prompt from "@models/prompt";
import { connectToDatabase } from "@utils/database";
import { NextRequest } from "next/server";

//New
import { revalidatePath } from "next/cache";

export const revalidate = 1;
export const GET = async (request) => {
  try {
    await connectToDatabase();

    const prompts = await Prompt.find({}).populate("creator");

    //To dynamically get the path
    //const path = request.nextUrl.searchParams.get("path") || "/";

    const path = "/api/prompt";

    console.log(path);

    revalidatePath(path);

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
