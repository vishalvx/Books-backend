import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter book Name"],
    trim: true,
  },
  author: {
    type: String,
    required: [true, "Please Enter book's author"],
  },
  description: {
    type: String,
    required: [true, "Please Enter book Description"],
  },
  price: {
    type: Number,
    required: [true, "Please Enter book Price"],
    maxLength: [8, "Price Cannot 8 figure"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  stock: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});
export default mongoose.model("Book", bookSchema);
