import { api } from "../axios";

const updateProjectFicha = async (id: any, updateData: Investment) => {
    try {

        console.log('updateData')
        console.log(updateData)
        
        const response = await api.put(`investments/update/${id}`,
            updateData,
            {
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

export { updateProjectFicha }