import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, Flex, Input, InputGroup, InputLeftAddon, Select, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { UserProfile } from '@auth0/nextjs-auth0/client';
import { Door, Trash } from 'phosphor-react';
import { ProjectFileInput } from '@/components/CreateProjects/Inputs/FileInput';
import { useForm } from 'react-hook-form';
import { formatadorMoedaReal } from '@/app/services/utils';
import { TfiEmail } from "react-icons/tfi";
import { LiaMoneyBillWaveAltSolid } from "react-icons/lia";
import { BiSolidUserCircle } from "react-icons/bi";
import { FaMoneyCheckAlt } from 'react-icons/fa';
import { BsCalendarDateFill } from 'react-icons/bs';
import { PiElevator } from 'react-icons/pi';
import { ErrorInputComponent } from '@/components/ErrorInputComponent';
import { AddEditButtons, deleteUserProprietario, deleteUserProprietarioTrigger, getUserProprietarios, getUsers, onSubmitProprietario } from './utils';


interface FormUsersProps {
    user: UserProfile | undefined
    projectData: Investment
    documentList: ProjectDocuments[] | undefined
    setDocumentList: Dispatch<SetStateAction<ProjectDocuments[] | undefined>>
    userData: User
}


function ProprietarioList({ userData, projectData }: FormUsersProps) {

    const bgButtonColor = useColorModeValue('darkSide', 'dark.lightSide')

    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef(null);

    const { register, handleSubmit } = useForm({});

    const hoje = new Date().toISOString().split('T')[0];

    const [editMode, setEditMode] = useState(false); // Estado para controlar o modo de edição
    const [addMode, setAddMode] = useState(false); // Estado para controlar o modo de edição
    const [yupError, setYupError] = useState('')

    const [usersList, setUsersList] = useState<User[]>()
    const [userProprietariosList, setUserProprietariosList] = useState<UserProprietario[]>()


    const [investorDate, setInvestorDate] = useState<Date>(new Date());
    const [deletingUserProprietario, setDeletingUserProprietario] = useState(false)
    const [userProprietarioID, setUserProprietarioID] = useState('')

    const [investor, setInvestor] = useState<User>()

    const [apartamentos, setApartamentos] = useState<any[]>(
        (projectData.apartaments
            .map(apartament => apartament.final)
            .reduce((unique: string[], final: string) => {
                if (!unique.includes(final)) {
                    unique.push(final);
                }
                return unique;
            }, []))
    )


    const [andares, setAndares] = useState<string[]>(projectData.apartaments
        .map(apartament => apartament.andar)
        .reduce((unique: string[], andar: string) => {
            if (!unique.includes(andar)) {
                unique.push(andar);
            }
            return unique;
        }, []))

    // GET USERS E USERSINVESTMENT
    useEffect(() => {

        if (!usersList) {
            getUsers(setUsersList)
            getUserProprietarios(setUserProprietariosList, projectData)
        }

    }, [])

    // DELETE USER INVESTMENT
    useEffect(() => {

        if (deletingUserProprietario && userProprietarioID) {
            deleteUserProprietario(userProprietarioID, setUserProprietariosList, userProprietariosList)
            setUserProprietarioID('')
            setDeletingUserProprietario(false)
        }

    }, [deletingUserProprietario])

    return (
        <>
            <Flex w='100%' flexDirection="column" gap={2}>

                <ErrorInputComponent error={yupError} />

                <AddEditButtons userData={userData} editMode={editMode} addMode={addMode} setEditMode={setEditMode} setAddMode={setAddMode} />

                <Flex w={['90vw', '90vw', '90vw', '100%', '100%']} flexDir={'column'}>

                    {/* TABELA DE PROPRIETÁRIOS */}
                    <TableContainer w={'100%'}>
                        <Table variant={'simple'}>
                            <Thead>
                                <Tr>
                                    <Th>Proprietário</Th>
                                    <Th>E-mail</Th>
                                    <Th>Perfil</Th>
                                    <Th>Andar - Final</Th>
                                    <Th>Valor investido</Th>
                                    <Th>Data do investimento</Th>
                                </Tr>
                            </Thead>
                            <Tbody>

                                {userProprietariosList?.map((userProprietario, index) => {

                                    const user = usersList?.filter((user: User) => { return user.id === userProprietario.userID })[0]
                                    const date = `${new Date(userProprietario.dataInvestimento).toLocaleDateString("pt-br")}`

                                    const userApartament = projectData.apartaments.find(apartament => apartament.id === userProprietario.apartamentID)
                                    // if (!userApartament) {
                                    //     return
                                    // }


                                    return (
                                        <Tr key={'name' + index}>
                                            <Td>{user?.name}</Td>
                                            <Td>{user?.email}</Td>
                                            <Td>{user?.investorProfileName ?? 'Não informado'}</Td>
                                            <Td>{userApartament?.andar} - {userApartament?.final}</Td>
                                            <Td>{formatadorMoedaReal.format(userProprietario.investedValue)}</Td>
                                            <Td>{date}</Td>
                                            {/* <Td>{user.description}</Td> */}
                                            <Td>
                                                <Flex gap={2} justifyContent={'space-between'}>

                                                    {editMode ?

                                                        <Flex
                                                            onClick={() => {
                                                                deleteUserProprietarioTrigger({ id: userProprietario.id, setDeletingUserProprietario, setUserProprietarioID })
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
                        <form onSubmit={handleSubmit((data) => onSubmitProprietario({ data, investor, projectData, setYupError, investorDate, userProprietariosList, setAddMode, onOpen }))}>

                            <Flex flexDir={'column'} p={[0, 0, 0, 4, 4]} mt={8} bgColor={bgButtonColor} borderRadius={'md'} color={'lightSide'}>

                                <Flex pt={4} textAlign={'center'}>
                                    <Text fontSize={24} mx='auto' fontWeight={'semibold'}> NOVO PROPRIETÁRIO </Text>
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
                                        <InputLeftAddon color='grayHoverSide' justifyContent={'center'} w={14} border={'none'} bgColor={'redSide'}> <PiElevator size={20} /> </InputLeftAddon>
                                        <Select required borderRadius={'0px 8px 8px 0px'} bgColor={'lightSide'} placeholder='Andar' {...register('andar')}>
                                            {andares.map((andar, index) => {
                                                return <option key={andar + index} value={andar}>{andar}</option>
                                            })}
                                        </Select>
                                    </InputGroup>
                                    <InputGroup>
                                        <InputLeftAddon color='grayHoverSide' justifyContent={'center'} w={14} border={'none'} bgColor={'redSide'}> <Door size={20} /> </InputLeftAddon>
                                        <Select required borderRadius={'0px 8px 8px 0px'} bgColor={'lightSide'} placeholder='Final' {...register('final')}>
                                            {apartamentos.map((apartament, index) => {
                                                return <option key={apartament + index} value={apartament}>{apartament}</option>
                                            })}
                                        </Select>
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
                                        <InputLeftAddon color='grayHoverSide' justifyContent={'center'} w={14} border={'none'} bgColor={'redSide'}> <LiaMoneyBillWaveAltSolid size={24} />  </InputLeftAddon>
                                        <Input required bgColor={'lightSide'} type='number' placeholder='Valor investido' {...register('investedValue', { valueAsNumber: true })} />
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
            <>
                <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader fontSize="lg" fontWeight="bold">
                                Atenção!
                            </AlertDialogHeader>

                            <AlertDialogBody>
                                Este apartamento já possui um proprietário cadastrado. Exclua-o antes de prosseguir.
                            </AlertDialogBody>

                            <AlertDialogFooter>
                                <Button ref={cancelRef} onClick={onClose} colorScheme='red'>
                                    Ok
                                </Button>

                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>
            </>
        </>
    );
}

export default ProprietarioList