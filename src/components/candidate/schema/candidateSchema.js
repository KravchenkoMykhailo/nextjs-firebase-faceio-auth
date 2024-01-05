import * as Yup from "yup";

export const candidateSchema = Yup.object().shape({
  //imageUrl: Yup.string().required("subject Must be required!"),
  name: Yup.string().required("Email Required !"),
  party: Yup.string().required("Message Must be required !"),
});
