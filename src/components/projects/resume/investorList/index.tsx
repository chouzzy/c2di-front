import { Button, Flex, FormControl, Input, InputGroup, InputLeftAddon, Link, Select, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { UserProfile } from '@auth0/nextjs-auth0/client';
import { SpinnerFullScreen } from '@/components/Loading/SpinnerFullScreen';
import { Trash } from 'phosphor-react';
import { ProjectFileInput } from '@/components/CreateProjects/Inputs/FileInput';
import { useForm } from 'react-hook-form';
import { documentsArrayAdapter, formatadorMoedaReal } from '@/app/services/utils';
import { TfiEmail } from "react-icons/tfi";
import { LiaMoneyBillWaveAltSolid } from "react-icons/lia";
import { BiSolidUserCircle } from "react-icons/bi";
import { FaMoneyCheckAlt } from 'react-icons/fa';
import { BsCalendarDateFill } from 'react-icons/bs';
import { getUsersResumed } from '@/app/services/getUsersResumed';
import { createPrismaUserInvestment } from '@/app/services/createUserInvestment';
import { filterUserInvestmentsByInvestmentID, getUserInvestmentListByInvestmentID, getUserInvestmentListComplete } from '@/app/services/getUserInvestmentListByID';
import { deletePrismaUserInvestment } from '@/app/services/deleteUserInvestmentDocument';

interface FormUsersProps {
    user: UserProfile | undefined
    projectData: Investment
    documentList: ProjectDocuments[] | undefined
    setDocumentList: Dispatch<SetStateAction<ProjectDocuments[] | undefined>>
    userData: User


}

function InvestorList({ userData, projectData }: FormUsersProps) {

    const { register, handleSubmit } = useForm({});

    const hoje = new Date().toISOString().split('T')[0];

    const [editMode, setEditMode] = useState(false); // Estado para controlar o modo de edição
    const [addMode, setAddMode] = useState(false); // Estado para controlar o modo de edição

    const [usersList, setUsersList] = useState<User[]>()
    const [userInvestmentsList, setUserInvestmentsList] = useState<UserInvestment[]>()


    const [investorDate, setInvestorDate] = useState<Date>(new Date());
    const [deletingUserInvestment, setDeletingUserInvestment] = useState(false)
    const [userInvestmentID, setUserInvestmentID] = useState('')

    const [investor, setInvestor] = useState<User>()

    const deleteUserInvestmentTrigger = (id: string) => {

        setDeletingUserInvestment(true)
        setUserInvestmentID(id)
    }

    const handleEditClick = () => {
        setEditMode(true); // Ativa o modo de edição
    };
    const handleEditCancel = () => {
        setEditMode(false); // Ativa o modo de edição
        setAddMode(false); // Ativa o modo de upload
    };
    const handleAddClick = () => {
        setAddMode(true); // Ativa o modo de edição
    };


    // GET USERS E USERSINVESTMENT
    useEffect(() => {

        const getUsers = async () => {

            try {
                const usersResponse = await getUsersResumed(0, 9999)
                console.log(usersResponse)
                setUsersList(usersResponse)
            } catch (error) {
                console.error(error)
            }

        }
        const getUserInvestments = async () => {

            try {
                const userInvestments = await filterUserInvestmentsByInvestmentID({ page: `${0}`, pageRange: `${10}`, investmentID: projectData.id })
                console.log(userInvestments)
                setUserInvestmentsList(userInvestments)
            } catch (error) {
                console.error(error)
            }

        }

        console.log('usersList')
        console.log(usersList)
        if (!usersList) {
            getUsers()
            getUserInvestments()
        }

    }, [])

    // DELETE USER INVESTMENT
    useEffect(() => {

        const deleteUserInvestment = async (userInvestmentID: UserInvestment["id"]) => {

            try {
                const userInvestmentDeleted = await deletePrismaUserInvestment(userInvestmentID)

                setUserInvestmentsList(userInvestmentsList?.filter((userInvestment: UserInvestment) => userInvestment.id !== userInvestmentDeleted.id))

            } catch (error) {
                console.error(error)
            }

        }

        if (deletingUserInvestment && userInvestmentID) {
            deleteUserInvestment(userInvestmentID)
            setUserInvestmentID('')
            setDeletingUserInvestment(false)
        }

    }, [deletingUserInvestment])

    // Create Investor
    const onSubmitInvestor = async (data: any) => {

        try {

            if (!investor) { return alert('Selecione um investidor') }

            data = await documentsArrayAdapter(data)
            const createUserInvestmentData = {
                userID: investor.id,
                investmentID: projectData.id,
                investedValue: data.investedValue,
                valorCorrente: projectData.valorCorrente,
                documents: data.documents,
                dataInvestimento: new Date(investorDate.toISOString())
            }

            const userInvestmentCreated = await createPrismaUserInvestment(createUserInvestmentData)

            userInvestmentsList?.push(userInvestmentCreated)

            setAddMode(false)


        } catch (error: any) {
            console.error(error)
        }
    };

    return (
        <Flex w='100%' flexDirection="column" gap={2}>

            {userData.role != 'INVESTOR' ?
                <Flex w='100%' justifyContent={'end'}>
                    {editMode || addMode ?
                        <Button onClick={handleEditCancel} color={'lightSide'} fontWeight={'light'} bgColor={'redSide'} maxW={40}>
                            Cancelar
                        </Button>
                        :
                        <Flex gap={4}>
                            <Button color='lightSide' bgColor="graySide" onClick={handleAddClick} maxW={[24,24,24,40,40]}>
                                Adicionar
                            </Button>
                            <Button color='lightSide' bgColor="darkSide" onClick={handleEditClick} maxW={[20,20,20,40,40]}>
                                Editar
                            </Button>
                        </Flex>
                    }
                </Flex>
                : ''
            }


            <Flex w={['90vw', '90vw', '90vw', '100%', '100%']} flexDir={'column'}>
                <TableContainer w={'100%'}>
                    <Table variant={'simple'}>
                        <Thead>
                            <Tr>
                                <Th>Investidor</Th>
                                <Th>E-mail</Th>
                                <Th>Perfil</Th>
                                <Th>Valor investido</Th>
                                <Th>Data do investimento</Th>
                            </Tr>
                        </Thead>
                        <Tbody>

                            {userInvestmentsList?.map((userInvestment, index) => {

                                const user = usersList?.filter((user: User) => { return user.id === userInvestment.userID })[0]
                                const date = `${new Date(userInvestment.dataInvestimento).toLocaleDateString("pt-br")}`

                                return (
                                    <Tr key={'name' + index}>
                                        <Td>{user?.name}</Td>
                                        <Td>{user?.email}</Td>
                                        <Td>{user?.investorProfileName ?? 'Não informado'}</Td>
                                        <Td>{formatadorMoedaReal.format(userInvestment.investedValue)}</Td>
                                        <Td>{date}</Td>
                                        {/* <Td>{user.description}</Td> */}
                                        <Td>
                                            <Flex gap={2} justifyContent={'space-between'}>

                                                {editMode ?

                                                    <Flex
                                                        onClick={() => {
                                                            deleteUserInvestmentTrigger(userInvestment.id)
                                                        }}
                                                        _hover={{ color: 'redSide' }}
                                                        fontWeight={'medium'}
                                                        cursor={'pointer'}
                                                        alignItems={'center'}
                                                        fontSize={16}
                                                        pr={2}
                                                    >
                                                        <Trash />
                                                    </Flex>
                                                    :
                                                    ''
                                                }
                                            </Flex>
                                        </Td>
                                    </Tr>
                                )
                            })}

                        </Tbody>
                    </Table>
                </TableContainer>

                {addMode && usersList ?
                    <form onSubmit={handleSubmit(onSubmitInvestor)}>

                        <Flex flexDir={'column'} p={[0,0,0,4,4]} mt={8} bgColor={'darkSide'} borderRadius={'md'} color={'lightSide'}>

                            <Flex pt={4} textAlign={'center'}>
                                <Text fontSize={24} mx='auto' fontWeight={'semibold'}> NOVO INVESTIDOR </Text>
                            </Flex>

                            <Flex flexDir={'column'} gap={4} color={'black'} p={8}>
                                <InputGroup>
                                    <InputLeftAddon color='grayHoverSide' justifyContent={'center'} w={14} border={'none'} bgColor={'redSide'}> <TfiEmail size={20} /> </InputLeftAddon>
                                    <Select required borderRadius={'0px 8px 8px 0px'} bgColor={'lightSide'} placeholder='E-mail' onChange={(e) => {
                                        setInvestor(usersList.filter((user) => {
                                            return user.email === e.target.value
                                        })[0])
                                    }} >
                                        {usersList.map((user) => {
                                            return <option key={user.id} value={user.email}>{user.email}</option>
                                        })}
                                    </Select>
                                </InputGroup>
                                <InputGroup>
                                    <InputLeftAddon color='grayHoverSide' justifyContent={'center'} w={14} border={'none'} bgColor={'redSide'}> <LiaMoneyBillWaveAltSolid size={24} />  </InputLeftAddon>
                                    <Input required bgColor={'lightSide'} type='number' placeholder='Valor investido' {...register('investedValue', { valueAsNumber: true })} />
                                </InputGroup>
                                <InputGroup>
                                    <InputLeftAddon color='grayHoverSide' justifyContent={'center'} w={14} border={'none'} bgColor={'redSide'}> <BiSolidUserCircle size={24} /> </InputLeftAddon>
                                    <Input required bgColor={'lightSide'} disabled placeholder='Nome' value={investor?.name ?? undefined} />
                                </InputGroup>
                                <InputGroup>
                                    <InputLeftAddon color='grayHoverSide' justifyContent={'center'} w={14} border={'none'} bgColor={'redSide'}> <FaMoneyCheckAlt size={24} /> </InputLeftAddon>
                                    <Input required bgColor={'lightSide'} disabled placeholder='Perfil' value={investor?.investorProfileName ?? 'Não informado'} />
                                </InputGroup>
                                <InputGroup>
                                    <InputLeftAddon color='grayHoverSide' justifyContent={'center'} w={14} border={'none'} bgColor={'redSide'}> <BsCalendarDateFill size={24} /> </InputLeftAddon>
                                    <Input type='date'
                                        required bgColor={'lightSide'} placeholder='Data' min={'2023-12-31'} max={hoje}
                                        {...register('dataInvestimento', { onChange: (e) => { setInvestorDate(new Date(e.target.value)) }, })}
                                    />
                                </InputGroup>



                                <Flex w='100%' flexDir={'column'} color='lightSide'>
                                    <ProjectFileInput
                                        key={"documents"}
                                        isRequired={false}
                                        allowedTypes={['application/pdf']}
                                        accept="application/pdf"
                                        label_top='Documentos (PDF)'
                                        register={register("document")}
                                    />
                                    <Button type='submit' _hover={{ bgColor: 'redSide' }} size={'md'} borderRadius={8} color={'lightSide'} fontWeight={'light'} bgColor={'redSide'} mt={8}>
                                        Salvar dados
                                    </Button>
                                </Flex>
                            </Flex>
                        </Flex>
                    </form>
                    : ''
                }
            </Flex>

        </Flex>
    );
}

export default InvestorList