import { Flex, Link } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { getUsersResumed } from '@/app/api/getUsersResumed/route';
import { UserProfile } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/navigation';
import { SpinnerFullScreen } from '@/components/Loading/SpinnerFullScreen';
import { Trash } from 'phosphor-react';

interface DocumentsListProps {
    user: UserProfile | undefined
    projectData: Investment
}

function DocumentsList({ user, projectData }: DocumentsListProps) {

    const [documentList, setDocumentList] = useState<Investment["documents"] | undefined>(projectData.documents)
    const [pageLoaded, setPageLoaded] = useState(true)
    const router = useRouter()

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
        <Flex w='100%' flexDirection="column" gap={2} py={8}>
            <Flex border={'1px solid'} borderColor={'grayDivisor'} borderRadius={4}>
                <Flex justifyContent={'space-between'} w='100%'>

                    <Flex w='100%' flexDir={'column'}>

                        <Flex fontSize={14} fontWeight={'normal'} borderBottom={'1px solid'} borderColor={'grayDivisor'} p={2}>
                            Atuação
                        </Flex>

                        {documentList.map((doc, index) => {
                            return (
                                <Flex key={'name' + index} fontSize={14} fontWeight={'medium'} borderBottom={'1px solid'} borderColor={'grayDivisor'} p={2}> {doc.title} </Flex>
                            )
                        })}
                    </Flex>
                    <Flex w='100%' flexDir={'column'}>

                        <Flex fontSize={14} fontWeight={'normal'} borderBottom={'1px solid'} borderColor={'grayDivisor'} p={2}>
                            Empresa
                        </Flex>

                        {documentList.map((doc, index) => {
                            return (
                                <Flex key={'email' + index} fontSize={14} fontWeight={'medium'} borderBottom={'1px solid'} borderColor={'grayDivisor'} p={2}> {doc.description} </Flex>
                            )
                        })}
                    </Flex>
                    <Flex w='100%' flexDir={'column'} justifyContent={'space-between'}>

                        <Flex fontSize={14} fontWeight={'normal'} borderBottom={'1px solid'} borderColor={'grayDivisor'} p={2} justifyContent={'space-between'}>
                            <Flex fontSize={14} fontWeight={'normal'}>
                                Link
                            </Flex>
                        </Flex>

                        {documentList.map((doc, index) => {

                            return (
                                <Flex key={'role' + index} fontSize={14} fontWeight={'medium'} borderBottom={'1px solid'} borderColor={'grayDivisor'} p={2} justifyContent={'space-between'}>
                                    <Flex>
                                        {doc.url}
                                    </Flex>
                                    <Flex>
                                        <Flex
                                            onClick={() => {
                                                alert('excluir parceiro')
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
                                    </Flex>
                                </Flex>
                            )
                        })}
                    </Flex>

                </Flex>
            </Flex>
        </Flex>
    );
}

export default DocumentsList
