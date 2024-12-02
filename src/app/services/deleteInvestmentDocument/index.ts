import { api } from "../axios";

const deletePrismaProjectDocument = async (investmentID:Investment["id"], documentID:Investment["documents"][0]["id"]) => {
    try {
        const response = await api.put(`https://c2diserver.awer.co/investments/delete/document`, {
            data: {
                investmentID: investmentID,
                documentID: documentID
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

export { deletePrismaProjectDocument }