import { AuthInput } from "@/components/Authentication/Inputs/AuthInput";
import { Flex, Text } from "@chakra-ui/react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { ProjectInput } from "../Inputs/ProjectInput";
import { ProjectSelectInput } from "../Inputs/SelectInput";
import { AuthSelectInput } from "@/components/Authentication/Inputs/AuthSelectInput";
import { fetchStates, fetchCities } from "@/app/api/ibge/route";
import { useEffect, useState } from "react";

interface PersonalDataAndGoalsProps {
    register: UseFormRegister<FieldValues>
    userData: User
}

export function SecondPage({ register, userData }: PersonalDataAndGoalsProps) {

    const [states, setStates] = useState<string[]>()
    const [cities, setCities] = useState<string[]>()

    const [state, setState] = useState<string>("SP")
    const [city, setCity] = useState<string>("São Paulo")


    // GET STATE
    useEffect(() => {
        const setFetchedStates = async () => {
            const statesFetched = await fetchStates()
            setStates(statesFetched)
        };

        setFetchedStates();
    }, []);

    // GET CITY
    useEffect(() => {
        const setfetchedCities = async (state: string) => {
            if (state) {
                const citiesFetched = await fetchCities(state)
                setCities(citiesFetched.sort());
            };
        }

        setfetchedCities(state);
    }, [state]);

    return (
        <>
            <Flex mt={4} mb={-4} w='100%' justifyContent={'center'}>
                <Text fontSize={18} fontWeight={'medium'} borderBottom='1px' borderColor={'darkSide'} textTransform={'uppercase'}>
                    Endereço
                </Text>
            </Flex>

            {/* Numero, Complemento e Bairro */}
            <Flex alignItems={'center'} gap={8}>


                <Flex maxW={72} gap={8}>
                    <AuthInput
                        key={"district"}
                        isRequired={true}
                        type='Bairro'
                        placeholder={'Ex: Tatuapé'}
                        label_top='Bairro'
                        register={register("address.district")}
                    />
                </Flex>
                <Flex maxW={72} gap={8}>
                    <AuthInput
                        key={"zipCode"}
                        isRequired={true}
                        type='text'
                        placeholder={'XXXXX-XXX'}
                        label_top='CEP'
                        register={register("address.zipCode")}
                    />
                </Flex>

                <Flex minW={48} gap={8}>
                    <AuthSelectInput
                        key={"state"}
                        isRequired={true}
                        state={state}
                        setState={setState}
                        options={states ?? []}
                        label_top='Estado'
                        placeholder='Selecione'
                        register={register("address.state")}
                    />
                </Flex>

                <Flex >
                    <AuthSelectInput
                        key={"city"}
                        isRequired={true}
                        state={city}
                        setState={setCity}
                        options={cities ?? []}
                        label_top='Cidade'
                        placeholder='Selecione'
                        register={register("address.city")}
                    />
                </Flex>

            </Flex>

            {/* CEP, Estado e Cidade */}
            <Flex mt={4} alignItems={'center'} gap={8} w='100%'>




                <Flex w='100%'>
                    <AuthInput
                        key={"address"}
                        isRequired={true}
                        type='text'
                        placeholder={"Ex: Av. Exemplo dos Santos Oliveira"}
                        label_top='Endereço'
                        register={register("address.street")}
                    />
                </Flex>


                <Flex maxW={72} gap={8}>
                    <AuthInput
                        key={"number"}
                        isRequired={true}
                        type='number'
                        placeholder={'Ex: 456'}
                        label_top='Número'
                        register={register("address.number")}
                    />
                </Flex>

            </Flex>



            <Flex mt={12} mb={-4} w='100%' justifyContent={'center'}>
                <Text fontSize={18} fontWeight={'medium'} borderBottom='1px' borderColor={'darkSide'} textTransform={'uppercase'}>
                    Construtora, Valores e Custo
                </Text>
            </Flex>

            {/* Valores, construtora e status de construção */}
            <Flex mt={4} alignItems={'center'} gap={8} w='100%'>

                {/* Valor investido */}
                <Flex maxW={72} gap={8}>
                    <AuthInput
                        key={"investmentValue"}
                        isRequired={true}
                        type='number'
                        placeholder={"Ex: 2.300.000"}
                        label_top='Valor investido'
                        register={register("investmentValue")}
                    />
                </Flex>

                {/* Nome da construtora */}
                <Flex maxW={72} gap={8}>
                    <ProjectSelectInput
                        key={"buildingStatus"}
                        isRequired={true}
                        options={[
                            'Lançamento', // Para projetos ainda não iniciados
                            'Em construção',
                            'Pronto para morar',
                            'Parado',
                        ]}
                        placeholder={'Selecione'}
                        label_top={'Status da construção'}
                        register={register("buildingStatus")}
                    />
                </Flex>


                {/* Nome da construtora */}
                <Flex maxW={72} gap={8}>
                    <AuthInput
                        key={"companyName"}
                        isRequired={true}
                        type='string'
                        placeholder={'Ex: LH Contruções'}
                        label_top='Nome da construtora'
                        register={register("companyName")}
                    />
                </Flex>


            </Flex>


            {/* Custo previsto */}
            <Flex w='100%' gap={8} justifyContent={'space-between'}>
                <Flex w='100%'>

                    {/* 'Custo da fundação'*/}
                    <ProjectInput
                        key={"foundation"}
                        isRequired={true}
                        type='number'
                        placeholder={'Ex: 73.422,00'}
                        label_top='Custo estimado da fundação'
                        register={register("predictedCost.foundation", {valueAsNumber:true})}
                    />
                </Flex>
                <Flex w='100%'>
                    {/* 'Custo da estrutura'*/}
                    <ProjectInput
                        key={"structure"}
                        isRequired={true}
                        type='number'
                        placeholder={'R$ 1.200,00/m²'}
                        label_top='Custo estrutural estimado por [m²]'
                        register={register("predictedCost.structure", {valueAsNumber:true})}
                    />
                </Flex>

                <Flex w='100%'>

                    {/* 'Custo da implantação'*/}
                    <ProjectInput
                        key={"implantation"}
                        isRequired={true}
                        type='number'
                        placeholder={'R$ 2.300/m²'}
                        label_top='Custo estimado da implantação [m²]'
                        register={register("predictedCost.implantation", {valueAsNumber:true})}
                    />
                </Flex>

                <Flex w='100%'>

                    {/* 'Custo da mão de obra'*/}
                    <ProjectInput
                        key={"workmanship"}
                        isRequired={true}
                        type='number'
                        placeholder={'R$ 80.135,00'}
                        label_top='Custo estimado da mão de obra'
                        register={register("predictedCost.workmanship", {valueAsNumber:true})}
                    />
                </Flex>



            </Flex>
        </>
    )

}