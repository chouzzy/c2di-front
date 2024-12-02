import { UserProfile } from "@auth0/nextjs-auth0/client";
import { api } from "../axios";

const getUserByID = async (id: User["id"]) => {
    try {

        const response = await api.get(`https://c2diserver.awer.co /users/findByID/${id}`, { withCredentials: true })

        if (response.status == 200 || response.status == 202) {
            const user: User = response.data.user
            return user
        } else {
            throw Error("Ocorreu um erro inesperado")
        }

    } catch (error) {
        throw error
    }
};

export { getUserByID }