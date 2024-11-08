import * as yup from "yup";

const updateUsersSchema = yup.object({
  name: yup.string().min(3, "O nome deve ter pelo menos 3 caracteres."),
  email: yup.string().email("Formato de email inválido."),
  phoneNumber: yup
    .string()
    .matches(
      /^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/,
      "O número de telefone deve estar no formato (XX) XXXX-XXXX ou (XX) XXXXX-XXXX.",
    ),
  gender: yup
    .string()
    .oneOf(["Masculino", "Feminino", "Outro"], "Selecione um gênero válido."),
  profession: yup.string().min(3, "A profissão deve ter pelo menos 3 caracteres."),
  birth: yup.string().min(10, "Selecione a data de nascimento").max(10, "Selecione a data de nascimento"),
  username: yup.string().min(3, "O username deve ter pelo menos 3 caracteres."),
  address: yup.object().shape({
    street: yup.string().min(3, "O nome da rua deve ter pelo menos 3 caracteres."),
    number: yup.string().min(1, "O número do endereço deve ter pelo menos 1 caractere."),
    complement: yup.string().optional(),
    district: yup.string().min(3, "O bairro deve ter pelo menos 3 caracteres."),
    city: yup.string().min(3, "A cidade deve ter pelo menos 3 caracteres."),
    state: yup
      .string()
      .matches(/^[A-Z]{2}$/, "O estado deve ter 2 letras maiúsculas.")
      .length(2, "O estado deve ter 2 letras."),
    zipCode: yup
      .string()
      .matches(/^\d{5}-\d{3}$/, "O CEP deve estar no formato XXXXX-XXX."),
  }).nullable(),
  investorProfileName: yup.string().optional(),
  investorProfileDescription: yup.string().optional(),
}).noUnknown(true, "Campos desconhecidos no corpo da requisição.").strict();






const createUsersSchema = yup.object({

  name: yup.string().required("O nome é obrigatório").min(2, "O nome precisa ter no mínimo dois caracteres"),
  email: yup.string().email("Formato de email inválido").required("O e-mail é obrigatório").min(3, "O email precisa ter no mínimo três caracteres"),
  phoneNumber: yup.string().required("O número de telefone é obrigatório"), 
  gender: yup.string().required("O gênero é obrigatório"),
  profession: yup.string().required("A profissão é obrigatória"),

  birth: yup.string().required("A data de nascimento é obrigatória").typeError("A data de nascimento deve ser uma data válida no formato YYYY-MM-DD"),
  cpf: yup.string().required("O CPF é obrigatório").min(11, "CPF inválido").max(11, "CPF inválido."),

  username: yup.string().required("O username é obrigatório").min(3, "O username precisa conter no mínimo 3 caracteres"),

  address: yup.object().shape({
    street: yup.string().required("A rua é obrigatória"),
    number: yup.string().required("O número é obrigatório"),
    complement: yup.string().optional(),
    district: yup.string().required("O bairro é obrigatório"),
    city: yup.string().required("A cidade é obrigatória"),
    state: yup.string().required("O estado é obrigatório"),
    zipCode: yup.string().required("O CEP é obrigatório"),
  }).nullable(), // Permite que o endereço seja nulo

  investorProfileName: yup.string().optional(),
  investorProfileDescription: yup.string().optional(),
  
  role: yup.mixed().oneOf(["INVESTOR", "PROJECT_MANAGER", "ADMINISTRATOR"]).required("A role é obrigatória")
  
}).noUnknown(true, "Campos desconhecidos no corpo da requisição.").strict();

const createUsersByAdminSchema = yup.object({

  name: yup.string().required("O nome é obrigatório").min(2, "O nome precisa ter no mínimo dois caracteres"),
  email: yup.string().email("Formato de email inválido").required("O e-mail é obrigatório").min(3, "O email precisa ter no mínimo três caracteres"),
  username: yup.string().required("O username é obrigatório").min(3, "O username precisa conter no mínimo 3 caracteres"),
  cpf: yup.string().min(11, "CPF inválido").max(11, "CPF inválido.").required("O CPF é obrigatório"),
  role: yup.mixed().oneOf(["INVESTOR", "PROJECT_MANAGER", "ADMINISTRATOR"]).required("A role é obrigatória")
  
}).noUnknown(true, "Campos desconhecidos no corpo da requisição.").strict();


export { updateUsersSchema, createUsersSchema, createUsersByAdminSchema };