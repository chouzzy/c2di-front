import { Flex, Box, Text, Icon, Link, Image, Button, Spinner } from '@chakra-ui/react';
import {
    CaretDown,
    SquaresFour,
    BookOpen,
    ChartLineUp,
    User,
    SignOut,
    Users,
    House
} from 'phosphor-react';
import { MenuItem } from './MenuItem';
import { Header } from './Header';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface SideBarProps {
    userData: User | null
}

export function SideBar({ userData }: SideBarProps) {

    const pathName = usePathname()

    const [pathRoleState, setPathRoleState] = useState('')

    const [loadingRole, setLoadingRole] = useState(true)


    useEffect(() => {
        const getRolePath = async (userData: User) => {
            switch (userData.role) {

                case 'INVESTOR':
                    setPathRoleState('investor')
                    setLoadingRole(false)
                    break
                case 'PROJECT_MANAGER':
                    setPathRoleState('project-manager')
                    setLoadingRole(false)
                    break
                case 'ADMINISTRATOR':
                    setPathRoleState('administrator')
                    setLoadingRole(false)
                    break
            }
        }

        if (userData) {
            getRolePath(userData)
        }

    }, [userData])

    if (loadingRole) {
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
                <Flex flexDir={'column'} w='100%' gap={12} alignItems={'center'} my='auto'>
                    <Spinner boxSize={16} />
                </Flex>


                {/* Rodapé */}
                <Flex flexDir={'column'} gap={8}>
                    <Image src="/assets/logo_c2di.svg" alt="logo" />
                </Flex>
            </Flex>
        )
    }


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

                    <MenuItem href={`dashboard`} isActive={pathName == "/dashboard"} icon={SquaresFour} title='Dashboard' />

                    {(userData?.role == "ADMINISTRATOR" || userData?.role == 'PROJECT_MANAGER') ?
                        <MenuItem href={`imoveis`} isActive={pathName == "/imoveis"} icon={House} title='Imóveis' />
                        :
                        ''
                    }
                    {userData?.role == "ADMINISTRATOR" ?
                        <MenuItem href={`users/list`} isActive={pathName == "/users/list"} icon={Users} title='Usuários' />
                        :
                        ''
                    }
                    {userData?.role == "INVESTOR" ?
                        <>
                            <MenuItem href={`investimentos`} icon={BookOpen} title='Meus investimentos' />
                            <MenuItem href={`investir`} icon={ChartLineUp} title='Investir' />
                        </>
                        :
                        ''
                    }
                    <MenuItem href={`users/update/${pathRoleState}`} isActive={pathName == "/users/update"} icon={User} title='Meu perfil' />
                    <MenuItem href={`api/auth/logout`} isActive={pathName == "/api/auth/logout"} icon={SignOut} title='Logout' />

                </Flex>

            </Flex>


            {/* Rodapé */}
            <Flex flexDir={'column'} gap={8}>
                <Image src="/assets/logo_c2di.svg" alt="logo" />
            </Flex>
        </Flex>
    );
}