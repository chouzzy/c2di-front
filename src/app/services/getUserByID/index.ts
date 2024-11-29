import { UserProfile } from "@auth0/nextjs-auth0/client";
import axios, { AxiosError } from "axios";

const getUserByID = async (id: User["id"]) => {
    try {

        const response = await axios.get(`https://c2di-front.vercel.app/users/findByID/${id}`, { withCredentials: true })

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