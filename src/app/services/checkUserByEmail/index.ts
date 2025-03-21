import { UserProfile } from "@auth0/nextjs-auth0/client";
import { api } from "../axios";
import axios from "axios";

const checkUserByEmail = async (user: UserProfile) => {
    try {

        const response = await api.get(`users/findUnique/?email=${user.email}`, { withCredentials: true })

        if (response.status == 200 || response.status == 202) {
            const userResponse: User = response.data.user
            return userResponse
        } else {
            throw Error("Ocorreu um erro inesperado")
        }

    } catch (error) {
        throw error
    }
};


const checkUserByEmailOnlyEmail = async (email: User["email"]) => {
    try {

        const response = await api.get(`users/findUnique/?email=${email}`, { withCredentials: true })

        if (response.status == 200 || response.status == 202) {
            const userResponse: User = response.data.user
            return userResponse
        } else {
            throw Error("Ocorreu um erro inesperado")
        }

    } catch (error) {
        throw error
    }
};

export { checkUserByEmail, checkUserByEmailOnlyEmail }


