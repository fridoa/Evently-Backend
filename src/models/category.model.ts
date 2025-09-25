import mongoose from "mongoose";

import { TCategory } from "../validators/category.schema";

const { Schema } = mongoose;

const categorySchema = new Schema<TCategory>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
});

const CategoryModel = mongoose.model("Category", categorySchema);

export default CategoryModel;
