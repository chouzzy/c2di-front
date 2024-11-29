import axios from "axios";

const changePrismaProjectRealizedCost = async (id:any, updateData:Investment) => {
    try {
        const {realizedCost} = updateData
        const response = await axios.put(`https://c2diserver.awer.co/investments/update/${id}`, {
            realizedCost
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

export { changePrismaProjectRealizedCost }