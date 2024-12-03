import { UserProfile } from "@auth0/nextjs-auth0/client";
import { api } from "../axios";

interface createPrismaUserInvestmentProps {
    userID: UserInvestment["userID"],
    investmentID: UserInvestment["investmentID"]
    investedValue: UserInvestment["investedValue"]
    valorCorrente: UserInvestment["valorCorrente"]
    documents?: UserInvestment["documents"]
    dataInvestimento?: UserInvestment["dataInvestimento"]
}

const createPrismaUserInvestment = async (data:createPrismaUserInvestmentProps) => {
    try {
        const response = await api.post(`http://localhost:8081/usersInvestments/create`, data, {
            withCredentials: true, 
            headers: {
                'Content-Type': 'application/json' // Define o header Content-Type
            }
        });

        if (response.status == 200 || response.status == 202) {
            const userInvestmentCreated: UserInvestment = response.data.userInvestment
            return userInvestmentCreated
        } else {
            throw Error("Ocorreu um erro inesperado")
        }

    } catch (error) {
        throw error
    }
};

export { createPrismaUserInvestment }