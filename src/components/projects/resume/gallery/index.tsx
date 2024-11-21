import { Button, Flex, Image, Text } from "@chakra-ui/react"
import { CapaGaleria } from "./capa"
import { FotosGaleria } from "./fotos"
import { PlantasGaleria } from "./plantas"
import { Galeria360 } from "./galeria360"



interface ProjectDataProps {
    projectData: Investment
    userData: User
}

export function ProjectGallery({ userData, projectData }: ProjectDataProps) {

    return (
        <Flex flexDir={'column'} py={4} gap={8}>

            <Flex flexDir={'column'} w='100%'>
                <Flex w='100%' gap={16}>

                    {/* CAPA */}
                    <CapaGaleria userData={userData} projectData={projectData} />

                    {/* FOTOS */}
                    <FotosGaleria projectData={projectData} />

                </Flex>
            </Flex>



            <Flex flexDir={'column'} w='100%'>
                <Flex w='100%' gap={16}>

                    {/* PLANTAS */}
                    <PlantasGaleria projectData={projectData}/>


                    {/* 360 GALERIA */}
                    <Galeria360 projectData={projectData}/>
                    
                </Flex>
            </Flex>
        </Flex>
    )
}