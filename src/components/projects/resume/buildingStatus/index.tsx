import { Button, Flex, FormLabel, Input, InputGroup, InputRightAddon, Link, Spinner, Text, useBreakpointValue } from "@chakra-ui/react";
import { formataData, formataDataMonthShort, formatarMoeda, formatarPercentual } from "@/app/services/utils";
import { XAxis, YAxis, BarChart, Bar, Legend, Tooltip, AreaChart, Area } from 'recharts';
import { ProjectFileInput } from "@/components/CreateProjects/Inputs/FileInput";
import { importExcelProgress } from "@/app/services/importExcelProgress";
import { ErrorInputComponent } from "@/components/ErrorInputComponent";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { changePrismaProjectBuildingProgress } from "@/app/services/changeBuildingProgress";
import { AcompanhamentoDeObra, AcompanhamentoFinanceiro, GraficoAndamento, StatusFooter, ValorMetroQuadrado } from "./utils";
import { importExcelValorMetroQuadrado } from "@/app/services/importExcelValorMetroQuadrado";

interface ProjectDataProps {
    projectData: Investment
    userData: User
}

export interface listNotificationsResponse {
    notifications: Notification[],
    totalDocuments: number
}

export function BuildingStatus({ userData, projectData }: ProjectDataProps) {

    const { predictedCost, valorMetroQuadrado, financialTotalProgress, buildingTotalProgress } = projectData
    const { acabamento, alvenaria, estrutura, fundacao, instalacoes, pintura } = projectData.buildingProgress


    const [editModeAndamento, setEditModeAndamento] = useState(false); // Estado para controlar o modo de edição
    const [editModeCusto, setEditModeCusto] = useState(false); // Estado para controlar o modo de edição
    const [editModeMetroQuadrado, setEditModeMetroQuadrado] = useState(false); // Estado para controlar o modo de edição

    const [updatingDB, setUpdatingDB] = useState(false); // Estado para controlar o modo de edição
    const [yupError, setYupError] = useState(''); // Estado para controlar o modo de edição

    const { register, handleSubmit, formState: { errors } } = useForm({});

    const data = [
        { etapa: 'Fundação', Evolução: fundacao },
        { etapa: 'Estrutura', Evolução: estrutura },
        { etapa: 'Instalações', Evolução: instalacoes },
        { etapa: 'Alvenaria', Evolução: alvenaria },
        { etapa: 'Acabamento', Evolução: acabamento },
        { etapa: 'Pintura', Evolução: pintura },
    ];

    const graphWidth = useBreakpointValue({
        base: 320,
        sm: 320,
        md: 600,
        lg: 800,
        xl: 1100
    })
    const graphHeight = useBreakpointValue({
        base: 320,
        sm: 320,
        md: 320,
        lg: 500,
        xl: 500
    })
    const barWidth = useBreakpointValue({
        base: 32,
        sm: 32,
        md: 32,
        lg: 64,
        xl: 64
    })

    const editCost = async () => {
        setEditModeCusto(!editModeCusto)
    }

    const onSubmitImportValorMetroQuadrado = async (data: any) => {

        setYupError("")
        setUpdatingDB(true)

        try {
            const file = data.document[0]

            const formData = new FormData();
            formData.append('file', file); // Adiciona o arquivo ao FormData

            const investment = await importExcelValorMetroQuadrado(formData, projectData.id)

            projectData.valorMetroQuadrado = investment.valorMetroQuadrado

            setEditModeMetroQuadrado(!editModeMetroQuadrado)

        } catch (error) {

            console.error('Erro no update do valor metro quadrado')
            console.error(error)
            setYupError(String(error))
        }
    }

    const onSubmitImport = async (data: any) => {

        setYupError("")
        setUpdatingDB(true)

        try {
            const file = data.document[0]

            const formData = new FormData();
            formData.append('file', file); // Adiciona o arquivo ao FormData

            const investment = await importExcelProgress(formData, projectData.id)
            projectData.financialTotalProgress = investment.financialTotalProgress
            projectData.buildingTotalProgress = investment.buildingTotalProgress

            setEditModeCusto(!editModeCusto)

        } catch (error) {

            console.error('Erro no update do building progress')
            console.error(error)
            setYupError(String(error))
        }
    }




    return (
        <Flex w='100%' py={8} flexDir={'row'} flexDirection={'column'} gap={16}>

            <ErrorInputComponent error={yupError} />

            <GraficoAndamento
                editModeAndamento={editModeAndamento}
                data={data}
                updatingDB={updatingDB}
                graphWidth={graphWidth}
                graphHeight={graphHeight}
                barWidth={barWidth}
                register={register}
                handleSubmit={handleSubmit}
                setYupError={setYupError}
                setUpdatingDB={setUpdatingDB}
                setEditModeAndamento={setEditModeAndamento}
                projectData={projectData}
                userData={userData}
            />



            {/* VALOR METRO QUADRADO */}
            <Flex flexDir={'column'} gap={4} w='100%'>

                {/* TITULO E IMPORT */}
                <Flex flexDir={'column'} gap={4}>

                    {userData.role != 'INVESTOR' && userData.role != 'PROPRIETARIO' ?
                        <Flex justifyContent={'space-between'}>

                            <Flex justifyContent={'end'} w='100%'>
                                <Button color='lightSide' bgColor="darkSide" borderRadius={4} onClick={() => { setEditModeMetroQuadrado(!editModeMetroQuadrado) }} size={'sm'}>
                                    {editModeMetroQuadrado ? 'Cancelar' : 'Importar dados'}
                                </Button>
                            </Flex>
                        </Flex>

                        : ''
                    }

                    {editModeMetroQuadrado ?
                        <Flex flexDir={'column'} gap={4}>
                            <form onSubmit={handleSubmit(onSubmitImportValorMetroQuadrado)}>
                                <Flex w='100%' flexDir={'row'} alignItems={'center'}>
                                    <ProjectFileInput
                                        key={"EXCEL"}
                                        className={'excel'}
                                        isRequired={true}
                                        multiple={false}
                                        allowedTypes={['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']}
                                        accept=".xls, .xlsx"
                                        label_top='Documentos (Excel)'
                                        register={register("document")}
                                    />
                                    <Button ml={4} maxW={32} mt={12} _hover={{ bgColor: 'redSide' }} size={'md'} borderRadius={8} type='submit' color={'lightSide'} fontWeight={'light'} bgColor={'redSide'} >
                                        Salvar dados
                                    </Button>
                                </Flex>
                            </form>
                            <Flex>
                                <Link href='https://drive.usercontent.google.com/download?id=1Mwul1m6Ifd72kiK7a_ttcCJ9P9cLRd8d&export=download&authuser=0&confirm=t&uuid=57d660f0-c9d0-4e18-9d5e-bb6c890a0810&at=AIrpjvMCKiux8Zo50YHA95zAIWHF:1738625335356'
                                    target="_blank"
                                >
                                    <Button _hover={{ bgColor: 'green.700' }} bgColor={'green.500'} px={4} py={2} borderRadius={4} color={'lightSide'} size='sm'>Baixe aqui a planilha modelo</Button>
                                </Link>
                            </Flex>
                        </Flex>
                        : ''
                    }

                </Flex>

                {/* METRO QUADRADO */}
                <ValorMetroQuadrado graphWidth={graphWidth} graphHeight={graphHeight} valorMetroQuadrado={valorMetroQuadrado} />

            </Flex>
            {/* ACOMPANHAMENTOS */}
            <Flex flexDir={'column'} gap={4} w='100%'>

                {/* ANDAMENTOS TITULO E IMPORT */}
                <Flex flexDir={'column'} gap={4}>

                    {userData.role != 'INVESTOR' && userData.role != 'PROPRIETARIO' ?
                        <Flex justifyContent={'space-between'}>

                            <Flex justifyContent={'end'} w='100%'>
                                <Button color='lightSide' bgColor="darkSide" borderRadius={4} onClick={editCost} size={'sm'}>
                                    {editModeCusto ? 'Cancelar' : 'Importar dados'}
                                </Button>
                            </Flex>
                        </Flex>

                        : ''
                    }

                    {editModeCusto ?
                        <Flex flexDir={'column'} gap={4}>
                            <form onSubmit={handleSubmit(onSubmitImport)}>
                                <Flex w='100%' flexDir={'row'} alignItems={'center'}>
                                    <ProjectFileInput
                                        key={"EXCEL"}
                                        className={'excel'}
                                        isRequired={true}
                                        multiple={false}
                                        allowedTypes={['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']}
                                        accept=".xls, .xlsx"
                                        label_top='Documentos (Excel)'
                                        register={register("document")}
                                    />
                                    <Button ml={4} maxW={32} mt={12} _hover={{ bgColor: 'redSide' }} size={'md'} borderRadius={8} type='submit' color={'lightSide'} fontWeight={'light'} bgColor={'redSide'} >
                                        Salvar dados
                                    </Button>
                                </Flex>
                            </form>
                            <Flex>
                                <Link href='https://drive.usercontent.google.com/download?id=1PNFcxDblSGSk_DsShpZk5Qpz9lBbCWHp&export=download&authuser=0&confirm=t&uuid=81b13ea6-73c6-4227-bd26-5791567c82ea&at=AENtkXbK1MWusDRElsQkSdQ3Y2Bu:1732899063115'
                                    target="_blank"
                                >
                                    <Button _hover={{ bgColor: 'green.700' }} bgColor={'green.500'} px={4} py={2} borderRadius={4} color={'lightSide'} size='sm'>Baixe aqui a planilha modelo</Button>
                                </Link>
                            </Flex>
                        </Flex>
                        : ''
                    }

                </Flex>

                {/* ANDAMENTO FINANCEIRO */}
                <AcompanhamentoFinanceiro graphWidth={graphWidth} graphHeight={graphHeight} financialTotalProgress={financialTotalProgress} />


                {/* ACOMPANHAMENTO OBRA TOTAL */}
                <AcompanhamentoDeObra graphWidth={graphWidth} graphHeight={graphHeight} buildingTotalProgress={buildingTotalProgress} />
            </Flex>

            {/* FOOTER */}
            <StatusFooter />

        </Flex >
    )
}