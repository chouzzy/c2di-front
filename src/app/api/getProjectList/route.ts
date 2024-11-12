import axios from "axios";

const getProjectList = async () => {
    try {

        const response = await axios.get(`http://localhost:8081/investments/`, { withCredentials: true })

        if (response.status == 200 || response.status == 202) {
            const investments: Investment[] = response.data.investments
            return investments
        } else {
            throw Error("Ocorreu um erro inesperado")
        }

    } catch (error) {
        throw error
    }
};

export { getProjectList }