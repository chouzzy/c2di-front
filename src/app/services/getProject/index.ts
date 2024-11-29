import axios from "axios";

const getProjectByID = async (id: Investment["id"]) => {
    try {

        const response = await axios.get(`https://c2di-front.vercel.app/investments/${id}`, { withCredentials: true })

        if (response.status == 200 || response.status == 202) {
            const investment: Investment = response.data.investment
            return investment
        } else {
            throw Error("Ocorreu um erro inesperado")
        }

    } catch (error) {
        throw error
    }
};

export { getProjectByID }