import { UserProfile } from "@auth0/nextjs-auth0/client";
import { api } from "../axios";

const getUsersResumed = async (page: number, pageRange: number) => {
    try {

        const response = await api.get(`https://c2diserver.awer.co /users/resume`, { withCredentials: true })

        if (response.status == 200 || response.status == 202) {
            const users: User[] = response.data.users
            return users
        } else {
            throw Error("Ocorreu um erro inesperado")
        }

    } catch (error) {
        throw error
    }
};

export { getUsersResumed }