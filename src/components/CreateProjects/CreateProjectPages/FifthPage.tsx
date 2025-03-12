
import { Badge, Button, Checkbox, Flex, Tag, TagCloseButton, TagLabel, Text, useColorModeValue } from "@chakra-ui/react";
import { FieldValues, useForm, UseFormRegister } from "react-hook-form";
import { ProjectFileInput } from "../Inputs/FileInput";
import { FaCameraRetro } from "react-icons/fa";
import { TipologiesFileInput, TipologiesInput } from "../Inputs/TipologiesInputs";
import { Dispatch, SetStateAction, useState } from "react";
import { tipologiesSchema } from "./validations";
import { TipologiesState } from "../CreateProjectForm.";
import { v4 as uuidv4 } from 'uuid'
import { ErrorInputComponent } from "@/components/ErrorInputComponent";
import { ValidationError } from "yup";
import { AlvarasInput } from "../Inputs/AlvarasInput";

interface PersonalDataAndGoalsProps {
    register: UseFormRegister<FieldValues>
}


export function FifthPage({ register }: PersonalDataAndGoalsProps) {


    const bgButtonColor = useColorModeValue('darkSide', 'dark.lightSide')

    const [yupError, setYupError] = useState<string>("")

    const [inputDemo, setInputDemo] = useState<boolean>(false)
    const [inputAprov, setInputAprov] = useState<boolean>(false)
    const [inputConstruct, setInputConstruct] = useState<boolean>(false)
    const [inputEstande, setInputEstande] = useState<boolean>(false)


    return (
        <Flex flexDir={'column'} gap={2}>
            <Flex w='100%' justifyContent={'center'} mb={8}>
                <Text fontSize={18} fontWeight={'medium'} borderBottom='1px' borderColor={'darkSide'} textTransform={'uppercase'} >
                    Alvarás
                </Text>
            </Flex>

            <ErrorInputComponent error={yupError} />


            <Flex w='100%' flexDir={['column']}>
                <Flex flexDir={'column'} gap={4}>

                    <Flex mt={4} alignItems={'center'} gap={8} w='100%' flexDir={['column']}>


                        <Flex w='100%' flexDir={'column'} gap={2}>
                            <Checkbox
                                isChecked={inputDemo}
                                onChange={(e) => setInputDemo(!inputDemo)}
                            >
                                <Text fontWeight={'semibold'} fontSize={'md'}> Demolição </Text>
                            </Checkbox>

                            {inputDemo ?
                                <Flex flexDir={'column'}>

                                    <AlvarasInput
                                        key={"demolicao"}
                                        isRequired={false}
                                        type='text'
                                        placeholder={"Ex: Alvará de demolição - Edifício Marques Torres 2"}
                                        title='Demolição'
                                        register={register("alvaras.demolicao.title")}
                                    />
                                    <ProjectFileInput
                                        key={"demoDoc"}
                                        isRequired={false}
                                        multiple={false}
                                        allowedTypes={['application/pdf']}
                                        accept="application/pdf"
                                        label_top='Documento (PDF)'
                                        register={register("alvaras.demolicao.link")}
                                    />
                                </Flex>
                                : ""}
                        </Flex>

                    </Flex>
                    <Flex mt={4} alignItems={'center'} gap={8} w='100%' flexDir={['column']}>

                        <Flex w='100%' flexDir={'column'}>
                            <Checkbox
                                isChecked={inputAprov}
                                onChange={(e) => setInputAprov(!inputAprov)}
                            >
                                <Text fontWeight={'semibold'} fontSize={'md'}> Aprovação </Text>
                            </Checkbox>

                            {inputAprov ?
                                <Flex flexDir={'column'}>
                                    <AlvarasInput
                                        key={"aprovacao"}
                                        isRequired={false}
                                        type='text'
                                        placeholder={"Ex: Alvará de aprovação - Edifício Copã 2"}
                                        title='Aprovação'
                                        register={register("alvaras.aprovacao.title")}
                                    />
                                    <ProjectFileInput
                                        key={"aprovDoc"}
                                        isRequired={false}
                                        multiple={false}
                                        allowedTypes={['application/pdf']}
                                        accept="application/pdf"
                                        label_top='Documento (PDF)'
                                        register={register("alvaras.aprovacao.link")}
                                    />
                                </Flex>
                                : ""}
                        </Flex>

                    </Flex>
                    <Flex mt={4} alignItems={'center'} gap={8} w='100%' flexDir={['column']}>

                        <Flex w='100%' flexDir={'column'}>
                            <Checkbox
                                isChecked={inputConstruct}
                                onChange={(e) => setInputConstruct(!inputConstruct)}
                            >
                                <Text fontWeight={'semibold'} fontSize={'md'}> Construção </Text>
                            </Checkbox>

                            {inputConstruct ?
                                <Flex flexDir={'column'}>
                                    <AlvarasInput
                                        key={"construcao"}
                                        isRequired={false}
                                        type='text'
                                        placeholder={"Ex: Alvará de construção - Edifício Itália 2.0"}
                                        title='Construção'
                                        register={register("alvaras.construcao.title")}
                                    />
                                    <ProjectFileInput
                                        key={"constructDoc"}
                                        isRequired={false}
                                        multiple={false}
                                        allowedTypes={['application/pdf']}
                                        accept="application/pdf"
                                        label_top='Documento (PDF)'
                                        register={register("alvaras.construcao.link")}
                                    />
                                </Flex>
                                : ""}
                        </Flex>

                    </Flex>
                    <Flex mt={4} alignItems={'center'} gap={8} w='100%' flexDir={['column']}>

                        <Flex w='100%' flexDir={'column'}>
                            <Checkbox
                                isChecked={inputEstande}
                                onChange={(e) => setInputEstande(!inputEstande)}
                            >
                                <Text fontWeight={'semibold'} fontSize={'md'}> Estande de vendas </Text>
                            </Checkbox>

                            {inputEstande ?
                                <Flex flexDir={'column'}>
                                    <AlvarasInput
                                        key={"estande"}
                                        isRequired={false}
                                        type='text'
                                        placeholder={"Ex: Alvará de estande de vendas - Edifício Palácio do Planalto"}
                                        title='Estande de vendas'
                                        register={register("alvaras.estande.title")}
                                    />
                                    <ProjectFileInput
                                        key={"estandeDoc"}
                                        isRequired={false}
                                        multiple={false}
                                        allowedTypes={['application/pdf']}
                                        accept="application/pdf"
                                        label_top='Documento (PDF)'
                                        register={register("alvaras.estande.link")}
                                    />
                                </Flex>
                                : ""}
                        </Flex>

                    </Flex>




                </Flex>

            </Flex>
            {/* Documentos */}
        </Flex>
    )

}