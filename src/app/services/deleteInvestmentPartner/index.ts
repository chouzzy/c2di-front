import { api } from "../axios";

const deletePrismaProjectPartner = async (investmentID:Investment["id"], partnerID:Investment["partners"][0]["id"]) => {
    try {
        const response = await api.put(`investments/delete/partner`, {
            data: {
                investmentID: investmentID,
                partnerID: partnerID
            },
            withCredentials: true, 
            headers: {
                'Content-Type': 'application/json' // Define o header Content-Type
            }
        });

        if (response.status == 200 || response.status == 202) {
            return response.data
        } else {
            throw Error("Ocorreu um erro inesperado")
        }

    } catch (error) {
        throw error
    }
};

export { deletePrismaProjectPartner }