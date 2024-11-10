import { AuthInput } from "@/components/Authentication/Inputs/AuthInput";
import { InvestmentGoalsMultipleSelectInput } from "@/components/Authentication/Inputs/InvestmentGoalsMultipleSelectInput";
import { Flex, Text } from "@chakra-ui/react";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface PersonalDataAndGoalsProps {
    register: UseFormRegister<FieldValues>
    userData: User
}

export function PersonalDataAndGoals({ register, userData }: PersonalDataAndGoalsProps) {

    return (
        <>

            <Flex w='100%' textAlign={'center'}>
                <Text w='100%' fontWeight={600}>
                    1. Dados Pessoais
                </Text>
            </Flex>
            {/* Nome */}
            <AuthInput
                key={"name"}
                isRequired={true}
                defaultValue={userData.name ?? ""}
                type='text'
                placeholder={'Nome completo'}
                label_top='Nome completo'
                register={register("name")}
            />

            <Flex mt={4} w='100%' gap={8}>
                {/* Idade */}
                <Flex maxW={16}>

                    <AuthInput
                        key={"age"}
                        isRequired={true}
                        type='number'
                        placeholder={'35'}
                        label_top='Idade'
                        register={register("age")}
                    />
                </Flex>
                {/* Ocupação */}
                <AuthInput
                    key={"profession"}
                    isRequired={true}
                    defaultValue={userData.profession ?? ""}
                    type='text'
                    placeholder={'Ex: Engenheiro Mecânico'}
                    label_top='Sua profissão'
                    register={register("profession")}
                />
                {/* Renda mensal */}
                <AuthInput
                    key={"salary"}
                    isRequired={true}
                    type='number'
                    placeholder={'ex: 5000'}
                    label_top='Renda mensal (R$):'
                    register={register("monthlyIncome")}
                />

            </Flex>
            {/* Objetivos */}
            <Flex mt={4} w='100%' flexDir={'column'} gap={4}>

                <Flex w='100%' textAlign={'center'}>
                    <Text w='100%' fontWeight={600}>
                        2. Objetivos de Investimento
                    </Text>
                </Flex>

                <InvestmentGoalsMultipleSelectInput label_top="Qual é o seu principal objetivo ao investir em imóveis?"
                    registerGoals={register("investmentGoals")}
                    registerOther={register("investmentGoalsOther")}
                />

            </Flex>
            
        </>
    )

}