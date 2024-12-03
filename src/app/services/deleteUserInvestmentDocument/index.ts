import { api } from "../axios";

const deletePrismaUserInvestment = async (userInvestmentID: UserInvestment["id"]) => {
    try {
        const response = await api.delete(`http://localhost:8081/usersInvestments/delete/${userInvestmentID}`, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json' // Define o header Content-Type
            }
        });

        if (response.status == 200 || response.status == 202) {
            const userInvestmentDeleted: UserInvestment = response.data.userInvestmentDeleted
            return userInvestmentDeleted
        } else {
            throw Error("Ocorreu um erro inesperado")
        }

    } catch (error) {
        throw error
    }
};

export { deletePrismaUserInvestment }