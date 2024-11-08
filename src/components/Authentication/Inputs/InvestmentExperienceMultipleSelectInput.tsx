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
    registerInvestedBefore: UseFormRegisterReturn<any>
    registerInvestedBeforeType: UseFormRegisterReturn<any>
    registerInvestmentKnowledge: UseFormRegisterReturn<any>
    registerInvestedBeforeTypeOther: UseFormRegisterReturn<any>
    maxWidth?: string | number
    label_bottom?: string
}

// export function MultipleSelectInput({ label_top, type, placeholder, value, isRequired, disabled = false, defaultValue, register, maxWidth, label_bottom }: UsersInputProps
export function InvestmentExperienceMultipleSelectInput({ label_top, registerInvestedBefore, registerInvestedBeforeType, registerInvestedBeforeTypeOther, registerInvestmentKnowledge }: UsersInputProps) {
    const [value, setValue] = useState('');
    const [outroValor, setOutroValor] = useState('');
    const [investiuAntes, setInvestiuAntes] = useState(false); // Estado para a pergunta "Você já investiu em imóveis antes?"

    const handleOutroChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOutroValor(event.target.value);
        setValue('outro');
    };

    const handleInvestiuAntesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInvestiuAntes(event.target.checked); // Atualiza o estado investiuAntes
    };
    const handleNaoInvestiuAntesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInvestiuAntes(false); // Atualiza o estado investiuAntes
    };

    return (
        <FormControl w="100%" isRequired={true}>

            {/* Pergunta que controla a exibição das perguntas condicionais */}
            <Flex mt={4} alignItems="center">
                <FormLabel htmlFor="investiuAntes">
                    Você já investiu em imóveis antes?
                </FormLabel>
                <Flex gap={2}>
                    <Checkbox
                        {...registerInvestedBefore}
                        type="checkbox"
                        id="investiuAntes"
                        colorScheme="red"
                        isChecked={investiuAntes ? true : false}
                        onChange={handleInvestiuAntesChange}
                        size={'lg'}
                        bgColor='white'
                        pb={1}
                    />
                </Flex>
            </Flex>

            {/* Perguntas condicionais */}
            {investiuAntes && ( // Exibe as perguntas apenas se investiuAntes for true
                <>
                    <FormLabel mt={4}>Se sim, qual foi o tipo de investimento?</FormLabel>
                    <RadioGroup onChange={setValue} value={value} w='100%'>
                        <Flex flexDir="column" gap={2}>
                            <Radio {...registerInvestedBeforeType} colorScheme='blackAlpha' value={"Residencial"}>
                                Residencial
                            </Radio>
                            <Radio {...registerInvestedBeforeType} colorScheme='blackAlpha' value={"Comercial"}>
                                Comercial
                            </Radio>
                            <Radio {...registerInvestedBeforeType} colorScheme='blackAlpha' value={"Valorização a longo prazo"}>
                                Terrenos
                            </Radio>


                            <Flex w='100%' gap={2}>
                                <Radio {...registerInvestedBeforeType} colorScheme='blackAlpha' value='outro' > {value == 'outro' ? "" : 'Outro?'} </Radio>
                                {value != 'outro' ?
                                    ''
                                    :
                                    <Input
                                        isDisabled={value != 'outro'}
                                        {...registerInvestedBeforeTypeOther}
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

                    <FormLabel mt={4}>Como você se considera em relação ao conhecimento do mercado imobiliário?</FormLabel>
                    <RadioGroup w="100%">
                        <Flex flexDir="column" gap={2}>
                            <Radio {...registerInvestmentKnowledge} colorScheme='blackAlpha' value="Iniciante">
                                Iniciante
                            </Radio>
                            <Radio {...registerInvestmentKnowledge} colorScheme='blackAlpha' value="Intermediário">
                                Intermediário
                            </Radio>
                            <Radio {...registerInvestmentKnowledge} colorScheme='blackAlpha' value="Avançado">
                                Avançado
                            </Radio>
                        </Flex>
                    </RadioGroup>
                </>
            )}


        </FormControl>
    );
}