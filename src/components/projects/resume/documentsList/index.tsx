import { Button, Flex, Input, Link, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { UserProfile } from '@auth0/nextjs-auth0/client';
import { SpinnerFullScreen } from '@/components/Loading/SpinnerFullScreen';
import { Trash } from 'phosphor-react';
import { deletePrismaProjectDocument } from '@/app/api/deleteInvestmentDocument/route';
import { ProjectFileInput } from '@/components/CreateProjects/Inputs/FileInput';
import { useForm } from 'react-hook-form';
import { documentsArrayAdapter } from '@/app/services/utils';
import { changePrismaProjectDoc } from '@/app/api/changeDoc/route';

interface FormUsersProps {
    user: UserProfile | undefined
    projectData: Investment
    documentList: ProjectDocuments[] | undefined
    setDocumentList: Dispatch<SetStateAction<ProjectDocuments[] | undefined>>



}

function DocumentsList({ user, projectData, documentList, setDocumentList }: FormUsersProps) {

    const { register, handleSubmit, formState: { errors } } = useForm({});

    const [pageLoaded, setPageLoaded] = useState(true)
    const [deletingDocument, setDeletingDocument] = useState(false)
    const [partnerID, setDocumentID] = useState('')
    const [editMode, setEditMode] = useState(false); // Estado para controlar o modo de edição
    const [addMode, setAddMode] = useState(false); // Estado para controlar o modo de edição

    const [saveDocumentConfirmed, setSaveDocumentConfirmed] = useState(false)

    const deleteDocumentTrigger = (id: string) => {

        setDeletingDocument(true)
        setDocumentID(id)
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

    const handleSaveDocumentClick = () => {
        setSaveDocumentConfirmed(true)
    }


    // DELETE DOCUMENT
    useEffect(() => {

        const deleteDocument = async (documentID: Investment["documents"][0]["id"]) => {

            try {
                const response = await deletePrismaProjectDocument(projectData.id, documentID)
                setDocumentList(response.documents)
            } catch (error) {
                console.error(error)
            }

        }

        if (deletingDocument && partnerID) {
            deleteDocument(partnerID)
            setDocumentID('')
            setDeletingDocument(false)
        }

    }, [deletingDocument])

    // PUSH DOCUMENT
    const onSubmit = async (data: any) => {

        try {
            
            data = await documentsArrayAdapter(data)
            projectData.documents = projectData.documents.concat(data.documents)
            const response:Investment = await changePrismaProjectDoc(projectData.id, projectData)
            setDocumentList(response.documents)
            setAddMode(false)

            console.log(response)

        } catch (error: any) {
            console.error(error)
        }
    };



    if (!documentList) {
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



            <TableContainer>
                <Table variant={'simple'}>
                    <Thead>
                        <Tr>
                            <Th>Título</Th>
                            <Th>Descrição</Th>
                            <Th>URL</Th>
                        </Tr>
                    </Thead>
                    <Tbody>

                        {documentList?.map((partner, index) => {
                            return (
                                <Tr key={'name' + index}>
                                    <Td>{partner.title}</Td>
                                    <Td>{partner.description}</Td>
                                    <Td>
                                        <Flex gap={2} justifyContent={'space-between'}>
                                            <Link href={`${partner.url}`} target='_blank' _hover={{ color: 'blue.400' }}>
                                                {partner.url.length > 72 ? partner.url.slice(0, 72) + '...' : partner.url}
                                            </Link>
                                            {editMode ?

                                                <Flex
                                                    onClick={() => {
                                                        deleteDocumentTrigger(partner.id)
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
            <form onSubmit={handleSubmit(onSubmit)}>
                {addMode ?
                    <Flex w='100%' flexDir={'column'}>
                        <ProjectFileInput
                            key={"documents"}
                            isRequired={true}
                            allowedTypes={['application/pdf']}
                            accept="application/pdf"
                            label_top='Documentos (PDF)'
                            register={register("document")}
                        />
                        <Button mx={4} _hover={{bgColor:'redSide'}} size={'md'} borderRadius={2} type='submit' color={'lightSide'} fontWeight={'light'} bgColor={'darkSide'} mt={4}>
                            Salvar dados
                        </Button>
                    </Flex>
                    : ''
                }
            </form>


        </Flex>
    );
}

export default DocumentsList



































































// import { Flex, Link } from '@chakra-ui/react';
// import { useEffect, useState } from 'react';
// import { getUsersResumed } from '@/app/api/getUsersResumed/route';
// import { UserProfile } from '@auth0/nextjs-auth0/client';
// import { useRouter } from 'next/navigation';
// import { SpinnerFullScreen } from '@/components/Loading/SpinnerFullScreen';
// import { Trash } from 'phosphor-react';

// interface DocumentsListProps {
//     user: UserProfile | undefined
//     projectData: Investment
// }

// function DocumentsList({ user, projectData }: DocumentsListProps) {

//     const [documentList, setDocumentList] = useState<Investment["documents"] | undefined>(projectData.documents)
//     const [pageLoaded, setPageLoaded] = useState(true)
//     const router = useRouter()

//     if (!documentList) {
//         return (
//             <SpinnerFullScreen />
//         )
//     }

//     if (!pageLoaded) {
//         return (
//             <SpinnerFullScreen />
//         )
//     }

//     return (
//         <Flex w='100%' flexDirection="column" gap={2} py={8}>
//             <Flex border={'1px solid'} borderColor={'grayDivisor'} borderRadius={4}>
//                 <Flex justifyContent={'space-between'} w='100%'>

//                     <Flex w='100%' flexDir={'column'}>

//                         <Flex fontSize={14} fontWeight={'normal'} borderBottom={'1px solid'} borderColor={'grayDivisor'} p={2}>
//                             Atuação
//                         </Flex>

//                         {documentList.map((doc, index) => {
//                             return (
//                                 <Flex key={'name' + index} fontSize={14} fontWeight={'medium'} borderBottom={'1px solid'} borderColor={'grayDivisor'} p={2}> {doc.title} </Flex>
//                             )
//                         })}
//                     </Flex>
//                     <Flex w='100%' flexDir={'column'}>

//                         <Flex fontSize={14} fontWeight={'normal'} borderBottom={'1px solid'} borderColor={'grayDivisor'} p={2}>
//                             Empresa
//                         </Flex>

//                         {documentList.map((doc, index) => {
//                             return (
//                                 <Flex key={'email' + index} fontSize={14} fontWeight={'medium'} borderBottom={'1px solid'} borderColor={'grayDivisor'} p={2}> {doc.description} </Flex>
//                             )
//                         })}
//                     </Flex>
//                     <Flex w='100%' flexDir={'column'} justifyContent={'space-between'}>

//                         <Flex fontSize={14} fontWeight={'normal'} borderBottom={'1px solid'} borderColor={'grayDivisor'} p={2} justifyContent={'space-between'}>
//                             <Flex fontSize={14} fontWeight={'normal'}>
//                                 Link
//                             </Flex>
//                         </Flex>

//                         {documentList.map((doc, index) => {

//                             return (
//                                 <Flex key={'role' + index} fontSize={14} fontWeight={'medium'} borderBottom={'1px solid'} borderColor={'grayDivisor'} p={2} justifyContent={'space-between'}>
//                                     <Flex>
//                                         {doc.url}
//                                     </Flex>
//                                     <Flex>
//                                         <Flex
//                                             onClick={() => {
//                                                 alert('excluir parceiro')
//                                             }}
//                                             _hover={{ color: 'redSide' }}
//                                             fontWeight={'medium'}
//                                             cursor={'pointer'}
//                                             alignItems={'center'}
//                                             fontSize={16}
//                                             pr={2}
//                                         >
//                                             <Trash />
//                                         </Flex>
//                                     </Flex>
//                                 </Flex>
//                             )
//                         })}
//                     </Flex>

//                 </Flex>
//             </Flex>
//         </Flex>
//     );
// }

// export default DocumentsList
