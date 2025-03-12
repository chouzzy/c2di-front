import { AuthInput } from "@/components/Authentication/Inputs/AuthInput";
import { TipologiesState } from "@/components/CreateProjects/CreateProjectForm.";
import { ProjectInput } from "@/components/CreateProjects/Inputs/ProjectInput";
import { ProjectSelectInput } from "@/components/CreateProjects/Inputs/SelectInput";
import { TextAreaInput } from "@/components/CreateProjects/Inputs/TextAreaInput";
import { Flex, Button, useColorModeValue } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useState } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { TipologiasForm } from "./TipologiesForm";

interface FormProps {
    register: UseFormRegister<FieldValues>
    projectData: Investment
    userData: User
    tipologies: Tipologies[]
    newTipologies: TipologiesState[]
    setNewTipologies: Dispatch<SetStateAction<TipologiesState[]>>
    setProjectData: Dispatch<SetStateAction<Investment | null>>

}

export function Form({ register, projectData, userData, tipologies, newTipologies, setNewTipologies, setProjectData }: FormProps) {

    const bgButtonColor = useColorModeValue('darkSide', 'redSide')

    return (
        <Flex gap={8} flexDir={'column'} w='100%'>

            {/* Dates */}
            <Flex gap={12} w='100%' flexDir={['column', 'column', 'row', 'row', 'row']} >
                <Flex w='100%' textAlign={['center', 'center', 'center', 'center', 'start']}>

                    {/* Title */}
                    <ProjectInput
                        defaultValue={projectData.title}
                        key={"title"}
                        isRequired={true}
                        type='text'
                        placeholder={'Projeto prédio residencial na praia'}
                        label_top='Título do projeto'
                        register={register("title")}
                    />
                </Flex>

                <Flex w='100%' textAlign={['center', 'center', 'center', 'center', 'start']}>
                    {/* Description */}

                    <TextAreaInput
                        key={"description"}
                        defaultValue={projectData.description}
                        isRequired={true}
                        placeholder={'Ex: Terrenos espaçosos para cosntrução de chácaras, sítios e pesqueiros'}
                        label_top='Descrição do projeto'
                        register={register("description")}
                    />
                </Flex>

                <Flex w='100%' textAlign={['center', 'center', 'center', 'center', 'start']}>

                    {/* Status da construção */}

                    <ProjectSelectInput
                        key={"buildingStatus"}
                        isRequired={true}
                        options={[
                            "LANCAMENTO",
                            "CONSTRUCAO",
                            "FINALIZACAO",
                            "FINALIZADO"
                        ]}
                        placeholder={'Selecione'}
                        label_top={'Status da construção'}
                        register={register("buildingStatus")}
                    />
                </Flex>
            </Flex>

            {/* Dates */}
            <Flex gap={12} w='100%' flexDir={['column', 'column', 'row', 'row', 'row']}>

                <Flex w='100%' textAlign={['center', 'center', 'center', 'center', 'start']}>

                    {/* Data de início da obra */}
                    <ProjectInput
                        key={"constructionStartDate"}
                        isRequired={true}
                        type='date'
                        placeholder={'15-12-2028'}
                        label_top='Data de início da obra. 🏁'
                        register={register("constructionStartDate")}
                    />
                </Flex>
                <Flex w='100%' textAlign={['center', 'center', 'center', 'center', 'start']}>

                    {/* Data de entrega da obra */}
                    <ProjectInput
                        key={"expectedDeliveryDate"}
                        isRequired={true}
                        type='date'
                        placeholder={'15-12-2028'}
                        label_top='Expectativa de finalização da obra. 🎉'
                        register={register("expectedDeliveryDate")}
                    />
                </Flex>

                <Flex w='100%' textAlign={['center', 'center', 'center', 'center', 'start']}>

                    {/* Data de lançamento launchDate */}
                    < ProjectInput
                        key={"launchDate"}
                        isRequired={true}
                        type='date'
                        placeholder={'15-12-2026'}
                        label_top='Data de lançamento (dia do anúncio). 🔊'
                        register={register("launchDate")}
                    />
                </Flex>
            </Flex>

            {/* Tipo e nome da construtora */}
            <Flex gap={12} w='100%' flexDir={['column', 'column', 'row', 'row', 'row']}>

                <Flex w='100%' textAlign={['center', 'center', 'center', 'center', 'start']}>

                    {/* Tipo de projeto */}
                    <ProjectSelectInput
                        key={"projectType"}
                        isRequired={true}
                        options={['Residencial Multifamiliar', 'Residencial vertical', 'Comercial geral', 'Misto']}
                        placeholder={'Selecione'}
                        label_top='Tipo de projeto'
                        register={register("projectType")}
                    />
                </Flex>
                <Flex w='100%' textAlign={['center', 'center', 'center', 'center', 'start']}>

                    {/* Nome da construtora */}
                    <AuthInput
                        key={"companyName"}
                        defaultValue={projectData.companyName}
                        isRequired={true}
                        type='string'
                        placeholder={'Ex: LH Contruções'}
                        label_top='Nome da construtora'
                        register={register("companyName")}
                    />
                </Flex>

                <Flex w='100%' textAlign={['center', 'center', 'center', 'center', 'start']}>

                    {/* Tipologia das plantas */}
                    <ProjectInput
                        key={"floorPlanTypes"}
                        defaultValue={String(projectData.floorPlanTypes)}
                        isRequired={true}
                        type='string'
                        placeholder={'Ex: 40;50;100 (Separado por ponto e vírgula)'}
                        label_top="Tipologia das plantas (Sepdo. por ' ; ')"
                        register={register("floorPlanTypes")}
                    />
                </Flex>


            </Flex>

            <Flex gap={12} w='100%' flexDir={['column', 'column', 'row', 'row', 'row']}>

                <Flex w='100%' textAlign={['center', 'center', 'center', 'center', 'start']}>

                    {/* Número de unidade por pavimento */}
                    < ProjectInput
                        key={"unitsPerFloor"}
                        isRequired={true}
                        type='number'
                        placeholder={'Ex: 8'}
                        label_top='Unidades por pavimento'
                        register={register("unitsPerFloor")}
                    />
                </Flex>
                <Flex w='100%' textAlign={['center', 'center', 'center', 'center', 'start']}>

                    {/* Total de unidades */}
                    <ProjectInput
                        key={"totalUnits"}
                        defaultValue={projectData.totalUnits}
                        isRequired={true}
                        type='number'
                        placeholder={'Ex: 120'}
                        label_top='Total de unidades'
                        register={register("totalUnits")}
                    />
                </Flex>

                <Flex w='100%' textAlign={['center', 'center', 'center', 'center', 'start']}>

                    {/* Número de pavimentos */}
                    <ProjectInput
                        key={"numberOfFloors"}
                        defaultValue={projectData.numberOfFloors}
                        isRequired={true}
                        type='number'
                        placeholder={'Ex: 12'}
                        label_top='Total de pavimentos'
                        register={register("numberOfFloors")}
                    />
                </Flex>

            </Flex>

            <Flex gap={12} w='100%' flexDir={['column', 'column', 'row', 'row', 'row']}>

                <Flex w='100%' textAlign={['center', 'center', 'center', 'center', 'start']}>

                    {/* 'Custo da fundação'*/}
                    <ProjectInput
                        key={"foundation"}
                        defaultValue={projectData.predictedCost.foundation}
                        isRequired={true}
                        type='number'
                        placeholder={'Ex: 73.422,00'}
                        label_top='Custo estimado da fundação'
                        register={register("predictedCost.foundation", { valueAsNumber: true })}
                    />



                </Flex>
                <Flex w='100%' textAlign={['center', 'center', 'center', 'center', 'start']}>

                    {/* 'Custo da estrutura'*/}
                    < ProjectInput
                        key={"structure"}
                        defaultValue={projectData.predictedCost.structure}
                        isRequired={true}
                        type='number'
                        placeholder={'R$ 1.200,00/m²'}
                        label_top='Custo estrutural estimado por [m²]'
                        register={register("predictedCost.structure", { valueAsNumber: true })}
                    />
                </Flex>

                <Flex w='100%' textAlign={['center', 'center', 'center', 'center', 'start']}>

                    {/* 'Custo da implantação'*/}
                    <ProjectInput
                        defaultValue={projectData.predictedCost.implantation}
                        key={"implantation"}
                        isRequired={true}
                        type='number'
                        placeholder={'R$ 2.300/m²'}
                        label_top='Custo estimado da implantação [m²]'
                        register={register("predictedCost.implantation", { valueAsNumber: true })}
                    />
                </Flex>

            </Flex>

            <Flex gap={12} w='100%' flexDir={['column', 'column', 'row', 'row', 'row']}>
                <Flex w='100%' textAlign={['center', 'center', 'center', 'center', 'start']}>

                    {/* 'Custo da mão de obra'*/}
                    < ProjectInput
                        key={"workmanship"}
                        defaultValue={projectData.predictedCost.workmanship}
                        isRequired={true}
                        type='number'
                        placeholder={'R$ 80.135,00'}
                        label_top='Custo estimado da mão de obra'
                        register={register("predictedCost.workmanship", { valueAsNumber: true })}
                    />
                </Flex>
                <Flex w='100%' textAlign={['center', 'center', 'center', 'center', 'start']}>

                    {/* 'Custo da mão de obra'*/}
                    < ProjectInput
                        key={"constructionCompany"}
                        defaultValue={projectData.constructionCompany ?? ""}
                        isRequired={true}
                        type='string'
                        placeholder={'Cole a URL da imagem aqui'}
                        label_top='URL (Link) da imagem da construtora'
                        register={register("constructionCompany")}
                    />
                </Flex>
            </Flex>

            <Flex gap={12} w='100%' flexDir={['column', 'column', 'row', 'row', 'row']}>
                <TipologiasForm setProjectData={setProjectData} projectData={projectData} newTipologies={newTipologies} tipologies={tipologies} setNewTipologies={setNewTipologies} />
            </Flex>

            {userData.role == 'ADMINISTRATOR' || userData.role == 'PROJECT_MANAGER' ?
                <>

                    <Button type='submit' color={'lightSide'} fontWeight={'light'} bgColor={bgButtonColor} mt={4} maxW={40}>
                        Salvar dados
                    </Button>

                </>
                : ''
            }
        </Flex>
    )
}