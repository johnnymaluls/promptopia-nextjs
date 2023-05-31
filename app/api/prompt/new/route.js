import Prompt from "@models/prompt";
import { connectToDatabase } from "@utils/database.js";

export const POST = async (req, res) => {
  //Get the userId, prompt, and tag from the page.js post request
  const { userId, prompt, tag } = await req.json();

  try {
    await connectToDatabase();
    const newPrompt = new Prompt({
      creator: userId,
      //If key and value is the same use sin
      prompt,
      tag,
    });
    //Wait for save method to finish before continuing with the rest of the code
    await newPrompt.save();

    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};
