import { formattedDataPizzaProps } from "../graphics/Pizza"

export interface userBarGraphics {
    investmentID: Investment["id"]
    title: Investment["title"]
    financialTotalProgressPrevisto: Investment["financialTotalProgress"][0]["previsto"]
    financialTotalProgressRealizado: Investment["financialTotalProgress"][0]["realizado"]
    buildingTotalProgressPrevisto: Investment["buildingTotalProgress"][0]["previsto"]
    buildingTotalProgressRealizado: Investment["buildingTotalProgress"][0]["realizado"]
}


function removeDuplicatesByInvestmentID(
    investments: userBarGraphics[]
): userBarGraphics[] {
    const investmentIdMap = new Map<string, boolean>();
    return investments.filter((investment) => {
        if (!investmentIdMap.has(investment.investmentID)) {
            investmentIdMap.set(investment.investmentID, true);
            return true;
        }
        return false;
    });
}

export function resumeUserInvestment(userInvestmentsData: UserInvestment[], projectsData: Investment[]) {

    let userInvestmentResumed: userBarGraphics[] = []

    userInvestmentsData.forEach((userInv) => {

        const investmentMatched = projectsData.find(investment => investment.id === userInv.investmentID)
        if (!investmentMatched) { return }

        userInvestmentResumed.push({

            title: investmentMatched.title,
            investmentID: userInv.investmentID,
            // Acessando o último elemento de financialTotalProgress
            financialTotalProgressPrevisto:
                investmentMatched.financialTotalProgress.length > 0
                    ? investmentMatched.financialTotalProgress[investmentMatched.financialTotalProgress.length - 1].previsto
                    : 0, // Valor padrão se o array estiver vazio

            financialTotalProgressRealizado:
                investmentMatched.financialTotalProgress.length > 0
                    ? investmentMatched.financialTotalProgress[investmentMatched.financialTotalProgress.length - 1].realizado
                    : 0,

            // Acessando o último elemento de buildingTotalProgress
            buildingTotalProgressPrevisto:
                investmentMatched.buildingTotalProgress.length > 0
                    ? investmentMatched.buildingTotalProgress[investmentMatched.buildingTotalProgress.length - 1].previsto
                    : 0,

            buildingTotalProgressRealizado:
                investmentMatched.buildingTotalProgress.length > 0
                    ? investmentMatched.buildingTotalProgress[investmentMatched.buildingTotalProgress.length - 1].realizado
                    : 0,

        })

    })

    userInvestmentResumed = removeDuplicatesByInvestmentID(userInvestmentResumed)

    return userInvestmentResumed
}

export const formatDataPizza = (investments: userBarGraphics[], userInvestmentsData: UserInvestment[]) => {

    return investments.map((investment) => ({
        ...investment,
        Previsto: investment.financialTotalProgressPrevisto,
        Realizado: investment.financialTotalProgressRealizado,
        Investido: userInvestmentsData.find(userInv => investment.investmentID == userInv.investmentID)?.investedValue
    }))
}

export const formatDataFinanceiro = (investments: userBarGraphics[]) => {
    return investments.map((investment) => ({
        ...investment,
        Previsto: investment.financialTotalProgressPrevisto,
        Realizado: investment.financialTotalProgressRealizado,
    }));
};
export const formatDataConstrucao = (investments: userBarGraphics[]) => {
    return investments.map((investment) => ({
        ...investment,
        Previsto: investment.buildingTotalProgressPrevisto,
        Realizado: investment.buildingTotalProgressRealizado,
    }));
};

export const CustomTooltipFinanceiro = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload; // Dados do ponto/barra atual

        return (
            <div className="custom-tooltip" style={{ fontWeight: '400', backgroundColor: '#fff', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
                <p className="label">{label}</p>
                <p style={{ color: 'black' }}>
                    Previsto: R$ {data.Previsto.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <p style={{ color: '#51c25d' }}>
                    Realizado: R$ {data.Realizado.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
            </div>
        );
    }

    return null;
};
export const CustomTooltipConstrucao = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload; // Dados do ponto/barra atual

        return (
            <div className="custom-tooltip" style={{ fontWeight: '400', backgroundColor: '#fff', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
                <p className="label">{label}</p>
                <p style={{ color: 'black' }}>
                    Previsto: {Number(data.Previsto) * 100}%
                </p>
                <p style={{ color: '#51c25d' }}>
                    Realizado: {Number(data.Realizado) * 100}%
                </p>
            </div>
        );
    }

    return null;
};