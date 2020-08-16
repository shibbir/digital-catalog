import { string, object } from "yup";

export default object().shape({
    name: string()
        .min(2, "This field must be at least 2 characters long.")
        .max(30, "This field must be at most 30 characters long.")
        .required("This field must not be empty."),
    email: string()
        .email("This field must be a valid email address."),
    website: string()
        .url("This field must be a valid url.")
});
