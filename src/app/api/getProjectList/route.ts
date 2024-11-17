import axios from "axios";

interface ListInvestmentRequestProps {
    title?: Investment["title"];
    investmentValue?: Investment["investmentValue"];
    companyName?: Investment["companyName"];
    expectedDeliveryDateInitial?: Investment["expectedDeliveryDate"];
    expectedDeliveryDateFinal?: Investment["expectedDeliveryDate"];
    city?: Investment["address"]["city"];
    projectManagerID?: Investment["projectManagerID"];
    page?: string;
    pageRange?: string;
}


const getProjectList = async () => {
    try {

        const response = await axios.get(`http://localhost:8081/investments/`, { withCredentials: true })

        if (response.status == 200 || response.status == 202) {
            const investments: Investment[] = response.data.investments
            return investments
        } else {
            throw Error("Ocorreu um erro inesperado")
        }

    } catch (error) {
        throw error
    }
};

const getProjectManagerProjectsList = async ({ projectManagerID }: ListInvestmentRequestProps) => {
    try {

        const response = await axios.get(`http://localhost:8081/investments/`, {
            params: { projectManagerID: projectManagerID },
            withCredentials: true,
        },
        )

        if (response.status == 200 || response.status == 202) {
            const investments: Investment[] = response.data.investments
            return investments
        } else {
            throw Error("Ocorreu um erro inesperado")
        }

    } catch (error) {
        throw error
    }
};

export { getProjectList, getProjectManagerProjectsList }