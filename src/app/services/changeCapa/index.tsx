import axios from "axios";

const changePrismaProjectCapa = async (id:any, updateData:Investment) => {
    try {

        const {images} = updateData

        const response = await axios.put(`https://c2diserver.awer.co/investments/update/${id}`, {
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