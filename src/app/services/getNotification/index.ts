import axios from "axios";

const getPrismaNotification = async (id:any, page:number, pageRange:number) => {
    try {
        const response = await axios.get(`https://c2diserver.awer.co/notifications/list/${id}`, {
            params: {
                page: page,
                pageRange: pageRange
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

export { getPrismaNotification }