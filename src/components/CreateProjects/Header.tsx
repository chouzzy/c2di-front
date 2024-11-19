import { UserProfile } from "@auth0/nextjs-auth0/client";
import { Flex, Text } from "@chakra-ui/react";
import { HouseLine, Plus} from "phosphor-react";
import { FaHammer } from "react-icons/fa";
import { PiBuildingApartmentThin, PiBulldozerThin, PiHammer } from "react-icons/pi";

interface HeaderProjectProps {
    userData: User | null
    user: UserProfile
}

export function CreateProjectHeader() {

    return (
        <>
            <Flex justifyContent={'space-between'} w='100%' alignItems={'end'}>

                <Flex flexDir={'column'}>
                    <Flex>
                        <Text fontSize={28} fontWeight={'semibold'}>
                            Criação de projetos
                        </Text>
                    </Flex>
                    <Flex>
                        <Text fontSize={16}>
                            Atente-se a todos os campos necessários na criação do projeto
                        </Text>
                    </Flex>
                </Flex>
                <Flex borderBottom={'1px'} borderColor={'darkSide'} color="redSide" alignItems={'center'}>
                    <Plus size={24} />
                    <PiBuildingApartmentThin size={64} />
                </Flex>
            </Flex>
        </>


    )
}