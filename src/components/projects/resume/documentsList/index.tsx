import { Button, Flex, Input, Link, Spinner, Table, TableCaption, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr } from '@chakra-ui/react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { UserProfile } from '@auth0/nextjs-auth0/client';
import { SpinnerFullScreen } from '@/components/Loading/SpinnerFullScreen';
import { Trash } from 'phosphor-react';
import { deletePrismaProjectDocument } from '@/app/services/deleteInvestmentDocument';
import { ProjectFileInput } from '@/components/CreateProjects/Inputs/FileInput';
import { useForm } from 'react-hook-form';
import { documentsArrayAdapter } from '@/app/services/utils';
import { changePrismaProjectDoc } from '@/app/services/changeDoc';
import { createPrismaNotification } from '@/app/services/createNotification';
import axios from 'axios';
import { ErrorInputComponent } from '@/components/ErrorInputComponent';

interface FormUsersProps {
    user: UserProfile | undefined
    projectData: Investment
    documentList: ProjectDocuments[] | undefined
    setDocumentList: Dispatch<SetStateAction<ProjectDocuments[] | undefined>>
    userData: User


}

function DocumentsList({ user, userData, projectData, documentList, setDocumentList }: FormUsersProps) {

    const { register, handleSubmit, formState: { errors } } = useForm({});

    const [pageLoaded, setPageLoaded] = useState(true)
    const [deletingDocument, setDeletingDocument] = useState(false)
    const [partnerID, setDocumentID] = useState('')
    const [editMode, setEditMode] = useState(false); // Estado para controlar o modo de edição
    const [addMode, setAddMode] = useState(false); // Estado para controlar o modo de edição

    const [saveDocumentConfirmed, setSaveDocumentConfirmed] = useState(false)

    const [selectedFiles, setSelectedFiles] = useState<FileList | undefined>();
    const [isUploading, setIsUploading] = useState(false)
    const [totalUploading, setTotalUploading] = useState(0)
    const [progressUploading, setProgressUploading] = useState(0)

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

                const docToDelete = projectData.documents.find((doc) => doc.id === documentID);

                if (!docToDelete) {
                    console.warn(`Documento com ID ${documentID} não encontrada no array destaques`);
                    return;
                }

                console.log('docToDelete')
                console.log(docToDelete)

                const responseImgDeleted = await axios.post('/api/delete-image', {
                    imageUrl: docToDelete.url
                });


                const response = await deletePrismaProjectDocument(projectData.id, documentID)
                projectData.documents = response.documents
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
            const formData = new FormData();
            setIsUploading(true)

            // Verifica se há arquivos selecionados
            if (!selectedFiles) {
                console.warn(`Nenhum arquivo selecionado`);
                return; // Se não houver arquivos, interrompe a função
            }

            setTotalUploading(selectedFiles.length);

            // Adiciona os arquivos ao FormData
            for (let i = 0; i < selectedFiles.length; i++) {
                formData.append('file', selectedFiles[i]);
                setProgressUploading((prevProgress) => prevProgress + 1); // Corrigido
            }

            // Adiciona o ID do projeto ao FormData
            formData.append('projectId', projectData.title);

            // Faz a requisição POST usando Axios para enviar os arquivos
            const responseFiles = await axios.post('/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Extrai as URLs dos documentos da resposta
            const docUrls = responseFiles.data.imageUrls;
            const docs: Investment["documents"] = [];

            // Processa as URLs dos documentos
            for (let index = 0; index < docUrls.length; index++) {
                const parts = docUrls[index].split('-'); // Divide a URL em partes usando o hífen
                let lastPart = parts.pop(); // Obtém a última parte da URL (nome do arquivo)
                lastPart = decodeURIComponent(lastPart); // Decodifica os caracteres especiais da URL

                // Adiciona o documento ao array docs
                docs.push({
                    id: 'newDoc',
                    title: lastPart,
                    url: decodeURIComponent(docUrls[index]),
                    description: lastPart,
                });
            }

            // Remove o campo 'document' do objeto data (se existir)
            delete data.document;

            // Atualiza o campo 'documents' do objeto data com o array de documentos
            data.documents = docs;

            // Adiciona os novos documentos ao array de documentos do projeto
            projectData.documents = projectData.documents.concat(data.documents);

            // Atualiza os documentos do projeto no banco de dados
            const response: Investment = await changePrismaProjectDoc(projectData.id, projectData);
            projectData.documents = response.documents

            // Cria uma nova notificação para o projeto
            const newNotification = {
                title: 'Houve uma nova atualização em seu projeto',
                message: "Um documento foi atualizado! Verifique na aba de documentos",
                investmentId: projectData.id,
            };

            // Cria a notificação no banco de dados
            const newNote = await createPrismaNotification(newNotification);

            // Atualiza o estado com a nova lista de documentos
            setDocumentList(response.documents);
            setAddMode(false);
            setIsUploading(false)
        } catch (error: any) {
            console.error(error);
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

            {isUploading ?
                <Flex w='100%' h='100%' alignItems={'center'} justifyContent={'center'} flexDir={'column'}>
                    <Flex alignItems={'center'} p={8} justifyContent={'center'} gap={4}>
                        <Text> Fazendo o upload de {totalUploading} documentos</Text>
                        <Spinner boxSize={6} />
                    </Flex>
                </Flex>
                :
                <>
                    <Flex w={['90vw', '90vw', '90vw', '100%', '100%']}>
                        <TableContainer w={'100%'}>
                            <Table variant={'simple'}>
                                <Thead>
                                    <Tr>
                                        <Th>Título</Th>
                                        {/* <Th>Descrição</Th> */}
                                        <Th>URL</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>

                                    {documentList?.map((partner, index) => {
                                        return (
                                            <Tr key={'name' + index}>
                                                <Td>{partner.title.length > 32 ? partner.title.slice(0, 32) + '...' : partner.title}</Td>
                                                {/* <Td>{partner.description}</Td> */}
                                                <Td>
                                                    <Flex gap={2} justifyContent={'space-between'}>
                                                        <Link href={`${partner.url}`} target='_blank' _hover={{ color: 'blue.400' }}>
                                                            {partner.url.length > 64 ? partner.url.slice(0, 64) + '...' : partner.url}
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
                    </Flex>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {addMode ?
                            <Flex w='100%' flexDir={'column'}>
                                <ProjectFileInput
                                    key={"documents"}
                                    isRequired={true}
                                    allowedTypes={['application/pdf']}
                                    accept="application/pdf"
                                    label_top='Documentos (PDF)'
                                    setSelectedFiles={setSelectedFiles}
                                    register={register("document")}
                                />
                                <Button ml={4} _hover={{ bgColor: 'redSide' }} size={'md'} borderRadius={8} type='submit' color={'lightSide'} fontWeight={'light'} bgColor={'graySide'} maxW={32} mt={4}>
                                    Salvar dados
                                </Button>
                            </Flex>
                            : ''
                        }
                    </form>
                </>
            }


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
