import { Button, Flex, Input, Link, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { UserProfile } from '@auth0/nextjs-auth0/client';
import { SpinnerFullScreen } from '@/components/Loading/SpinnerFullScreen';
import { Trash } from 'phosphor-react';
import { deletePrismaProjectPartner } from '@/app/services/deleteInvestmentPartner';
import { changePrismaProjectPartners } from '@/app/services/changePartner';

interface FormUsersProps {
    user: UserProfile | undefined
    projectData: Investment
    partnerList: Partners[] | undefined
    setPartnerList: Dispatch<SetStateAction<Partners[] | undefined>>
    userData: User

}

function Partners({ user, userData, projectData, partnerList, setPartnerList }: FormUsersProps) {

    const [pageLoaded, setPageLoaded] = useState(true)
    const [deletingPartner, setDeletingPartner] = useState(false)
    const [partnerID, setPartnerID] = useState('')
    const [editMode, setEditMode] = useState(false); // Estado para controlar o modo de edição
    const [addMode, setAddMode] = useState(false); // Estado para controlar o modo de edição

    const [newPartnerActivity, setNewPartnerActivity] = useState<Investment["partners"][0]["activity"]>()
    const [newPartnerUrl, setNewPartnerUrl] = useState<Investment["partners"][0]["url"]>()
    const [newPartnerName, setNewPartnerName] = useState<Investment["partners"][0]["name"]>()

    const [savePartnerConfirmed, setSavePartnerConfirmed] = useState(false)

    const deletePartnerTrigger = (id: string) => {

        setDeletingPartner(true)
        setPartnerID(id)
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

    const handleSavePartnerClick = () => {
        setSavePartnerConfirmed(true)
    }


    // DELETE PARTNER
    useEffect(() => {

        const deletePartner = async (documentID: Investment["documents"][0]["id"]) => {

            try {
                const response = await deletePrismaProjectPartner(projectData.id, documentID)
                setPartnerList(response.partners)
            } catch (error) {
                console.error(error)
            }

        }

        if (deletingPartner && partnerID) {
            deletePartner(partnerID)
            setPartnerID('')
            setDeletingPartner(false)
        }

    }, [deletingPartner])


    // ADD PARTNER
    useEffect(() => {

        const addPartner = async (newPartnerActivity: string, newPartnerUrl: string, newPartnerName: string) => {

            try {
                const newPartner: Investment["partners"][0] = {
                    id: 'newPartner',
                    activity: newPartnerActivity,
                    name: newPartnerName,
                    url: newPartnerUrl
                }

                projectData.partners.push(newPartner)

                console.log(newPartner)


                const response: Investment = await changePrismaProjectPartners(projectData.id, projectData)
                setNewPartnerActivity('')
                setNewPartnerUrl('')
                setNewPartnerName('')

                setSavePartnerConfirmed(false)
                setAddMode(false)
                console.log(response)
                setPartnerList(response.partners)
            } catch (error) {
                console.error(error)
            }

        }

        if (savePartnerConfirmed && newPartnerActivity && newPartnerUrl && newPartnerName) {

            addPartner(newPartnerActivity, newPartnerUrl, newPartnerName)
        }

    }, [savePartnerConfirmed])


    if (!partnerList) {
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

            {userData.role != 'INVESTOR' ?

                <Flex w='100%' justifyContent={'end'}>
                    {editMode || addMode ?
                        <Button onClick={handleEditCancel} color={'lightSide'} fontWeight={'light'} bgColor={'redSide'} maxW={40}>
                            Cancelar
                        </Button>
                        :
                        <Flex gap={4}>
                            <Button color='lightSide' bgColor="graySide" onClick={handleAddClick} maxW={40}>
                                Adicionar
                            </Button>
                            <Button color='lightSide' bgColor="darkSide" onClick={handleEditClick} maxW={40}>
                                Editar
                            </Button>
                        </Flex>
                    }
                </Flex>
                : ''
            }



            <TableContainer>
                <Table variant={'simple'}>
                    <Thead>
                        <Tr>
                            <Th>Atuação</Th>
                            <Th>Empresa</Th>
                            <Th>Link</Th>
                        </Tr>
                    </Thead>
                    <Tbody>

                        {partnerList?.map((partner, index) => {
                            return (
                                <Tr key={'name' + index}>
                                    <Td>{partner.activity}</Td>
                                    <Td>{partner.name}</Td>
                                    <Td>
                                        <Flex gap={2} justifyContent={'space-between'}>
                                            <Link href={`${partner.url}`} target='_blank' _hover={{ color: 'blue.400' }}>
                                                {partner.url.length > 72 ? partner.url.slice(0, 72) + '...' : partner.url}
                                            </Link>
                                            {editMode ?

                                                <Flex
                                                    onClick={() => {
                                                        deletePartnerTrigger(partner.id)
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
                        {addMode ?
                            <Tr>
                                <Td><Input placeholder='Segmento' onChange={(e) => { setNewPartnerActivity(e.target.value) }} /></Td>
                                <Td><Input placeholder='Nome da empresa' onChange={(e) => { setNewPartnerName(e.target.value) }} /></Td>
                                <Td>
                                    <Flex gap={4}>


                                        <Input placeholder='URL: Ex: https://www.magazineluiza.com.br/' onChange={(e) => { setNewPartnerUrl(e.target.value) }} />
                                        <Button color='lightSide' bgColor="darkSide" onClick={handleSavePartnerClick} maxW={40}>
                                            Salvar
                                        </Button>
                                    </Flex>
                                </Td>
                            </Tr>
                            : ''
                        }

                    </Tbody>
                </Table>
            </TableContainer>


        </Flex>
    );
}

export default Partners








{/* <Flex border={'1px solid'} borderColor={'grayDivisor'} borderRadius={4}>

                <Flex justifyContent={'space-between'} w='100%'>

                    <Flex w='100%' flexDir={'column'}>

                        <Flex fontSize={14} fontWeight={'normal'} borderBottom={'1px solid'} borderColor={'grayDivisor'} p={2}>
                            Atuação
                        </Flex>

                        {partnerList?.map((project, index) => {
                            return (
                                <Flex key={'name' + index} fontSize={14} fontWeight={'medium'} borderBottom={'1px solid'} borderColor={'grayDivisor'} p={2}> {project.activity} </Flex>
                            )
                        })}

                        {addMode ?
                            <Flex fontSize={14} fontWeight={'medium'} borderBottom={'1px solid'} borderColor={'grayDivisor'} p={2}> {'project.activity'} </Flex>
                            : ''
                        }
                    </Flex>
                    <Flex w='100%' flexDir={'column'}>

                        <Flex fontSize={14} fontWeight={'normal'} borderBottom={'1px solid'} borderColor={'grayDivisor'} p={2}>
                            Empresa
                        </Flex>

                        {partnerList?.map((project, index) => {
                            return (
                                <Flex key={'email' + index} fontSize={14} fontWeight={'medium'} borderBottom={'1px solid'} borderColor={'grayDivisor'} p={2}> {project.name} </Flex>
                            )
                        })}

                        {addMode ?
                            <Flex fontSize={14} fontWeight={'medium'} borderBottom={'1px solid'} borderColor={'grayDivisor'} p={2}> {'project.name'} </Flex>
                            : ''
                        }
                    </Flex>
                    <Flex w='100%' flexDir={'column'} justifyContent={'space-between'}>

                        <Flex fontSize={14} fontWeight={'normal'} borderBottom={'1px solid'} borderColor={'grayDivisor'} p={2} justifyContent={'space-between'}>
                            <Flex fontSize={14} fontWeight={'normal'}>
                                Link
                            </Flex>
                        </Flex>

                        {partnerList.map((partner, index) => {

                            return (
                                <Flex key={'role' + index} fontSize={14} fontWeight={'medium'} borderBottom={'1px solid'} borderColor={'grayDivisor'} p={2} justifyContent={'space-between'} flexDir={'column'}>
                                    <Flex h={7} borderBottom={'1px'} borderColor={'grayDivisor'} w='100%' >
                                        <Link href={`${partner.url}`} target='_blank' _hover={{ color: 'blue.400' }}>
                                            {partner.url.length > 32 ? partner.url.slice(0, 32) + '...' : partner.url}
                                        </Link>
                                    </Flex>
                                    <Flex>
                                        {editMode ?

                                            <Flex
                                                onClick={() => {
                                                    deletePartnerTrigger(partner.id)
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

                                    {addMode ?
                                        <Flex flexDir={'column'}>
                                            <Flex>
                                                <Link href={`${partner.url}`} target='_blank' _hover={{ color: 'blue.400' }}>
                                                    {partner.url.length > 32 ? partner.url.slice(0, 32) + '...' : partner.url}
                                                </Link>
                                            </Flex>
                                            <Flex>
                                                {editMode ?

                                                    <Flex
                                                        onClick={() => {
                                                            deletePartnerTrigger(partner.id)
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
                                        </Flex>
                                        : ''
                                    }
                                </Flex>
                            )
                        })}
                    </Flex>

                </Flex>
            </Flex> */}