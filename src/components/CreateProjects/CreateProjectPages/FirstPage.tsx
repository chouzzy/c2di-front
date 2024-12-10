import { AuthInput } from "@/components/Authentication/Inputs/AuthInput";
import { InvestmentGoalsMultipleSelectInput } from "@/components/Authentication/Inputs/InvestmentGoalsMultipleSelectInput";
import { Flex, Text } from "@chakra-ui/react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { ProjectInput } from "../Inputs/ProjectInput";
import { TextAreaInput } from "../Inputs/TextAreaInput";
import { ProjectSelectInput } from "../Inputs/SelectInput";

interface PersonalDataAndGoalsProps {
    register: UseFormRegister<FieldValues>
    userData: User
}

export function FirstPage({ register, userData }: PersonalDataAndGoalsProps) {

    return (
        <>
            <Flex mt={4} mb={-4} w='100%' justifyContent={'center'}>
                <Text fontSize={18} fontWeight={'semibold'} borderBottom='1px' borderColor={'darkSide'} textTransform={'uppercase'}>
                    Dados básicos
                </Text>
            </Flex>

            {/* Nome */}
            <ProjectInput
                key={"title"}
                isRequired={true}
                type='text'
                placeholder={'Projeto prédio residencial na praia'}
                label_top='Título do projeto'
                register={register("title")}
            />

            {/* Descrição */}
            <TextAreaInput
                key={"description"}
                isRequired={true}
                placeholder={'Ex: Terrenos espaçosos para cosntrução de chácaras, sítios e pesqueiros'}
                label_top='Descrição do projeto'
                register={register("description")}
            />

            {/* 3ª linha */}
            <Flex mt={4} w='100%' gap={8} justifyContent={'space-between'} flexDir={['column', 'column', 'row', 'row', 'row']}>

                <Flex w='100%'>

                    {/* projectType */}
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

                <Flex w='100%'>
                    {/* Total de unidades */}
                    <ProjectInput
                        key={"totalUnits"}
                        isRequired={true}
                        type='number'
                        placeholder={'Ex: 120'}
                        label_top='Total de unidades'
                        register={register("totalUnits")}
                    />
                </Flex>

                <Flex w='100%'>

                    {/* Número de pavimentos */}
                    <ProjectInput
                        key={"numberOfFloors"}
                        isRequired={true}
                        type='number'
                        placeholder={'Ex: 12'}
                        label_top='Total de pavimentos'
                        register={register("numberOfFloors")}
                    />
                </Flex>

                <Flex w='100%'>

                    {/* Número de unidade por pavimento */}
                    <ProjectInput
                        key={"unitsPerFloor"}
                        isRequired={true}
                        type='number'
                        placeholder={'Ex: 8'}
                        label_top='Unidades por pavimento'
                        register={register("unitsPerFloor")}
                    />
                </Flex>



            </Flex>


            {/* 4ª linha */}
            <Flex mt={4} w='100%' gap={8} justifyContent={'space-between'} flexDir={['column', 'column', 'row', 'row', 'row']}>

                <Flex w='100%'>

                    {/* Tipologia das plantas */}
                    <ProjectInput
                        key={"floorPlanTypes"}
                        isRequired={true}
                        type='string'
                        placeholder={'Digite as metragens das plantas, separadas por vírgula (ex: 40,50,100)'}
                        label_top='Tipologia das plantas'
                        register={register("floorPlanTypes")}
                    />

                </Flex>

            </Flex>

            {/* 5ª linha */}
            <Flex mt={4} w='100%' gap={8} justifyContent={'space-between'} flexDir={['column', 'column', 'row', 'row', 'row']}>

                <Flex w='100%'>

                    {/* Data de lançamento launchDate */}
                    <ProjectInput
                        key={"launchDate"}
                        isRequired={true}
                        type='date'
                        placeholder={'15-12-2026'}
                        label_top='Data de lançamento (dia do anúncio). 🔊'
                        register={register("launchDate")}
                    />

                </Flex>
                <Flex w='100%'>

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
                <Flex w='100%'>

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


            </Flex>

        </>
    )

}