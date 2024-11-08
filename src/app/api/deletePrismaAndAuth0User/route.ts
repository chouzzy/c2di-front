import { UserProfile } from "@auth0/nextjs-auth0/client";
import axios, { AxiosError } from "axios";

const deletePrismaAndAuth0User = async (id:User["id"], auth0UserID:UserProfile["sub"]) => {
    try {
        const response = await axios.delete('http://localhost:8081/users/delete', {
            data: { 
              id: id,
              auth0UserID: auth0UserID 
            },
            withCredentials: true, 
            headers: {
              'Content-Type': 'application/json',
            }
          });

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

export { deletePrismaAndAuth0User }