import { array, number, object, string } from "yup";

const tipologiesSchema = object().shape({
        name: string().required("O nome da tipologia é obrigatório.").trim().min(3, "O nome deve ter pelo menos 3 caracteres."), // String, obrigatório, mínimo de 3 caracteres
        image: string().required("A URL da imagem da planta é obrigatória."), // String, obrigatório, URL válida.
        description: string().optional(), // String, opcional.  Se precisar, adicione regras como .min() ou .max()
        rooms: number().optional().integer("O número de quartos deve ser um número inteiro.").min(0, "O número de quartos não pode ser negativo."), // Number, opcional, inteiro, não negativo
        suits: number().optional().integer("O número de suítes deve ser um número inteiro.").min(0, "O número de suítes não pode ser negativo."), // Number, opcional, inteiro, não negativo
        bathrooms: number().optional().integer("O número de banheiros deve ser um número inteiro.").min(0, "O número de banheiros não pode ser negativo."), // Number, opcional, inteiro, não negativo
        parkingSpaces: number().optional().integer("O número de vagas deve ser um número inteiro.").min(0, "O número de vagas não pode ser negativo."),// Number, opcional, inteiro, não negativo
        area: number().optional(),    // String, opcional.  Se precisar validar como número, mude para number() e adicione as validações.
        tags: array().of(string().trim()).optional(), // Array de strings, opcional. Cada tag deve ter pelo menos 1 caractere (após trim)
    }).required()

export {tipologiesSchema}