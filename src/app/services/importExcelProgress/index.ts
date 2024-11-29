import axios from "axios";


const importExcelProgress = async (formData:FormData, projectID:Investment["id"]) => {

    try {
        const response = await axios.post(`https://c2di-front.vercel.app/investments/progress/import/${projectID}`, formData, {
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