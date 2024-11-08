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
    register: UseFormRegisterReturn<any>
    maxWidth?: string | number
    label_bottom?: string
}

export function RiskToleranceMultipleSelectInput({ label_top, register }: UsersInputProps) {
    const [value, setValue] = useState('');
    return (
        <FormControl w="100%" isRequired={true}>
            <FormLabel>{label_top}</FormLabel>

            <RadioGroup onChange={setValue} value={value} w='100%'>
                <Flex flexDir="column" gap={2}>
                    <Radio {...register} colorScheme='blackAlpha' value={"Baixa"}>
                        Baixa (prefiro investimentos seguros)
                    </Radio>
                    <Radio {...register} colorScheme='blackAlpha' value={"Média"}>
                        Média (aceito alguma volatilidade)
                    </Radio>
                    <Radio {...register} colorScheme='blackAlpha' value={"Alta"}>
                        Alta (estou disposto a correr riscos por maiores retornos)
                    </Radio>

                </Flex>
            </RadioGroup>
        </FormControl>
    );
}