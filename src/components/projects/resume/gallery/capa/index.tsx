import { changePrismaProjectCapa } from "@/app/services/changeCapa";
import { CapaInput } from "@/components/CreateProjects/Inputs/CapaInput";
import { ProjectFileInput } from "@/components/CreateProjects/Inputs/FileInput";
import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface ProjectDataProps {
    projectData: Investment
    userData: User
}
export function CapaGaleria({ userData, projectData }: ProjectDataProps) {

    const { register, handleSubmit, formState: { errors } } = useForm({});

    return (

        <Flex flexDir={'column'} w='100%' gap={6}>
            {/* HEADER */}
            <Flex justifyContent={'space-between'} w='100%' alignItems={'center'}>
                <Flex flexDir={'column'}>
                    <Flex> <Text fontSize={16} fontWeight={'semibold'}> Capa </Text></Flex>
                    <Flex> <Text fontSize={14}> Imagem que aparecerá como capa do projeto. </Text></Flex>
                </Flex>
                {userData.role != 'INVESTOR' ?

                    <Flex>
                        <CapaInput
                            key={"CAPA"}
                            allowedTypes={['image/png', 'image/jpeg', 'image/jpg']}
                            accept="image/*"
                            projectData={projectData}
                        />
                    </Flex>
                    : ''}
            </Flex>

            {/* IMAGE */}
            <Flex>
                <Image src={`${projectData.images[0].url}`} h={32} w='100%' objectFit={'cover'} objectPosition={'center'} />
            </Flex>
        </Flex>
    )
}