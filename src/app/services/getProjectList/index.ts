import { api } from "../axios";

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
    active?: Investment["active"];
}


const getProjectList = async ({page, pageRange, active}:ListInvestmentRequestProps) => {
    try {

        const response = await api.get(`investments/`, { 
            params: {
                page: page,
                pageRange: pageRange,
                active: active?? true
            },
            withCredentials: true 
        })

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

const getProjectManagerProjectsList = async ({ projectManagerID, page, pageRange }: ListInvestmentRequestProps) => {
    try {

        const response = await api.get(`investments/`, {
            params: {
                projectManagerID: projectManagerID,
                page: page,
                pageRange: pageRange
            },
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