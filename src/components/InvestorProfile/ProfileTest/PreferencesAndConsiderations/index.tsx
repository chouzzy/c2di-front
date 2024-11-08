import { FinalConsiderationsInput } from "@/components/Authentication/Inputs/FinalConsiderationsInput";
import { PreferredInvestmentTypesMultipleSelectInput } from "@/components/Authentication/Inputs/PreferredInvestmentTypesMultipleSelectInput";
import { Flex, Text } from "@chakra-ui/react";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface PreferencesAndConsiderationsProps {
    register: UseFormRegister<FieldValues>
    userData?: User
}

export function PreferencesAndConsiderations({ register, userData }: PreferencesAndConsiderationsProps) {

    return (
        <>
            {/* Preferencias pessoais */}
            <Flex mt={4} w='100%' flexDir={'column'} gap={4}>

                <Flex w='100%' textAlign={'center'}>
                    <Text w='100%' fontWeight={600}>
                        7. Preferências Pessoais
                    </Text>
                </Flex>

                <PreferredInvestmentTypesMultipleSelectInput
                    label_top="Prefere investir em imóveis prontos ou em construção?"
                    label_bottom="Tem interesse em imóveis para aluguel, compra para revenda ou ambos?"
                    registerPreferredInvestmentTypes={register("preferredInvestmentTypes")}
                    registerPreferredRentType={register("preferredRentType")}
                />

            </Flex>


            {/* Considerações finais */}
            <Flex mt={4} w='100%' flexDir={'column'} gap={4}>

                <Flex w='100%' textAlign={'center'}>
                    <Text w='100%' fontWeight={600}>
                        8. Considerações Finais
                    </Text>
                </Flex>

                <FinalConsiderationsInput
                    label_top="Alguma outra informação que gostaria de fornecer sobre suas preferências de investimento?"
                    register={register("finalConsiderations")}
                />

            </Flex>
        </>
    )
}