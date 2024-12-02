import axios from "axios";

const updateProjectFicha = async (id: any, updateData: Investment) => {
    try {


        const response = await axios.put(`https://c2diserver.awer.co//investments/update/${id}`,
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