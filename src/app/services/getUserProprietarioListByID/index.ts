import { api } from "../axios";

interface getUserProprietarioListByUserIDProps {
    userID: UserProprietario["userID"],
    page?: string;
    pageRange?: string;
}

interface getUserProprietarioListByInvestmentIDProps {
    investmentID: UserProprietario["investmentID"]
    page?: string;
    pageRange?: string;
}


const getUserProprietarioListComplete = async () => {
    try {

        const response = await api.get(`usersProprietarios/`, { 
            withCredentials: true 
        })

        if (response.status == 200 || response.status == 202) {
            const investments: UserProprietario[] = response.data.list
            return investments
        } else {
            throw Error("Ocorreu um erro inesperado")
        }

    } catch (error) {
        throw error
    }
};
const getUserProprietarioListByUserID = async ({page, pageRange, userID}:getUserProprietarioListByUserIDProps) => {
    try {

        const response = await api.get(`usersProprietarios/`, { 
            params: {
                userID: userID,
                page: page,
                pageRange: pageRange,
            },
            withCredentials: true 
        })

        if (response.status == 200 || response.status == 202) {
            const investments: Investment[] = response.data.list
            return investments
        } else {
            throw Error("Ocorreu um erro inesperado")
        }

    } catch (error) {
        throw error
    }
};

const getUserProprietarioListByInvestmentID = async ({page, pageRange, investmentID}:getUserProprietarioListByInvestmentIDProps) => {
    try {

        const response = await api.get(`usersProprietarios/`, { 
            params: {
                investmentID: investmentID,
                page: page,
                pageRange: pageRange,
            },
            withCredentials: true 
        })

        if (response.status == 200 || response.status == 202) {
            const users: User[] = response.data.list
            return users
        } else {
            throw Error("Ocorreu um erro inesperado")
        }

    } catch (error) {
        throw error
    }
};


const filterUserProprietariosByInvestmentID = async ({page, pageRange, investmentID}:getUserProprietarioListByInvestmentIDProps) => {
    try {

        const response = await api.get(`usersProprietarios/byInvestment`, { 
            params: {
                investmentID: investmentID,
                page: page,
                pageRange: pageRange,
            },
            withCredentials: true 
        })

        if (response.status == 200 || response.status == 202) {
            const users: UserProprietario[] = response.data.list
            return users
        } else {
            throw Error("Ocorreu um erro inesperado")
        }

    } catch (error) {
        throw error
    }
};

export { getUserProprietarioListByUserID, getUserProprietarioListByInvestmentID, getUserProprietarioListComplete, filterUserProprietariosByInvestmentID }