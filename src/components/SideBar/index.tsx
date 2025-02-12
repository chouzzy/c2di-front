import { Flex, Box, Text, Icon, Link, Image, Button, Spinner, useBreakpointValue, IconButton, Menu, MenuButton, MenuList, MenuItem as ChakraMenuItem, useColorModeValue } from '@chakra-ui/react';
import {
    CaretDown,
    SquaresFour,
    BookOpen,
    ChartLineUp,
    User,
    SignOut,
    Users,
    House,
    List,
    HouseLine
} from 'phosphor-react';
import { MenuItem } from './MenuItem';
import { Header } from './Header';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BsBuildings } from 'react-icons/bs';
import { UserNotificationsModal } from './Header/userNotificationsModal';
import { PiBuilding } from 'react-icons/pi';

interface SideBarProps {
    userData: User | null
    projectData?: Investment
}

export function SideBar({ userData, projectData }: SideBarProps) {

    const isMobile = useBreakpointValue({
        base: true,
        sm: true,
        md: true,
        lg: true,
        xl: false
    })

    const bgColor = useColorModeValue('beigeSide', 'dark.beigeSide'); // Pega a cor 'bg' do objeto 'light' ou 'dark'
    const textColor = useColorModeValue('darkSide', 'dark.darkSide'); // Pega a cor 'text' do objeto 'light' ou 'dark'
    const logoSrc = useColorModeValue('/assets/logo_c2di.png', '/assets/logo_c2di_white.png'); // Caminhos para as duas versões do logo


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
                case 'PROPRIETARIO':
                    setPathRoleState('proprietario')
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
                bg={bgColor}
                color={textColor}

            >
                <Flex flexDir={'column'} w='100%' gap={12} alignItems={'center'} my='auto'>
                    <Spinner boxSize={16} />
                </Flex>


                {/* Rodapé */}
                <Flex flexDir={'column'} gap={8} >
                    <Image src={logoSrc} alt="logo" objectFit={'contain'} maxW={36} />
                </Flex>
            </Flex>
        )
    }


    return (

        <>
            {isMobile ?

                // MOBILE
                <Flex w='100%' alignItems={'center'}>

                    <Flex justifyContent={'space-between'} w='100%' p={4} alignItems={'center'}>

                        <Link _hover={{ textDecor: 'none' }} href='/'>
                            <Flex>
                                <Image src={logoSrc} alt="logo" objectFit={'contain'} maxW={24}/>
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
                                        bgColor={useColorModeValue('beigeSide', 'dark.beigeSide')}
                                        color={useColorModeValue('beigeSide', 'lightSide')}
                                        borderRadius={0}
                                        p={[4, 4, 4, 8, 8]}
                                    >
                                        <Flex flexDir={'column'} w='100%' gap={12}>
                                            {userData ?

                                                <Header isMobile={isMobile} name={userData.name} userData={userData} />
                                                :
                                                <Flex boxSize={16} mx='auto'>
                                                    <Spinner
                                                        boxSize={8}
                                                        color={useColorModeValue('darkSide', 'dark.darkSide')}
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
                                                {userData?.role == "PROPRIETARIO" ?
                                                    <>
                                                        <MenuItem href={`myPropriedades`} isActive={pathName == `/myPropriedades`} icon={HouseLine} title='Minhas propriedades' />
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
                    bg={bgColor}
                    color={textColor}
                >
                    <Flex flexDir={'column'} w='100%' gap={12}>


                        {/* Cabeçalho */}

                        {userData ?

                            <Header isMobile={isMobile} name={userData.name} userData={userData} />
                            :
                            <Flex boxSize={16} mx='auto'>
                                <Spinner
                                    boxSize={8}
                                    color={useColorModeValue('darkSide', 'dark.darkSide')}
                                />
                            </Flex>
                        }

                        {/* Itens do menu */}
                        <Flex flexDirection="column" alignItems="flex-start" w="100%">


                            {(userData?.role != 'PROJECT_MANAGER') && (userData?.role != 'PROPRIETARIO') ?
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
                            {userData?.role == "PROPRIETARIO" ?
                                <>
                                    <MenuItem href={`myPropriedades`} isActive={pathName == `/myPropriedades`} icon={HouseLine} title='Minhas propriedades' />
                                    <MenuItem href={`projects`} icon={PiBuilding} isActive={pathName.startsWith(`/projects`)} title='Empreendimentos' />
                                </>
                                :
                                ''
                            }
                            <MenuItem href={`users/update/${pathRoleState}`} isActive={pathName == `/users/update/${pathRoleState}`} icon={User} title='Meu perfil' />
                            <MenuItem href={`api/auth/logout`} isActive={pathName == "/api/auth/logout"} icon={SignOut} title='Logout' />

                        </Flex>

                    </Flex>


                    {/* Rodapé */}
                    <Flex flexDir={'column'} gap={8} w='100%' justifyContent={'center'} alignItems={'center'} borderTop={'1px'} borderColor={'grayDivisor'}>
                        <Image src={logoSrc} alt="logo" objectFit={'contain'} maxW={32} pt={4}/>
                    </Flex>
                </Flex>
            }



        </>
    );
}