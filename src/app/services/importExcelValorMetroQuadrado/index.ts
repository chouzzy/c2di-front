import { api } from "../axios";


const importExcelValorMetroQuadrado = async (formData:FormData, projectID:Investment["id"]) => {

    try {
        const response = await api.post(`investments/metroQuadrado/import/${projectID}`, formData, {
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

export {importExcelValorMetroQuadrado}