import { api } from "../axios";

const readPrismaUserNotification = async (id: any, updateData: User) => {
    try {
        
        const response = await api.put(`http://localhost:8081/users/update/${id}`, updateData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json' // Define o header Content-Type
            }
        });

        if (response.status == 200 || response.status == 202) {
            const userResponse:User = response.data.user
            return userResponse
        } else {
            throw Error("Ocorreu um erro inesperado")
        }

    } catch (error) {
        throw error
    }
};

export { readPrismaUserNotification }