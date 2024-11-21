import { StaticProject } from '@/components/users/StaticProject';
import {
    Flex,
    Button,
} from '@chakra-ui/react';
import { FichaTecnica } from '../../fichaTecnica';
import { useState } from 'react';
import Partners from '../../partners';
import { UserProfile } from '@auth0/nextjs-auth0/client';
import { SpinnerFullScreen } from '@/components/Loading/SpinnerFullScreen';
import DocumentsList from '../../documentsList';
import { InfosGerais } from '../../infosGerais';
import { ProjectGallery } from '../../gallery';

interface ProjectDataProps {
    userData: User
    projectData: Investment
    user: UserProfile | undefined
}

function ProjectResumeProjectManager({ userData, user, projectData }: ProjectDataProps) {

    const [page, SetPage] = useState(0)
    const [partnerList, setPartnerList] = useState<Investment["partners"] | undefined>(projectData.partners)
    const [documentList, setDocumentList] = useState<Investment["documents"] | undefined>(projectData.documents)

    if (!user) {
        return <SpinnerFullScreen />
    }
    if (!projectData) {
        return <SpinnerFullScreen />
    }

    return (

        <Flex w='100%' flexDirection="column" gap={2}>

            <Flex w={'min-content'} gap={4} px={4} py={2} bgColor={'grayMenuSide'} borderRadius={4} >
                <Flex onClick={() => { SetPage(0) }} minW={'max-content'} borderRadius={4} py={2} px={1} as='button' fontWeight={'medium'} bgColor={page == 0 ? 'white' : 'inherit'} >Informações gerais</Flex>
                <Flex onClick={() => { SetPage(1) }} minW={'max-content'} borderRadius={4} py={2} px={1} as='button' fontWeight={'medium'} bgColor={page == 1 ? 'white' : 'inherit'} >Ficha Técnica</Flex>
                <Flex onClick={() => { SetPage(2) }} minW={'max-content'} borderRadius={4} py={2} px={1} as='button' fontWeight={'medium'} bgColor={page == 2 ? 'white' : 'inherit'} >Parceiros</Flex>
                <Flex onClick={() => { SetPage(3) }} minW={'max-content'} borderRadius={4} py={2} px={1} as='button' fontWeight={'medium'} bgColor={page == 3 ? 'white' : 'inherit'} >Documentos</Flex>
                <Flex onClick={() => { SetPage(4) }} minW={'max-content'} borderRadius={4} py={2} px={1} as='button' fontWeight={'medium'} bgColor={page == 4 ? 'white' : 'inherit'} >Mídias</Flex>
            </Flex>

            {page == 0 ? (<InfosGerais userData={userData} projectData={projectData} />) : ('')}
            {page == 1 ? (<FichaTecnica userData={userData} projectData={projectData} />) : ('')}
            {page == 2 ? (<Partners  userData={userData} partnerList={partnerList} setPartnerList={setPartnerList} user={user} projectData={projectData} />) : ('')}
            {page == 3 ? (<DocumentsList userData={userData} documentList={documentList} setDocumentList={setDocumentList} user={user} projectData={projectData}  />) : ('')}
            {page == 4 ? (<ProjectGallery userData={userData} projectData={projectData} />) : ('')}


        </Flex>
    );
}

export default ProjectResumeProjectManager
