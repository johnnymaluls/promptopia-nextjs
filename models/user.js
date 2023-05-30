import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists!"],
    required: [true, "Email is required!"],
  },
  username: {
    type: String,
    unique: [true, "Username already exists!"],
    required: [true, "Username is required!"],
  },
  image: {
    type: String,
  },
});

//First look into the models.User check if it is there then only create it if it is not.
const User = models.User || model("User", UserSchema);

export default User;
