
import { AuthInput } from "@/components/Authentication/Inputs/AuthInput";
import { Flex, Text } from "@chakra-ui/react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { ProjectFileInput } from "../Inputs/FileInput";

interface PersonalDataAndGoalsProps {
    register: UseFormRegister<FieldValues>
    userData: User
}

export function ThirdPage({ register, userData }: PersonalDataAndGoalsProps) {

    return (
        <>
            <Flex mt={4} mb={-4} w='100%' justifyContent={'center'}>
                <Text fontSize={18} fontWeight={'medium'} borderBottom='1px' borderColor={'darkSide'} textTransform={'uppercase'}>
                    Fotos e Documentos
                </Text>
            </Flex>


            {/* CEP, Estado e Cidade */}
            <Flex mt={4} alignItems={'center'} gap={8} w='100%' flexDir={'column'}>

                <Flex w='100%'>
                    <ProjectFileInput
                        key={"documents"}
                        isRequired={true}
                        allowedTypes={['application/pdf']}
                        accept="application/pdf"
                        label_top='Documentos (PDF)'
                        register={register("document")}
                    />
                </Flex>


                <Flex w='100%' gap={8}>
                    <ProjectFileInput
                        key={"image"}
                        isRequired={true}
                        allowedTypes={['image/png', 'image/jpeg', 'image/jpg']}
                        accept="image/*"
                        label_top='Imagens (PNG, JPG ou JPEG)'
                        register={register("image")}
                    />
                </Flex>


            </Flex>
        </>
    )

}