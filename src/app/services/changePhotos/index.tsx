import { api } from "../axios";

const changePrismaProjectPhotos = async (id:any, updateData:Investment) => {
    try {
        
        const {photos} = updateData

        const response = await api.put(`investments/update/${id}`, {
            photos
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

export { changePrismaProjectPhotos }