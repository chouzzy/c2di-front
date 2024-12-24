import { StaticProject } from '@/components/users/StaticProject';
import {
    Flex,
    Button,
    Menu,
    MenuButton,
    IconButton,
    MenuList,
    MenuItem,
    useBreakpointValue,
    Text,
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
import ProprietarioList from '../../proprietarioList';
import { ArrowFatLineDown, CaretDown } from 'phosphor-react';
import { Unidades } from '../../unidades';

interface ProjectDataProps {
    userData: User
    projectData: Investment
    user: UserProfile | undefined
}

function ProjectResumeProjectManager({ userData, user, projectData }: ProjectDataProps) {

    const [page, SetPage] = useState(0)
    const [partnerList, setPartnerList] = useState<Investment["partners"] | undefined>(projectData.partners)
    const [documentList, setDocumentList] = useState<Investment["documents"] | undefined>(projectData.documents)
    const menuList = ['Informações gerais', 'Ficha Técnica', 'Parceiros', 'Documentos', 'Mídias', 'Status']
    const isMobile = useBreakpointValue({ base: true, sm: true, md: false, lg: false, xl: false })
    const [menuLabel, setMenuLabel] = useState(menuList[page])

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

    if (!user) {
        return <SpinnerFullScreen />
    }
    if (!projectData) {
        return <SpinnerFullScreen />
    }

    return (

        <Flex w='100%' flexDirection="column" gap={2}>

            {isMobile ?
                <Flex>
                    <Menu>
                        <MenuButton
                            as={IconButton}
                            aria-label='Options'
                            borderRadius={2}
                            // icon={<List />}
                            variant='outline'
                            w='100%'
                        >   
                        <Flex gap={2} justifyContent={'center'} alignItems={'center'}>

                            <Text>
                                {menuLabel}
                            </Text>
                            <CaretDown size={18} />
                        </Flex>
                        </MenuButton>
                        <MenuList
                            w='100vw'
                            bgColor="beigeSide"
                            color="darkSide"
                            borderRadius={0}
                            justifyContent={'center'}
                            alignItems={'center'}
                        >
                            <Flex onClick={() => { SetPage(0); saveCurrentPage(0); setMenuLabel(menuList[0]) }} w='100%' fontWeight={'medium'} bgColor={page == 0 ? 'white' : 'inherit'}> <MenuItem> Informações gerais </MenuItem></Flex>
                            <Flex onClick={() => { SetPage(1); saveCurrentPage(1); setMenuLabel(menuList[1]) }} w='100%' fontWeight={'medium'} bgColor={page == 1 ? 'white' : 'inherit'}> <MenuItem> Ficha Técnica </MenuItem></Flex>
                            <Flex onClick={() => { SetPage(2); saveCurrentPage(2); setMenuLabel(menuList[2]) }} w='100%' fontWeight={'medium'} bgColor={page == 2 ? 'white' : 'inherit'}> <MenuItem> Parceiros </MenuItem></Flex>
                            <Flex onClick={() => { SetPage(3); saveCurrentPage(3); setMenuLabel(menuList[3]) }} w='100%' fontWeight={'medium'} bgColor={page == 3 ? 'white' : 'inherit'}> <MenuItem> Documentos </MenuItem></Flex>
                            <Flex onClick={() => { SetPage(4); saveCurrentPage(4); setMenuLabel(menuList[4]) }} w='100%' fontWeight={'medium'} bgColor={page == 4 ? 'white' : 'inherit'}> <MenuItem> Mídias </MenuItem></Flex>
                            <Flex onClick={() => { SetPage(5); saveCurrentPage(5); setMenuLabel(menuList[5]) }} w='100%' fontWeight={'medium'} bgColor={page == 5 ? 'white' : 'inherit'}> <MenuItem> Status </MenuItem></Flex>
                            <Flex onClick={() => { SetPage(6); saveCurrentPage(6); setMenuLabel(menuList[6]) }} w='100%' fontWeight={'medium'} bgColor={page == 6 ? 'white' : 'inherit'}> <MenuItem> Proprietários </MenuItem></Flex>
                            <Flex onClick={() => { SetPage(7); saveCurrentPage(7); setMenuLabel(menuList[7]) }} w='100%' fontWeight={'medium'} bgColor={page == 7 ? 'white' : 'inherit'}> <MenuItem> Unidades </MenuItem></Flex>

                        </MenuList>
                    </Menu>
                </Flex>
                :
                <Flex w={'100%'} gap={4} px={[4, 4, 4, 4, 4]} py={2} bgColor={'grayMenuSide'} borderRadius={4} >
                    <Flex onClick={() => { SetPage(0); saveCurrentPage(0) }} minW={'max-content'} borderRadius={4} py={2} px={1} as='button' fontWeight={'medium'} bgColor={page == 0 ? 'white' : 'inherit'} >Informações gerais</Flex>
                    <Flex onClick={() => { SetPage(1); saveCurrentPage(1) }} minW={'max-content'} borderRadius={4} py={2} px={1} as='button' fontWeight={'medium'} bgColor={page == 1 ? 'white' : 'inherit'} >Ficha Técnica</Flex>
                    <Flex onClick={() => { SetPage(2); saveCurrentPage(2) }} minW={'max-content'} borderRadius={4} py={2} px={1} as='button' fontWeight={'medium'} bgColor={page == 2 ? 'white' : 'inherit'} >Parceiros</Flex>
                    <Flex onClick={() => { SetPage(3); saveCurrentPage(3) }} minW={'max-content'} borderRadius={4} py={2} px={1} as='button' fontWeight={'medium'} bgColor={page == 3 ? 'white' : 'inherit'} >Documentos</Flex>
                    <Flex onClick={() => { SetPage(4); saveCurrentPage(4) }} minW={'max-content'} borderRadius={4} py={2} px={1} as='button' fontWeight={'medium'} bgColor={page == 4 ? 'white' : 'inherit'} >Mídias</Flex>
                    <Flex onClick={() => { SetPage(5); saveCurrentPage(5) }} minW={'max-content'} borderRadius={4} py={2} px={1} as='button' fontWeight={'medium'} bgColor={page == 5 ? 'white' : 'inherit'} >Status</Flex>
                    <Flex onClick={() => { SetPage(6); saveCurrentPage(6) }} minW={'max-content'} borderRadius={4} py={2} px={1} as='button' fontWeight={'medium'} bgColor={page == 6 ? 'white' : 'inherit'} >Proprietários</Flex>
                    <Flex onClick={() => { SetPage(7); saveCurrentPage(7) }} minW={'max-content'} borderRadius={4} py={2} px={1} as='button' fontWeight={'medium'} bgColor={page == 7 ? 'white' : 'inherit'} >Unidades</Flex>
                </Flex>
            }

            {page == 0 ? (<InfosGerais userData={userData} projectData={projectData} />) : ('')}
            {page == 1 ? (<FichaTecnica userData={userData} projectData={projectData} />) : ('')}
            {page == 2 ? (<Partners userData={userData} partnerList={partnerList} setPartnerList={setPartnerList} user={user} projectData={projectData} />) : ('')}
            {page == 3 ? (<DocumentsList userData={userData} documentList={documentList} setDocumentList={setDocumentList} user={user} projectData={projectData} />) : ('')}
            {page == 4 ? (<ProjectGallery userData={userData} projectData={projectData} />) : ('')}
            {page == 5 ? (<BuildingStatus userData={userData} projectData={projectData} />) : ('')}
            {page == 6 ? (<ProprietarioList userData={userData} documentList={documentList} setDocumentList={setDocumentList} user={user} projectData={projectData} />) : ('')}
            {page == 7 ? (<Unidades userData={userData} projectData={projectData} />) : ('')}



        </Flex>
    );
}

export default ProjectResumeProjectManager
