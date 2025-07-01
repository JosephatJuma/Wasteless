import * as Yup from "yup";
export const registerSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  username: Yup.string()
    .optional()
    .min(3, "Username must be at least 3 characters")
    .matches(
      /^[a-zA-Z0-9_]+$/,
      "Only letters, numbers, and underscores are allowed"
    ),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Passwords must match")
    .required("Confirm Password is required"),
});
