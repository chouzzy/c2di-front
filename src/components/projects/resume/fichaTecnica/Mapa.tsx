import { Flex, Text } from "@chakra-ui/react";
import { FaMapMarkerAlt } from "react-icons/fa";

interface MapaProps {
    projectData: Investment
}
export function Mapa({ projectData }: MapaProps) {

    return (

        <Flex w='100%' flexDir={'column'} justifyContent={'space-between'} gap={4} p={2}>

            <Flex alignItems={'center'} gap={1}> <FaMapMarkerAlt color='#EF3A5D' size={16} /> <Text fontWeight={'semibold'} fontSize={'2xl'}>  Mapa</Text></Flex>

            <Flex flexDir={'column'} gap={1} h='100%'>
                {/* <Link
                                    target='_blank'
                                    _hover={{ textDecor: 'none', color: 'redSide' }}
                                    href={`https://www.google.com/maps/search/?api=1&query=${projectData.address.street}, ${projectData.address.number}`}
        
                                >
                                    <Flex fontWeight={'medium'} fontSize={'lg'} alignItems={'center'} gap={2} w='fit-content'>
                                        <FaMapMarkerAlt color='#EF3A5D' size={24} />
                                        <Text pt={1}>
                                            {projectData.address.street}, {projectData.address.number}
                                        </Text>
                                        <ArrowSquareOut size={16} />
                                    </Flex>
        
                                </Link> */}

                <Flex h='100%'>
                    <iframe
                        src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4296.539687304793!2d-46.6684263!3d-23.5234661!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce58005a28358f%3A0x244a94b503eff957!2s${projectData.address.street}, ${projectData.address.number}!5e1!3m2!1spt-BR!2sbr!4v1740082473043!5m2!1spt-BR!2sbr`}
                        style={{ borderRadius: 8, width: '100%', height: '100%' }}
                        loading="lazy"
                    />
                </Flex>
            </Flex>
        </Flex>
    )
}