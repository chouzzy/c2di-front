import { UserProfile } from "@auth0/nextjs-auth0/client";
import axios, { AxiosError } from "axios";

const checkUserByEmail = async (user: UserProfile, accessToken:string|undefined) => {
    try {
        if (!accessToken) {
            throw new Error("Token de acesso não encontrado no cookie.");
          }

        const headers = {
            Authorization: `Bearer ${accessToken}`,
          };

        const response = await axios.get(`https://c2diserver.awer.co/users/findUnique/?email=${user.email}`, { withCredentials: true, headers: headers  })

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

export { checkUserByEmail }
