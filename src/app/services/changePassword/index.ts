import { UserProfile } from "@auth0/nextjs-auth0/client";
import { api } from "../axios";

const resetPassword = async (email:User["email"]|UserProfile["email"]) => {
    try {

        const response = await api.post(`https://c2diserver.awer.co/users/reset-password`, 
            { email: email }, // Corpo da requisição
            { 
                withCredentials: true, 
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );

        if (response.status == 200 || response.status == 202) {
            
            const message: string = response.data.successMessage
            return message
        } else {
            throw Error("Ocorreu um erro inesperado")
        }

    } catch (error) {
        throw error
    }
};

export { resetPassword }