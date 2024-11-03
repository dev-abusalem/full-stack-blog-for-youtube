import mongoose from "mongoose";
const CategorySchema = new mongoose.Schema(
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

export default mongoose.models.CategorySchema ||
  mongoose.model("Category", CategorySchema);
