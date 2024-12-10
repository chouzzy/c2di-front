import { Flex, Box, Text, Icon, Link, Image, Button, Spinner, useBreakpointValue, IconButton, Menu, MenuButton, MenuList, MenuItem as ChakraMenuItem } from '@chakra-ui/react';
import {
    CaretDown,
    SquaresFour,
    BookOpen,
    ChartLineUp,
    User,
    SignOut,
    Users,
    House,
    List
} from 'phosphor-react';
import { MenuItem } from './MenuItem';
import { Header } from './Header';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BsBuildings } from 'react-icons/bs';
import { UserNotificationsModal } from './Header/userNotificationsModal';

interface SideBarProps {
    userData: User | null
    projectData?: Investment
}

export function SideBar({ userData, projectData }: SideBarProps) {

    const isMobile = useBreakpointValue({
        base: true,
        sm: true,
        md: false,
        lg: false,
        xl: false
    })

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


                <Flex flexDir={'column'} gap={8} >
                    <Image src="/assets/logo_c2di.svg" alt="logo" />
                </Flex>
            </Flex>
        )
    }


    return (

        <>
            {isMobile ?


                // MOBILE
                <Flex w='100%'>

                    <Flex justifyContent={'space-between'} w='100%' p={4}>

                        <Link _hover={{ textDecor: 'none' }} href='/'>
                            <Flex>
                                <Image src='/assets/logo_c2di.png' objectFit={'contain'} maxW={24} />
                            </Flex>
                        </Link>

                        {/* MENU E NOTIFICAÇÕES */}
                        <Flex alignItems={'center'} gap={4}>

                            <Flex>
                                {userData ? <UserNotificationsModal userData={userData} /> : ''}
                            </Flex>

                            <Flex>
                                <Menu>
                                    <MenuButton
                                        as={IconButton}
                                        aria-label='Options'
                                        icon={<List />}
                                        variant='outline'
                                    />
                                    <MenuList
                                        w='100vw'
                                        bgColor="beigeSide"
                                        color="darkSide"
                                        borderRadius={0}
                                    >
                                        <Flex flexDir={'column'} w='100%' gap={12}>
                                            {userData ?

                                                <Header isMobile={isMobile} name={userData.name} userData={userData} />
                                                :
                                                <Flex boxSize={16} mx='auto'>
                                                    <Spinner
                                                        boxSize={8}
                                                        color='darkSide'
                                                    />
                                                </Flex>
                                            }
                                            <Flex flexDirection="column" alignItems="flex-start" w="100%">



                                                {(userData?.role != 'PROJECT_MANAGER') ?
                                                    <MenuItem href={`dashboard`} isActive={pathName == "/dashboard"} icon={SquaresFour} title='Dashboard' />
                                                    :
                                                    ''
                                                }

                                                {(userData?.role == "ADMINISTRATOR") ?
                                                    <MenuItem href={`projects`} isActive={pathName == `/projects/${projectData?.id}` || pathName == `/projects`} icon={House} title='Imóveis' />
                                                    :
                                                    ''
                                                }
                                                {(userData?.role == 'PROJECT_MANAGER') ?
                                                    <MenuItem href={`projects`} isActive={pathName.startsWith(`/project-manager`)} icon={BsBuildings} title='Projetos' />
                                                    :
                                                    ''
                                                }
                                                {userData?.role == "ADMINISTRATOR" ?
                                                    <MenuItem href={`users/list`} isActive={pathName == "/users/list" || pathName.startsWith('/users/update/investor') || pathName.startsWith('/users/update/project-manager') || pathName.startsWith('/users/update/administrator/')} icon={Users} title='Usuários' />
                                                    :
                                                    ''
                                                }
                                                {userData?.role == "INVESTOR" ?
                                                    <>
                                                        <MenuItem href={`myInvestments`} isActive={pathName == `/myInvestments`} icon={BookOpen} title='Meus investimentos' />
                                                        <MenuItem href={`projects`} icon={ChartLineUp} isActive={pathName.startsWith(`/projects`)} title='Investir' />
                                                    </>
                                                    :
                                                    ''
                                                }
                                                <MenuItem href={`users/update/${pathRoleState}`} isActive={pathName == `/users/update/${pathRoleState}`} icon={User} title='Meu perfil' />
                                                <MenuItem href={`api/auth/logout`} isActive={pathName == "/api/auth/logout"} icon={SignOut} title='Logout' />

                                            </Flex>
                                        </Flex>
                                    </MenuList>
                                </Menu>
                            </Flex>

                        </Flex>
                    </Flex>
                </Flex>
                :

                // DESKTOP
                <Flex
                    zIndex={1}
                    flexDirection="column"
                    alignItems="start"
                    justifyContent="space-between"
                    position={['fixed']}
                    h='100vh'
                    w={64}
                    px={4}
                    py={8}
                    bg="beigeSide"
                    color="darkSide"
                >
                    <Flex flexDir={'column'} w='100%' gap={12}>


                        {/* Cabeçalho */}

                        {userData ?

                            <Header isMobile={isMobile} name={userData.name} userData={userData} />
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


                            {(userData?.role != 'PROJECT_MANAGER') ?
                                <MenuItem href={`dashboard`} isActive={pathName == "/dashboard"} icon={SquaresFour} title='Dashboard' />
                                :
                                ''
                            }

                            {(userData?.role == "ADMINISTRATOR") ?
                                <MenuItem href={`projects`} isActive={pathName == `/projects/${projectData?.id}` || pathName == `/projects`} icon={House} title='Imóveis' />
                                :
                                ''
                            }
                            {(userData?.role == 'PROJECT_MANAGER') ?
                                <MenuItem href={`projects`} isActive={pathName.startsWith(`/project-manager`)} icon={BsBuildings} title='Projetos' />
                                :
                                ''
                            }
                            {userData?.role == "ADMINISTRATOR" ?
                                <MenuItem href={`users/list`} isActive={pathName == "/users/list" || pathName.startsWith('/users/update/investor') || pathName.startsWith('/users/update/project-manager') || pathName.startsWith('/users/update/administrator/')} icon={Users} title='Usuários' />
                                :
                                ''
                            }
                            {userData?.role == "INVESTOR" ?
                                <>
                                    <MenuItem href={`myInvestments`} isActive={pathName == `/myInvestments`} icon={BookOpen} title='Meus investimentos' />
                                    <MenuItem href={`projects`} icon={ChartLineUp} isActive={pathName.startsWith(`/projects`)} title='Investir' />
                                </>
                                :
                                ''
                            }
                            <MenuItem href={`users/update/${pathRoleState}`} isActive={pathName == `/users/update/${pathRoleState}`} icon={User} title='Meu perfil' />
                            <MenuItem href={`api/auth/logout`} isActive={pathName == "/api/auth/logout"} icon={SignOut} title='Logout' />

                        </Flex>

                    </Flex>


                    {/* Rodapé */}
                    <Flex flexDir={'column'} gap={8}>
                        <Image src="/assets/logo_c2di.svg" alt="logo" />
                    </Flex>
                </Flex>
            }



        </>
    );
}