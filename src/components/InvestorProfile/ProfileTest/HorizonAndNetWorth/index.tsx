import { InvestmentHorizonMultipleSelectInput } from "@/components/Authentication/Inputs/InvestmentHorizonMultipleSelectInput";
import { NetWorthMultipleSelectInput } from "@/components/Authentication/Inputs/NetWorthMultipleSelectInput";
import { Flex, Text } from "@chakra-ui/react";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface HorizonAndNetWorthProps {
    register: UseFormRegister<FieldValues>
    userData?: User
}

export function HorizonAndNetWorth({ register, userData }: HorizonAndNetWorthProps) {

    return (
        <>

            {/*Horizonte de investimento  */}
            <Flex mt={4} w='100%' flexDir={'column'} gap={4}>

                <Flex w='100%' textAlign={'center'}>
                    <Text w='100%' fontWeight={600}>
                        5. Horizonte de Investimento
                    </Text>
                </Flex>

                <InvestmentHorizonMultipleSelectInput label_top="Por quanto tempo você pretende manter o investimento em imóveis?"
                    register={register("investmentHorizon")}
                />

            </Flex>

            {/* Investimentos Atuais  */}
            <Flex mt={4} w='100%' flexDir={'column'} gap={4}>

                <Flex w='100%' textAlign={'center'}>
                    <Text w='100%' fontWeight={600}>
                        6. Investimentos Atuais
                    </Text>
                </Flex>

                <NetWorthMultipleSelectInput label_top="Você possui outros investimentos além do mercado imobiliário?"
                    registerHasOtherInvestments={register("hasOtherInvestments")}
                    registerHasOtherInvestmentsType={register("otherInvestments")}
                    registerHasOtherInvestmentsOther={register("hasOtherInvestmentOther")}
                    registerNetWorth={register("netWorth")}
                />

            </Flex>
        </>
    )
}