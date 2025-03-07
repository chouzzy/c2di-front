import { api } from "../axios";

const changePrismaProjectPartners = async (id:any, updateData:Investment) => {
    try {
        const {partners} = updateData
        const response = await api.put(`investments/update/${id}`, {
            partners
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

export { changePrismaProjectPartners }