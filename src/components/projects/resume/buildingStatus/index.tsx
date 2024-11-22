import { Flex } from "@chakra-ui/react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, BarChart, Bar, Legend, Tooltip } from 'recharts';


interface ProjectDataProps {
    projectData: Investment
    userData: User
}

export interface listNotificationsResponse {
    notifications: Notification[],
    totalDocuments: number
}

export function BuildingStatus({ userData, projectData }: ProjectDataProps) {

    const { acabamento, alvenaria, estrutura, fundacao, instalacoes, pintura } = projectData.buildingProgress

    const data = [
        { etapa: 'Acabamento', Evolução: acabamento },
        { etapa: 'Alvenaria', Evolução: alvenaria },
        { etapa: 'Estrutura', Evolução: estrutura },
        { etapa: 'Fundação', Evolução: fundacao },
        { etapa: 'Instalações', Evolução: instalacoes },
        { etapa: 'Pintura', Evolução: pintura },
    ];

    const renderCustomBarLabel = ({ payload, x, y, width, height, value }:any) => {
        return <text x={x + width / 2} y={y} fill="#666" textAnchor="middle" dy={-6}  fontWeight={500} >{`${value}%`}</text>;
    };


    return (
        <Flex w='100%' py={8} flexDir={'row'} gap={16}>
            <BarChart width={700} height={500} data={data}>
                <XAxis dataKey="etapa" />
                <YAxis type='number' domain={([0, 120])}  hide/>
                <Tooltip />
                <Legend />
                <Bar radius={4} barSize={64} dataKey="Evolução" fill="#1591ea" label={renderCustomBarLabel} activeBar={{ stroke: 'black', strokeWidth: 1 }}/>
            </BarChart>
        </Flex>
    )
}