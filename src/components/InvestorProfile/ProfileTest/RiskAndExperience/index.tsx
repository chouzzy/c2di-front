import { InvestmentExperienceMultipleSelectInput } from "@/components/Authentication/Inputs/InvestmentExperienceMultipleSelectInput";
import { RiskToleranceMultipleSelectInput } from "@/components/Authentication/Inputs/RiskToleranceMultipleSelectInput";
import { Flex, Text } from "@chakra-ui/react";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface RiskAndExperienceProps {
    register: UseFormRegister<FieldValues>
    userData?: User
}


export function RiskAndExperience({ register, userData }: RiskAndExperienceProps) {

    return (
        <>
            {/* Risco de tolerancia */}
            <Flex mt={4} w='100%' flexDir={'column'} gap={4}>

                <Flex w='100%' textAlign={'center'}>
                    <Text w='100%' fontWeight={600}>
                        4. Tolerância ao Risco
                    </Text>
                </Flex>

                <RiskToleranceMultipleSelectInput label_top="Qual é a sua tolerância ao risco em investimentos?"
                    register={register("riskTolerance")}
                />

            </Flex>


            {/* Experiência */}
            <Flex mt={4} w='100%' flexDir={'column'}>

                <Flex w='100%' textAlign={'center'}>
                    <Text w='100%' fontWeight={600}>
                        3. Experiência e Conhecimento
                    </Text>
                </Flex>

                <InvestmentExperienceMultipleSelectInput label_top="Você já investiu em imóveis antes?"
                    registerInvestedBefore={register("investedBefore")}
                    registerInvestedBeforeType={register("investedBeforeType")}
                    registerInvestedBeforeTypeOther={register("investedBeforeTypeOther")}
                    registerInvestmentKnowledge={register("investmentKnowledge")}
                />

            </Flex>
        </>
    )
}