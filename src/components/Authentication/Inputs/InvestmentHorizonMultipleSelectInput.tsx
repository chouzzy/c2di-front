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

// export function MultipleSelectInput({ label_top, type, placeholder, value, isRequired, disabled = false, defaultValue, register, maxWidth, label_bottom }: UsersInputProps
export function InvestmentHorizonMultipleSelectInput({ label_top, register }: UsersInputProps) {
    const [value, setValue] = useState('');
    return (
        <FormControl w="100%" isRequired={true}>
            <FormLabel>{label_top}</FormLabel>

            <RadioGroup onChange={setValue} value={value} w='100%'>
                <Flex flexDir="column" gap={2}>
                    <Radio {...register} colorScheme='blackAlpha' value={"Menos de 1 ano"}>
                        Menos de 1 ano
                    </Radio>
                    <Radio {...register} colorScheme='blackAlpha' value={"1 a 5 anos"}>
                        1 a 5 anos
                    </Radio>
                    <Radio {...register} colorScheme='blackAlpha' value={"5 a 10 anos"}>
                        5 a 10 anos
                    </Radio>
                    <Radio {...register} colorScheme='blackAlpha' value={"Mais de 10 anos"}>
                        Mais 5 a 10 anos
                    </Radio>

                </Flex>
            </RadioGroup>
        </FormControl>
    );
}