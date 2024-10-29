import * as yup from "yup";

const updateUsersSchema = yup.object({
    name: yup.string(),
    email: yup.string().email("Formato de email inválido"),
    phoneNumber: yup.string(),
    gender: yup.string(),
    profession: yup.string(),
    birth: yup.date(),
    username: yup.string(),
    address: yup.object().shape({
      street: yup.string(),
      number: yup.string(),
      complement: yup.string().optional(),
      district: yup.string(),
      city: yup.string(),
      state: yup.string(),
      zipCode: yup.string(),
    }).nullable(),
    investorProfileName: yup.string().optional(),
    investorProfileDescription: yup.string().optional(),
  }).noUnknown(true, "Campos desconhecidos no corpo da requisição.").strict();
  
  export {updateUsersSchema}