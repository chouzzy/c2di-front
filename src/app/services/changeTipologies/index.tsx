import { api } from "../axios";

const changePrismaTipologies = async (id:any, updateData:Investment) => {
    try {
        
        const {tipologies} = updateData

        const response = await api.put(`investments/update/${id}`, {
            tipologies
        }, {
            withCredentials: true, 
            headers: {
                'Content-Type': 'application/json' // Define o header Content-Type
            }
        });

        if (response.status == 200 || response.status == 202) {
            const projectUpdated:Investment = response.data.investment
            return projectUpdated
        } else {
            throw Error("Ocorreu um erro inesperado")
        }

    } catch (error) {
        throw error
    }
};

export { changePrismaTipologies }