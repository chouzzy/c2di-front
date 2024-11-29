import axios from "axios";

const deletePrismaProjectImage = async (investmentID:Investment["id"], imageID:Investment["images"][0]["id"]) => {
    try {
        const response = await axios.put(`https://c2di-front.vercel.app/investments/delete/image`, {
            data: {
                investmentID: investmentID,
                imageID: imageID
            },
            withCredentials: true, 
            headers: {
                'Content-Type': 'application/json' // Define o header Content-Type
            }
        });

        if (response.status == 200 || response.status == 202) {
            return response.data
        } else {
            throw Error("Ocorreu um erro inesperado")
        }

    } catch (error) {
        throw error
    }
};

export { deletePrismaProjectImage }