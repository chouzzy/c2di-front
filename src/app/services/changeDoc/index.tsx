import { api } from "../axios";

const changePrismaProjectDoc = async (id:any, updateData:Investment) => {
    try {
        const {documents} = updateData
        const response = await api.put(`https://c2diserver.awer.co/investments/update/${id}`, {
            documents
        }, {
            withCredentials: true, 
            headers: {
                'Content-Type': 'application/json' // Define o header Content-Type
            }
        });

        if (response.status == 200 || response.status == 202) {
            return response.data.investment
        } else {
            throw Error("Ocorreu um erro inesperado")
        }

    } catch (error) {
        throw error
    }
};

export { changePrismaProjectDoc }