import { Button, Flex, Input, Link, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { TbEdit } from "react-icons/tb";
import { SpinnerFullScreen } from '../Loading/SpinnerFullScreen';
import { useEffect, useState } from 'react';
import { getUsersResumed } from '@/app/api/getUsersResumed/route';
import { UserProfile } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/navigation';
import { Trash } from 'phosphor-react';

interface FormUsersProps {
    userData: User | null
    user: UserProfile | undefined
}

function UsersList({ userData, user }: FormUsersProps) {

    const [usersList, setUsersList] = useState<User[] | undefined>()
    const [pageLoaded, setPageLoaded] = useState(false)
    const router = useRouter()

    useEffect(() => {

        const fetchUserData = async (page: number, pageRange: number) => {
            try {

                const users = await getUsersResumed(page, pageRange)

                setUsersList(users)
                setPageLoaded(true)

            } catch (error) {

                console.error('Erro ao buscar dados do usuário:', error);
            }
        }

        if (user) {
            fetchUserData(0, 15)
        }

    }, [])

    const handleEditUser = (user: User) => {

        const { id } = user
        switch (user.role) {
            case 'PROJECT_MANAGER':
                router.push(`update/project-manager/${id}`)
                break
            case 'INVESTOR':
                router.push(`update/investor/${id}`)
                break
            case 'ADMINISTRATOR':
                router.push(`update/administrator/${id}`)
                break
        }
    }


    if (!userData) {
        return (
            <SpinnerFullScreen />
        )
    }
    if (!pageLoaded) {
        return (
            <SpinnerFullScreen />
        )
    }

    return (
        <Flex w='100%' flexDirection="column" gap={2}>
            {/* <Flex border={'1px solid'} borderColor={'grayDivisor'} borderRadius={4}>
                <Flex justifyContent={'space-between'} w='100%'>

                    <Flex w='100%' flexDir={'column'}>

                        <Flex fontSize={14} fontWeight={'normal'} borderBottom={'1px solid'} borderColor={'grayDivisor'} p={2}>
                            Nome
                        </Flex>

                        {usersList?.map((user, index) => {
                            return (
                                <Flex key={'name' + index} fontSize={14} fontWeight={'medium'} borderBottom={'1px solid'} borderColor={'grayDivisor'} p={2}> {user.name} </Flex>
                            )
                        })}
                    </Flex>
                    <Flex w='100%' flexDir={'column'}>

                        <Flex fontSize={14} fontWeight={'normal'} borderBottom={'1px solid'} borderColor={'grayDivisor'} p={2}>
                            E-mail
                        </Flex>

                        {usersList?.map((user, index) => {
                            return (
                                <Flex key={'email' + index} fontSize={14} fontWeight={'medium'} borderBottom={'1px solid'} borderColor={'grayDivisor'} p={2}> {user.email} </Flex>
                            )
                        })}
                    </Flex>
                    <Flex w='100%' flexDir={'column'} justifyContent={'space-between'}>

                        <Flex fontSize={14} fontWeight={'normal'} borderBottom={'1px solid'} borderColor={'grayDivisor'} p={2} justifyContent={'space-between'}>
                            <Flex fontSize={14} fontWeight={'normal'}>
                                Tipo de usuário
                            </Flex>
                            <Flex fontSize={14} fontWeight={'normal'}>
                                Editar
                            </Flex>
                        </Flex>

                        {usersList?.map((userListed, index) => {
                            let role = ''
                            switch (userListed.role) {
                                case 'PROJECT_MANAGER':
                                    role = 'Gerente de projetos'
                                    break
                                case 'INVESTOR':
                                    role = 'Investidor'
                                    break
                                case 'ADMINISTRATOR':
                                    role = 'Administrador'
                                    break
                            }

                            return (
                                <Flex key={'role' + index} fontSize={14} fontWeight={'medium'} borderBottom={'1px solid'} borderColor={'grayDivisor'} p={2} justifyContent={'space-between'}>
                                    <Flex>
                                        {role}
                                    </Flex>
                                    <Flex>
                                        <Flex
                                            onClick={() => {
                                                handleEditUser(userListed)
                                            }}
                                            _hover={{ color: 'redSide' }}
                                            fontWeight={'medium'}
                                            cursor={'pointer'}
                                            alignItems={'center'}
                                            fontSize={16}
                                            pr={2}
                                        >
                                            <TbEdit />
                                        </Flex>
                                    </Flex>
                                </Flex>
                            )
                        })}
                    </Flex>

                </Flex>
            </Flex> */}


            <TableContainer>
                <Table variant={'simple'}>
                    <Thead>
                        <Tr>
                            <Th>Nome</Th>
                            <Th>E-mail</Th>
                            <Th>Tipo de usuário</Th>
                        </Tr>
                    </Thead>
                    <Tbody>

                        {usersList?.map((user, index) => {

                            let role = ''
                            switch (user.role) {
                                case 'PROJECT_MANAGER':
                                    role = 'Gerente de projetos'
                                    break
                                case 'INVESTOR':
                                    role = 'Investidor'
                                    break
                                case 'ADMINISTRATOR':
                                    role = 'Administrador'
                                    break
                            }

                            return (
                                <Tr key={'name' + index}>
                                    <Td>{user.name}</Td>
                                    <Td>{user.email}</Td>
                                    <Td>
                                        <Flex gap={2} justifyContent={'space-between'}>
                                            <Flex key={'role' + index} fontSize={14} fontWeight={'medium'} p={2} justifyContent={'space-between'} w='100%'>
                                                <Flex>
                                                    {role}
                                                </Flex>
                                                <Flex>
                                                    <Flex
                                                        onClick={() => {
                                                            handleEditUser(user)
                                                        }}
                                                        _hover={{ color: 'redSide' }}
                                                        fontWeight={'medium'}
                                                        cursor={'pointer'}
                                                        alignItems={'center'}
                                                        fontSize={16}
                                                        pr={2}
                                                    >
                                                        <TbEdit />
                                                    </Flex>
                                                </Flex>
                                            </Flex>
                                        </Flex>
                                    </Td>
                                </Tr>
                            )
                        })}

                    </Tbody>
                </Table>
            </TableContainer>
        </Flex>
    );
}

export default UsersList
