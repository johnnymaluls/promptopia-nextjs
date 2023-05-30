import { Schema, model, models } from "mongoose";

const PromptSchema = new Schema({
  creator: {
    //Type of a field as an objectid
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  prompt: {
    type: String,
    required: [true, "Prompt is required"],
  },
  tag: {
    type: String,
    required: [true, "Tag is required"],
  },
});

//Either get the prompt that already exists in the models object
//or if it doesn't exists create a new model named Prompt
const Prompt = models.Prompt || model("Prompt", PromptSchema);
