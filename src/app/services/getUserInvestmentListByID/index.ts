import { api } from "../axios";;

interface getUserInvestmentListByUserIDProps {
    userID: UserInvestment["userID"],
    page?: string;
    pageRange?: string;
}

interface getUserInvestmentListByInvestmentIDProps {
    investmentID: UserInvestment["investmentID"]
    page?: string;
    pageRange?: string;
}


const getUserInvestmentListComplete = async () => {
    try {

        const response = await api.get(`https://c2diserver.awer.co/usersInvestments/`, { 
            withCredentials: true 
        })

        if (response.status == 200 || response.status == 202) {
            const investments: UserInvestment[] = response.data.list
            return investments
        } else {
            throw Error("Ocorreu um erro inesperado")
        }

    } catch (error) {
        throw error
    }
};
const getUserInvestmentListByUserID = async ({page, pageRange, userID}:getUserInvestmentListByUserIDProps) => {
    try {

        const response = await api.get(`https://c2diserver.awer.co/usersInvestments/`, { 
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

const getUserInvestmentListByInvestmentID = async ({page, pageRange, investmentID}:getUserInvestmentListByInvestmentIDProps) => {
    try {

        const response = await api.get(`https://c2diserver.awer.co/usersInvestments/`, { 
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


const filterUserInvestmentsByInvestmentID = async ({page, pageRange, investmentID}:getUserInvestmentListByInvestmentIDProps) => {
    try {

        const response = await api.get(`https://c2diserver.awer.co/usersInvestments/byInvestment`, { 
            params: {
                investmentID: investmentID,
                page: page,
                pageRange: pageRange,
            },
            withCredentials: true 
        })

        if (response.status == 200 || response.status == 202) {
            const users: UserInvestment[] = response.data.list
            return users
        } else {
            throw Error("Ocorreu um erro inesperado")
        }

    } catch (error) {
        throw error
    }
};

export { getUserInvestmentListByUserID, getUserInvestmentListByInvestmentID, getUserInvestmentListComplete, filterUserInvestmentsByInvestmentID }