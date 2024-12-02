import { api } from "../axios";


const importExcelProgress = async (formData:FormData, projectID:Investment["id"]) => {

    try {
        const response = await api.post(`https://c2diserver.awer.co/investments/progress/import/${projectID}`, formData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        });

        const investment:Investment = response.data.investment
        return investment


    } catch (error) {
        throw error
    }
}

export {importExcelProgress}