import { FormControl, FormLabel, HStack, Input, RadioGroup, Radio, Flex, Text } from "@chakra-ui/react";
import { UseFormRegisterReturn } from "react-hook-form";
import { useState } from "react";
interface UsersInputProps {
    label_top: string,
    type?: string,
    placeholder?: string,
    value?: string | number
    isRequired?: boolean,
    disabled?: boolean,
    defaultValue?: string,
    // errors: any
    // fieldName: string
    registerPreferredInvestmentTypes: UseFormRegisterReturn<any>
    registerPreferredRentType: UseFormRegisterReturn<any>
    maxWidth?: string | number
    label_bottom?: string
}

export function PreferredInvestmentTypesMultipleSelectInput({ label_top, label_bottom, registerPreferredInvestmentTypes, registerPreferredRentType }: UsersInputProps) {
    const [valueInvType, setValueInvType] = useState('');
    const [valueRent, setValueRent] = useState('');
    return (
        <>
            <FormControl w="100%" isRequired={true}>
                <FormLabel>{label_top}</FormLabel>

                <RadioGroup onChange={setValueInvType} value={valueInvType} w='100%'>
                    <Flex flexDir="column" gap={2}>
                        <Radio {...registerPreferredInvestmentTypes} colorScheme='blackAlpha' value={"Prontos"}>
                            Prontos
                        </Radio>
                        <Radio {...registerPreferredInvestmentTypes} colorScheme='blackAlpha' value={"Em construção"}>
                            Em construção
                        </Radio>
                        <Radio {...registerPreferredInvestmentTypes} colorScheme='blackAlpha' value={"Ambos"}>
                            Ambos
                        </Radio>

                    </Flex>
                </RadioGroup>
            </FormControl>

            <FormControl w="100%" isRequired={true}>
                <FormLabel>{label_bottom}</FormLabel>

                <RadioGroup onChange={setValueRent} value={valueRent} w='100%'>
                    <Flex flexDir="column" gap={2}>
                        <Radio {...registerPreferredRentType} colorScheme='blackAlpha' value={"Apenas aluguel"}>
                            Apenas aluguel
                        </Radio>
                        <Radio {...registerPreferredRentType} colorScheme='blackAlpha' value={"Apenas revenda"}>
                            Apenas revenda
                        </Radio>
                        <Radio {...registerPreferredRentType} colorScheme='blackAlpha' value={"Ambos"}>
                            Ambos
                        </Radio>

                    </Flex>
                </RadioGroup>
            </FormControl>
        </>
    );
}