import { api } from "../axios";


const importExcelUnidades = async (formData:FormData, projectID:Investment["id"]) => {

    try {
        const response = await api.post(`investments/unidades/import/${projectID}`, formData, {
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

export {importExcelUnidades}