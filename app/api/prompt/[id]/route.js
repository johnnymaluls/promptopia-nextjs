import Prompt from "@models/prompt";
import { connectToDatabase } from "@utils/database.js";

//Get (read)
export const GET = async (request, { params }) => {
  try {
    await connectToDatabase();

    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) return new Response("Prompt not found", { status: 404 });

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};

//Patch (Update)
export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();

  try {
    await connectToDatabase();
    const existingPrompt = await Prompt.findById(params.id);
    //Check if prompt exist
    if (!existingPrompt)
      return new Response("Prompt not found", { status: 404 });

    //Update the value of the existing Prompt to the prompt and tag request value
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    //Save the changes to the database
    await existingPrompt.save();
    //Return the response
    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to update the prompt", { status: 500 });
  }
};

//Delete
export const DELETE = async (request, { params }) => {
  try {
    await connectToDatabase();
    await Prompt.findByIdAndRemove(params.id);
    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error deleting prompt", { status: 500 });
  }
};
