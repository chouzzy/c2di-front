import { api } from "../axios";

const deletePrismaUserProprietario = async (userProprietarioID: UserProprietario["id"]) => {
    try {
        const response = await api.delete(`usersProprietarios/delete/${userProprietarioID}`, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json' // Define o header Content-Type
            }
        });

        if (response.status == 200 || response.status == 202) {
            const userProprietarioDeleted: UserProprietario = response.data.userProprietarioDeleted
            return userProprietarioDeleted
        } else {
            throw Error("Ocorreu um erro inesperado")
        }

    } catch (error) {
        throw error
    }
};

export { deletePrismaUserProprietario }