import * as Yup from "yup";

export const shareItemSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .max(50, "Max 50 characters"),
  description: Yup.string()
    .required("Please add a description")
    .max(400, "Max 400 characters"),
  category: Yup.string().required("Please select a category"),
  condition: Yup.string().required("Please select a condition"),
  tags: Yup.string().max(100, "Max 100 characters"),
});
