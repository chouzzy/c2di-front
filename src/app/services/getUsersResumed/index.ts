import { UserProfile } from "@auth0/nextjs-auth0/client";
import axios, { AxiosError } from "axios";

const getUsersResumed = async (page: number, pageRange: number) => {
    try {

        const response = await axios.get(`https://c2di-front.vercel.app/users/resume`, { withCredentials: true })

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