import mongoose from 'mongoose';

mongoose.connect("mongodb://localhost:27017/auth_demo").then(() => {
  console.log("MongoDB connected");
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: String,
  password: String,
});

export const user = mongoose.model("User", userSchema);
