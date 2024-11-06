import { Flex, Box, Text, Icon, Link, Image, Button, Spinner } from '@chakra-ui/react';
import {
    CaretDown,
    SquaresFour,
    BookOpen,
    ChartLineUp,
    User,
    SignOut
} from 'phosphor-react';
import { MenuItem } from './MenuItem';
import { Header } from './Header';

interface SideBarProps {
    userData: User | null
}

export function SideBar({ userData }: SideBarProps) {


    return (
        <Flex
            flexDirection="column"
            alignItems="start"
            justifyContent="space-between"
            w={64}
            h="100%" // Altura total da tela
            px={4}
            py={8}
            bg="beigeSide"
            color="darkSide"

        >
            <Flex flexDir={'column'} w='100%' gap={12}>


                {/* Cabeçalho */}

                {userData ?

                    <Header name={userData.name} />
                    :
                    <Flex boxSize={16} mx='auto'>
                        <Spinner
                            boxSize={8}
                            color='darkSide'
                        />
                    </Flex>
                }

                {/* Itens do menu */}
                <Flex flexDirection="column" alignItems="flex-start" w="100%">
                    <MenuItem href={`dashboard`} icon={SquaresFour} title='Dashboard' />
                    <MenuItem href={`investimentos`} icon={BookOpen} title='Meus investimentos' />
                    <MenuItem href={`investir`} icon={ChartLineUp} title='Investir' />
                    <MenuItem href={`users/update`} isActive icon={User} title='Meu perfil' />
                    <MenuItem href={`api/auth/logout`} icon={SignOut} title='Logout' />

                </Flex>

            </Flex>


            {/* Rodapé */}
            <Flex flexDir={'column'} gap={8}>
                <Image src="/assets/logo_c2di.svg" alt="logo" />
            </Flex>
        </Flex>
    );
}