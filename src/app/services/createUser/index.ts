import { UserProfile } from "@auth0/nextjs-auth0/client";
import { api } from "../axios";

const createPrismaUser = async (data:any) => {
    try {
        const response = await api.post(`users/create`, data, {
            withCredentials: true, 
            headers: {
                'Content-Type': 'application/json' // Define o header Content-Type
            }
        });

        if (response.status == 200 || response.status == 202) {
            return response
        } else {
            throw Error("Ocorreu um erro inesperado")
        }

    } catch (error) {
        throw error
    }
};

export { createPrismaUser }