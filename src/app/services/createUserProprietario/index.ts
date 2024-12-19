import { UserProfile } from "@auth0/nextjs-auth0/client";
import { api } from "../axios";

interface createPrismaUserProprietarioProps {
    userID: UserProprietario["userID"],
    investmentID: UserProprietario["investmentID"]
    investedValue: UserProprietario["investedValue"]
    valorCorrente: UserProprietario["valorCorrente"]
    documents?: UserProprietario["documents"]
    dataInvestimento?: UserProprietario["dataInvestimento"]
}

const createPrismaUserProprietario = async (data:createPrismaUserProprietarioProps) => {
    try {
        const response = await api.post(`usersProprietarios/create`, data, {
            withCredentials: true, 
            headers: {
                'Content-Type': 'application/json' // Define o header Content-Type
            }
        });

        if (response.status == 200 || response.status == 202) {
            const userProprietarioCreated: UserProprietario = response.data.userProprietario
            return userProprietarioCreated
        } else {
            throw Error("Ocorreu um erro inesperado")
        }

    } catch (error) {
        throw error
    }
};

export { createPrismaUserProprietario }