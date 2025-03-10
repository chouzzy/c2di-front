
import { Flex, Text } from "@chakra-ui/react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { ProjectFileInput } from "../Inputs/FileInput";
import { TbView360Number } from "react-icons/tb";
import { SiApachecouchdb } from "react-icons/si";
import { GrGallery } from "react-icons/gr";

import { PiBeachBallDuotone, PiBlueprintFill } from "react-icons/pi";
import { FaCameraRetro } from "react-icons/fa";

interface PersonalDataAndGoalsProps {
    register: UseFormRegister<FieldValues>
    userData: User
}

export function ThirdPage({ register, userData }: PersonalDataAndGoalsProps) {

    return (
        <Flex flexDir={'column'}>
            <Flex mb={-4} w='100%' justifyContent={'center'}>
                <Text fontSize={18} fontWeight={'medium'} borderBottom='1px' borderColor={'darkSide'} textTransform={'uppercase'}>
                    Fotos e Documentos
                </Text>
            </Flex>


            {/* Documentos */}
            <Flex mt={4} alignItems={'center'} gap={8} w='100%' flexDir={['column']}>

                <Flex w='100%'>
                    <ProjectFileInput
                        key={"documents"}
                        isRequired={false}
                        allowedTypes={['application/pdf']}
                        accept="application/pdf"
                        label_top='Documentos (PDF)'
                        register={register("document")}
                    />
                </Flex>


                <Flex w='100%' flexDir={['column', 'row', 'row', 'row', 'row']}>

                    <Flex w='100%' gap={8}>
                        <ProjectFileInput
                            key={"DESTAQUES"}
                            isRequired={false}
                            allowedTypes={['image/png', 'image/jpeg', 'image/jpg']}
                            accept="image/*"
                            label_top='Imagem da capa do projeto'
                            icon={<FaCameraRetro  color={'black'} size={20}/> }
                            multiple={false}
                            register={register("image.CAPA")}
                        />
                    </Flex>
                    <Flex w='100%' gap={8}>
                        <ProjectFileInput
                            key={"GERAL"}
                            isRequired={false}
                            allowedTypes={['image/png', 'image/jpeg', 'image/jpg']}
                            accept="image/*"
                            label_top='Imagens da fachada do projeto'
                            icon={<GrGallery  color={'teal'} size={20}/> }
                            register={register("image.FACHADA")}
                        />
                    </Flex>
                </Flex>

                <Flex w='100%' flexDir={['column', 'row', 'row', 'row', 'row']}>
                    <Flex w='100%' gap={8}>
                        <ProjectFileInput
                            key={"PLANTAS"}
                            isRequired={false}
                            allowedTypes={['image/png', 'image/jpeg', 'image/jpg']}
                            accept="image/*"
                            label_top='Imagens das plantas do projeto'
                            icon={<PiBlueprintFill  color={'#3b82f6'} size={24}/> }
                            register={register("image.PLANTAS")}
                        />
                    </Flex>
                    <Flex w='100%' gap={8}>
                        <ProjectFileInput
                            key={"EXTERNO"}
                            isRequired={false}
                            allowedTypes={['image/png', 'image/jpeg', 'image/jpg']}
                            accept="image/*"
                            label_top='Imagens da área externa do projeto'
                            icon={<PiBeachBallDuotone color={'green'} size={24}/> }
                            register={register("image.EXTERNO")}
                        />
                    </Flex>
                </Flex>

                <Flex w='100%' flexDir={['column', 'row', 'row', 'row', 'row']}>
                    <Flex w='100%' gap={8}>
                        <ProjectFileInput
                            key={"INTERNO"}
                            isRequired={false}
                            allowedTypes={['image/png', 'image/jpeg', 'image/jpg']}
                            accept="image/*"
                            label_top='Imagens da área interna do projeto'
                            icon={<SiApachecouchdb color='orange' size={24}/> }
                            register={register("image.INTERNO")}
                        />
                    </Flex>
                    <Flex w='100%' gap={8} flexDir={['column', 'row', 'row', 'row', 'row']} >
                        <ProjectFileInput
                            key={"PANORAMICAS"}
                            isRequired={false}
                            allowedTypes={['image/png', 'image/jpeg', 'image/jpg']}
                            accept="image/*"
                            label_top='Imagens 360º do projeto'
                            icon={<TbView360Number color="teal" size={24} />}
                            register={register("image.MEDIA360")}
                        />
                    </Flex>
                </Flex>


            </Flex>
        </Flex>
    )

}