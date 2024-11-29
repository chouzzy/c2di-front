import { StaticProject } from '@/components/users/StaticProject';
import {
    Flex,
    Button,
} from '@chakra-ui/react';
import { FichaTecnica } from '../../fichaTecnica';
import { useEffect, useState } from 'react';
import Partners from '../../partners';
import { UserProfile } from '@auth0/nextjs-auth0/client';
import { SpinnerFullScreen } from '@/components/Loading/SpinnerFullScreen';
import DocumentsList from '../../documentsList';
import { InfosGerais } from '../../infosGerais';
import { ProjectGallery } from '../../gallery';
import { BuildingStatus } from '../../buildingStatus';
import InvestorList from '../../investorList';

interface ProjectDataProps {
    userData: User
    projectData: Investment
    user: UserProfile | undefined
}

function ProjectResumeAdmin({ userData, user, projectData }: ProjectDataProps) {

    const [page, SetPage] = useState(0)


    const [partnerList, setPartnerList] = useState<Investment["partners"] | undefined>(projectData.partners)
    const [documentList, setDocumentList] = useState<Investment["documents"] | undefined>(projectData.documents)

    // Armazena a página atual no localStorage
    const saveCurrentPage = (currentPage: number) => {
        localStorage.setItem('currentPage', currentPage.toString());
    };

    useEffect(() => {
        // Recupera a página atual do localStorage ao carregar a página
        const savedPage = localStorage.getItem('currentPage');
        if (savedPage) {
            SetPage(parseInt(savedPage, 10));
        }

    }, []);

    return (

        <Flex w='100%' flexDirection="column" gap={2}>

            <Flex w={'min-content'} gap={4} px={4} py={2} bgColor={'grayMenuSide'} borderRadius={4} >
                <Flex onClick={() => { SetPage(0); saveCurrentPage(0) }} minW={'max-content'} borderRadius={4} py={2} px={1} as='button' fontWeight={'medium'} bgColor={page == 0 ? 'white' : 'inherit'} >Informações gerais</Flex>
                <Flex onClick={() => { SetPage(1); saveCurrentPage(1) }} minW={'max-content'} borderRadius={4} py={2} px={1} as='button' fontWeight={'medium'} bgColor={page == 1 ? 'white' : 'inherit'} >Ficha Técnica</Flex>
                <Flex onClick={() => { SetPage(2); saveCurrentPage(2) }} minW={'max-content'} borderRadius={4} py={2} px={1} as='button' fontWeight={'medium'} bgColor={page == 2 ? 'white' : 'inherit'} >Parceiros</Flex>
                <Flex onClick={() => { SetPage(3); saveCurrentPage(3) }} minW={'max-content'} borderRadius={4} py={2} px={1} as='button' fontWeight={'medium'} bgColor={page == 3 ? 'white' : 'inherit'} >Documentos</Flex>
                <Flex onClick={() => { SetPage(4); saveCurrentPage(4) }} minW={'max-content'} borderRadius={4} py={2} px={1} as='button' fontWeight={'medium'} bgColor={page == 4 ? 'white' : 'inherit'} >Mídias</Flex>
                <Flex onClick={() => { SetPage(5); saveCurrentPage(5) }} minW={'max-content'} borderRadius={4} py={2} px={1} as='button' fontWeight={'medium'} bgColor={page == 5 ? 'white' : 'inherit'} >Status</Flex>
                <Flex onClick={() => { SetPage(6); saveCurrentPage(6) }} minW={'max-content'} borderRadius={4} py={2} px={1} as='button' fontWeight={'medium'} bgColor={page == 6 ? 'white' : 'inherit'} >Investidores</Flex>
            </Flex>

            {page == 0 ? (<InfosGerais userData={userData} projectData={projectData} />) : ('')}
            {page == 1 ? (<FichaTecnica userData={userData} projectData={projectData} />) : ('')}
            {page == 2 ? (<Partners userData={userData} partnerList={partnerList} setPartnerList={setPartnerList} user={user} projectData={projectData} />) : ('')}
            {page == 3 ? (<DocumentsList userData={userData} documentList={documentList} setDocumentList={setDocumentList} user={user} projectData={projectData} />) : ('')}
            {page == 4 ? (<ProjectGallery userData={userData} projectData={projectData} />) : ('')}
            {page == 5 ? (<BuildingStatus userData={userData} projectData={projectData} />) : ('')}
            {page == 6 ? (<InvestorList userData={userData} documentList={documentList} setDocumentList={setDocumentList} user={user} projectData={projectData} />) : ('')}


        </Flex>
    );
}

export default ProjectResumeAdmin
