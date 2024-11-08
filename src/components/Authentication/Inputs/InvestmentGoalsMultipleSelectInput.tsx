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
    registerGoals: UseFormRegisterReturn<any>
    registerOther: UseFormRegisterReturn<any>
    maxWidth?: string | number
    label_bottom?: string
}

// export function MultipleSelectInput({ label_top, type, placeholder, value, isRequired, disabled = false, defaultValue, register, maxWidth, label_bottom }: UsersInputProps
export function InvestmentGoalsMultipleSelectInput({ label_top, registerGoals, registerOther }: UsersInputProps) {
    const [value, setValue] = useState('');
    const [outroValor, setOutroValor] = useState(''); // Estado para o campo "Outro"

    const handleOutroChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOutroValor(event.target.value);
        setValue('outro'); // Seleciona a opção "Outro" no RadioGroup
    };

    return (
        <FormControl w="100%" isRequired={true}>
            <FormLabel>{label_top}</FormLabel>

            <RadioGroup onChange={setValue} value={value} w='100%'>
                <Flex flexDir="column" gap={2}>
                    <Radio {...registerGoals} colorScheme='blackAlpha' value={"Aumento de patrimônio"}>
                        Aumento de patrimônio.
                    </Radio>
                    <Radio {...registerGoals} colorScheme='blackAlpha' value={"Renda passiva (aluguéis)"}>
                        Renda passiva (aluguéis).
                    </Radio>
                    <Radio {...registerGoals} colorScheme='blackAlpha' value={"Valorização a longo prazo"}>
                        Valorização a longo prazo.
                    </Radio>
                    <Radio {...registerGoals} colorScheme='blackAlpha' value={"Diversificação de investimentos"}>
                        Diversificação de investimentos.
                    </Radio>


                    <Flex w='100%' gap={2}>
                        <Radio {...registerGoals} colorScheme='blackAlpha' value='outro' > {value == 'outro' ? "" : 'Outro?'} </Radio>
                        {value != 'outro' ?
                            ''
                            :
                            <Input
                                isDisabled={value != 'outro'}
                                {...registerOther}
                                value={outroValor}
                                type="text"
                                placeholder="Qual?"
                                bgColor='white'
                                onChange={handleOutroChange}
                            />

                        }
                    </Flex>
                </Flex>
            </RadioGroup>
        </FormControl>
    );
}