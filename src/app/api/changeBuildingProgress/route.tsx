import axios from "axios";

const changePrismaProjectBuildingProgress = async (id:any, updateData:Investment) => {
    try {
        const {buildingProgress} = updateData
        const response = await axios.put(`http://localhost:8081/investments/update/${id}`, {
            buildingProgress
        }, {
            withCredentials: true, 
            headers: {
                'Content-Type': 'application/json' // Define o header Content-Type
            }
        });

        if (response.status == 200 || response.status == 202) {
            console.log(response)
            return response.data.investment.buildingProgress
        } else {
            throw Error("Ocorreu um erro inesperado")
        }

    } catch (error) {
        throw error
    }
};

export { changePrismaProjectBuildingProgress }