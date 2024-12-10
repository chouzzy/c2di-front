import { UserProfile } from "@auth0/nextjs-auth0/client";
import { Flex, Text, useBreakpointValue } from "@chakra-ui/react";
import { HouseLine, Plus} from "phosphor-react";
import { FaHammer } from "react-icons/fa";
import { PiBuildingApartmentThin, PiBulldozerThin, PiHammer } from "react-icons/pi";

interface HeaderProjectProps {
    userData: User | null
    user: UserProfile
}

export function CreateProjectHeader() {

    const iconWidth = useBreakpointValue({ base: 48, sm: 48, md: 48, lg: 64, xl: 64 })

    return (
        <>
            <Flex justifyContent={'space-between'} w='100%' alignItems={'end'}>

                <Flex flexDir={'column'}>
                    <Flex>
                        <Text fontSize={[18,18,18,28,28]} fontWeight={'semibold'}>
                            Criação de projetos
                        </Text>
                    </Flex>
                    <Flex>
                        <Text fontSize={[12,12,12,16,16]}>
                            Atente-se a todos os campos necessários na criação do projeto
                        </Text>
                    </Flex>
                </Flex>
                <Flex borderBottom={'1px'} borderColor={'darkSide'} color="redSide" alignItems={'center'}>
                    <Plus size={24} />
                    <PiBuildingApartmentThin size={iconWidth} />
                </Flex>
            </Flex>
        </>


    )
}