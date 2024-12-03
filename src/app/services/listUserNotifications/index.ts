import { api } from "../axios";

const listUserNotifications = async (userID: User["id"], page: number, pageRange: number) => {
    try {

        const response = await api.get(`http://localhost:8081/notifications/users/list`, {
            params: {
                userID: userID,
                page: page,
                pageRange: pageRange
            },
            withCredentials: true
        })

        if (response.status == 200 || response.status == 202) {
            const notifications: Notification[] | null = response.data.notifications
            const totalDocs: number = response.data.totalDocuments
            return {notifications, totalDocs}
        } else {
            throw Error("Ocorreu um erro inesperado")
        }

    } catch (error) {
        throw error
    }
};

export { listUserNotifications }
