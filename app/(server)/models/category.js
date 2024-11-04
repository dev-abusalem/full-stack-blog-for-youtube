import mongoose from "mongoose";
const PostCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "inactive",
      enums: ["active", "inactive"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.PostCategory ||
  mongoose.model("PostCategory", PostCategorySchema);
