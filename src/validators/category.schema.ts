import * as Yup from "yup";

export const categorySchema = Yup.object({
  name: Yup.string().required("Category name is required"),
  description: Yup.string().required("Category description is required"),
  icon: Yup.string().required("Category icon is required"),
});

export type TCategory = Yup.InferType<typeof categorySchema>;