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
            {/* Nome */}
            <ProjectInput
                key={"title"}
                isRequired={true}
                type='text'
                placeholder={'Projeto prédio residencial na praia'}
                label_top='Título do projeto'
                register={register("title")}
            />
            <TextAreaInput
                key={"description"}
                isRequired={true}
                placeholder={'Ex: Terrenos espaçosos para cosntrução de chácaras, sítios e pesqueiros'}
                label_top='Descrição do projeto'
                register={register("description")}
            />

            <Flex mt={4} w='100%' gap={8} justifyContent={'space-between'}>

                {/* projectType */}
                <Flex w='100%'>

                    <ProjectSelectInput
                        key={"projectType"}
                        isRequired={true}
                        options={['Residencial Familiar', 'Residencial vertical', 'Comercial geral', 'Misto']}
                        placeholder={'Selecione'}
                        label_top='Tipo de projeto'
                        register={register("projectType")}
                    />
                </Flex>
                {/* projectType */}
                <Flex w='100%'>

                    <ProjectSelectInput
                        key={"projectType"}
                        isRequired={true}
                        options={['Residencial Familiar', 'Residencial vertical', 'Comercial geral', 'Misto']}
                        placeholder={'Selecione'}
                        label_top='Tipo de projeto'
                        register={register("projectType")}
                    />
                </Flex>
                {/* projectType */}
                <Flex w='100%'>

                    <ProjectSelectInput
                        key={"projectType"}
                        isRequired={true}
                        options={['Residencial Familiar', 'Residencial vertical', 'Comercial geral', 'Misto']}
                        placeholder={'Selecione'}
                        label_top='Tipo de projeto'
                        register={register("projectType")}
                    />
                </Flex>

            </Flex>

        </>
    )

}