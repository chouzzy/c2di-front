import axios from "axios";

const changeProjectStatus = async (id:any, status:boolean) => {
    try {
        const response = await axios.put(`http://localhost:8081/investments/update/${id}`, {
            active: status
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

export { changeProjectStatus }