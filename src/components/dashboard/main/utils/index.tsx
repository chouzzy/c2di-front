import { formattedDataPizzaProps } from "../graphics/Pizza"

export interface userBarGraphics {
    investmentID: Investment["id"]
    title: Investment["title"]
    financialTotalProgressPrevisto: Investment["financialTotalProgress"][0]["previsto"]
    financialTotalProgressRealizado: Investment["financialTotalProgress"][0]["realizado"]
    financialTotalProgressDate: Investment["financialTotalProgress"][0]["data"] | null
    buildingTotalProgressPrevisto: Investment["buildingTotalProgress"][0]["previsto"]
    buildingTotalProgressRealizado: Investment["buildingTotalProgress"][0]["realizado"]
    buildingTotalProgressDate: Investment["buildingTotalProgress"][0]["data"] | null
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
    let userInvestmentResumed: userBarGraphics[] = [];

    userInvestmentsData.forEach((userInv) => {
        const investmentMatched = projectsData.find(investment => investment.id === userInv.investmentID);
        if (!investmentMatched) { return; }

        // Encontra o último elemento com valor no realizado (financeiro)
        let lastFinancialIndex = investmentMatched.financialTotalProgress.length - 1;
        while (lastFinancialIndex >= 0 && investmentMatched.financialTotalProgress[lastFinancialIndex].realizado === 0) {
            lastFinancialIndex--;
        }

        // Encontra o último elemento com valor no realizado (construção)
        let lastBuildingIndex = investmentMatched.buildingTotalProgress.length - 1;
        while (lastBuildingIndex >= 0 && investmentMatched.buildingTotalProgress[lastBuildingIndex].realizado === 0) {
            lastBuildingIndex--;
        }

        const financialLength = investmentMatched.financialTotalProgress.length
        const buildingLength = investmentMatched.buildingTotalProgress.length

        userInvestmentResumed.push({
            title: investmentMatched.title,
            investmentID: userInv.investmentID,

            // Dados financeiros
            financialTotalProgressPrevisto: investmentMatched.financialTotalProgress[financialLength - 1].previsto,
            financialTotalProgressRealizado: lastFinancialIndex >= 0 ? investmentMatched.financialTotalProgress[lastFinancialIndex].realizado : 0,
            financialTotalProgressDate: lastFinancialIndex >= 0 ? investmentMatched.financialTotalProgress[lastFinancialIndex].data : null,

            // Dados de construção
            buildingTotalProgressPrevisto: investmentMatched.buildingTotalProgress[buildingLength - 1].previsto,
            buildingTotalProgressRealizado: lastBuildingIndex >= 0 ? investmentMatched.buildingTotalProgress[lastBuildingIndex].realizado : 0,
            buildingTotalProgressDate: lastBuildingIndex >= 0 ? investmentMatched.buildingTotalProgress[lastBuildingIndex].data : null,
        });
    });

    userInvestmentResumed = removeDuplicatesByInvestmentID(userInvestmentResumed);

    return userInvestmentResumed;
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
        Ref: investment.financialTotalProgressDate,
    }));
};
export const formatDataConstrucao = (investments: userBarGraphics[]) => {
    return investments.map((investment) => ({
        ...investment,
        Previsto: investment.buildingTotalProgressPrevisto,
        Realizado: investment.buildingTotalProgressRealizado,
        Ref: investment.buildingTotalProgressDate,
    }));
};

export const CustomTooltipFinanceiro = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload; // Dados do ponto/barra atual

        return (
            <div className="custom-tooltip" style={{ fontWeight: '400', backgroundColor: '#fff', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
                <p className="label">{label}</p>
                <p style={{ color: 'black' }}>
                    Atualização: {`${(new Date(data.Ref).getMonth() + 1).toString().padStart(2, '0')}/${new Date(data.Ref).getFullYear()}`}
                </p>
                <p style={{ color: 'black' }}>
                    Unidades: {data.Unidades.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
                </p>
                <p style={{ color: 'black' }}>
                    Previsto: R$ {data.Previsto.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </p>
                <p style={{ color: '#51c05d' }}>
                    Realizado: R$ {data.Realizado.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
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
                    Atualização: {`${(new Date(data.Ref).getMonth() + 1).toString().padStart(2, '0')}/${new Date(data.Ref).getFullYear()}`}
                </p>
                <p style={{ color: 'black' }}>
                    Unidades: {data.Unidades.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
                </p>
                <p style={{ color: 'black' }}>
                    Previsto: {(Number(data.Previsto) * 100).toLocaleString('pt-BR', {maximumFractionDigits: 0 })}%
                </p>
                <p style={{ color: '#51c25d' }}>
                    Realizado: {(Number(data.Realizado) * 100).toLocaleString('pt-BR', {maximumFractionDigits: 0 })}%
                </p>
            </div>
        );
    }

    return null;
};