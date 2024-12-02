import { api } from "../axios";

const changePrismaProjectCapa = async (id:any, updateData:Investment) => {
    try {

        const {images} = updateData

        const response = await api.put(`http://localhost:8081/investments/update/${id}`, {
            images
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

export { changePrismaProjectCapa }