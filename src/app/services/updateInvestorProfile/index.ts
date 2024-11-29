import axios from "axios";


export const updateInvestorProfile = async (postData:InvestorProfile) => {
    try {

        const response = await axios.post(`https://c2di-front.vercel.app/investorProfile/create`, postData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json' // Define o header Content-Type
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
}