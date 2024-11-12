import { Flex, Link } from '@chakra-ui/react';
import { TbEdit } from "react-icons/tb";
import { useEffect, useState } from 'react';
import { getUsersResumed } from '@/app/api/getUsersResumed/route';
import { UserProfile } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/navigation';
import { SpinnerFullScreen } from '@/components/Loading/SpinnerFullScreen';
import { Trash } from 'phosphor-react';

interface FormUsersProps {
    user: UserProfile | undefined
    projectData: Investment
}

function Partners({ user, projectData }: FormUsersProps) {

    const [partnerList, setPartnerList] = useState<Investment["partners"] | undefined>(projectData.partners)
    const [pageLoaded, setPageLoaded] = useState(true)
    const router = useRouter()

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
        <Flex w='100%' flexDirection="column" gap={2} py={8}>
            <Flex border={'1px solid'} borderColor={'grayDivisor'} borderRadius={4}>
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
                    </Flex>
                    <Flex w='100%' flexDir={'column'} justifyContent={'space-between'}>

                        <Flex fontSize={14} fontWeight={'normal'} borderBottom={'1px solid'} borderColor={'grayDivisor'} p={2} justifyContent={'space-between'}>
                            <Flex fontSize={14} fontWeight={'normal'}>
                                Link
                            </Flex>
                        </Flex>

                        {partnerList.map((partner, index) => {

                            return (
                                <Flex key={'role' + index} fontSize={14} fontWeight={'medium'} borderBottom={'1px solid'} borderColor={'grayDivisor'} p={2} justifyContent={'space-between'}>
                                    <Flex>
                                        {partner.url}
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

export default Partners
