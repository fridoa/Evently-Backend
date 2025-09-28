import * as Yup from "yup";

export const eventSchema = Yup.object({
  name: Yup.string().required("Event name is required"),
  startDate: Yup.string().required("Start date is required"),
  endDate: Yup.string().required("End date is required"),
  description: Yup.string().required("Description is required"),
  banner: Yup.string().required("Banner is required"),
  isFeatured: Yup.boolean().required("isFeatured is required"),
  isOnline: Yup.boolean().required("isOnline is required"),
  isPublish: Yup.boolean(),
  category: Yup.string().required("Category is required"),
  slug: Yup.string(),
  createdBy: Yup.string().required("CreatedBy is required"),
  location: Yup.object({
    region: Yup.number().required("Region is required"),
    coordinates: Yup.array().of(Yup.number()).min(2).required(),
  }).required("Location is required"),
});

export type TEvent = Yup.InferType<typeof eventSchema>;
