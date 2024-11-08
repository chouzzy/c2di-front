import { FormControl, FormLabel, HStack, Input, RadioGroup, Radio, Flex, Text, Checkbox } from "@chakra-ui/react";
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
    registerHasOtherInvestments: UseFormRegisterReturn<any>
    registerHasOtherInvestmentsType: UseFormRegisterReturn<any>
    registerHasOtherInvestmentsOther: UseFormRegisterReturn<any>
    registerNetWorth: UseFormRegisterReturn<any>
    maxWidth?: string | number
    label_bottom?: string
}

// export function MultipleSelectInput({ label_top, type, placeholder, value, isRequired, disabled = false, defaultValue, register, maxWidth, label_bottom }: UsersInputProps
export function NetWorthMultipleSelectInput({ label_top, registerHasOtherInvestments, registerHasOtherInvestmentsType, registerHasOtherInvestmentsOther, registerNetWorth }: UsersInputProps) {
    const [value, setValue] = useState('');
    const [outroValor, setOutroValor] = useState('');
    const [possuiInvestimento, setPossuiInvestimento] = useState(false); // Estado para a pergunta "Você já investiu em imóveis antes?"

    const handleOutroChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOutroValor(event.target.value);
        setValue('outro');
    };

    const handlePossuiInvestimentoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPossuiInvestimento(event.target.checked); // Atualiza o estado possuiInvestimento
    };

    return (
        <FormControl w="100%" isRequired={true}>

            {/* Pergunta que controla a exibição das perguntas condicionais */}
            <Flex mt={4} alignItems="center">
                <FormLabel htmlFor="possuiInvestimento">
                    Você já investiu em imóveis antes?
                </FormLabel>
                <Flex gap={2}>
                    <Checkbox
                        {...registerHasOtherInvestments}
                        type="checkbox"
                        id="possuiInvestimento"
                        colorScheme="red"
                        isChecked={possuiInvestimento ? true : false}
                        onChange={handlePossuiInvestimentoChange}
                        size={'lg'}
                        bgColor='white'
                        pb={1}
                    />
                </Flex>
            </Flex>

            {/* Perguntas condicionais */}
            {possuiInvestimento && ( // Exibe as perguntas apenas se possuiInvestimento for true
                <>
                    <FormLabel mt={4}>Se sim, qual foi o tipo de investimento?</FormLabel>
                    <RadioGroup onChange={setValue} value={value} w='100%'>
                        <Flex flexDir="column" gap={2}>
                            <Radio {...registerHasOtherInvestmentsType} colorScheme='blackAlpha' value={"Ações"}>
                                Ações
                            </Radio>
                            <Radio {...registerHasOtherInvestmentsType} colorScheme='blackAlpha' value={"Renda fixa"}>
                                Renda fixa
                            </Radio>
                            <Radio {...registerHasOtherInvestmentsType} colorScheme='blackAlpha' value={"Fundos de investimento"}>
                                Fundos de investimento
                            </Radio>


                            <Flex w='100%' gap={2}>
                                <Radio {...registerHasOtherInvestmentsType} colorScheme='blackAlpha' value='outro' > {value == 'outro' ? "" : 'Outro?'} </Radio>
                                {value != 'outro' ?
                                    ''
                                    :
                                    <Input
                                        isDisabled={value != 'outro'}
                                        {...registerHasOtherInvestmentsOther}
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
                </>
            )}


        </FormControl>
    )
}