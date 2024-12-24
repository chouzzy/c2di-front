import { api } from "../axios";



const changePrismaProjectFotosGerais = async (id:any, updateData:Investment) => {
    try {
        
        const {apartamentTypes} = updateData

        const response = await api.put(`investments/update/${id}`, {
            apartamentTypes
        }, {
            withCredentials: true, 
            headers: {
                'Content-Type': 'application/json' // Define o header Content-Type
            }
        });

        if (response.status == 200 || response.status == 202) {
            return response
        } else {
            throw Error("Ocorreu um erro inesperado")
        }

    } catch (error) {
        throw error
    }
};

export { changePrismaProjectFotosGerais }