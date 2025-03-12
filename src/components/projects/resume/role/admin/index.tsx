import {
    Flex,
    useBreakpointValue,
    Menu,
    MenuButton,
    MenuList,
    IconButton,
    MenuItem,
    useColorModeValue,
} from '@chakra-ui/react';
import { FichaTecnica } from '../../fichaTecnica';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Partners from '../../partners';
import { UserProfile } from '@auth0/nextjs-auth0/client';
import DocumentsList from '../../documentsList';
import { InfosGerais } from '../../infosGerais';
import { ProjectGallery } from '../../gallery';
import { BuildingStatus } from '../../buildingStatus';
import InvestorList from '../../investorList';
import ProprietarioList from '../../proprietarioList';
import { Unidades } from '../../unidades';

interface ProjectDataProps {
    userData: User
    projectData: Investment
    user: UserProfile | undefined
    setProjectData:Dispatch<SetStateAction<Investment | null>>
}

function ProjectResumeAdmin({ userData, user, projectData, setProjectData }: ProjectDataProps) {

    const menuColor = useColorModeValue('darkSide', 'dark.lightSide')

    const bgMenuColor = useColorModeValue('beigeSide', 'dark.beigeSide')
    const bgMenuColorActive = useColorModeValue('grayMenuSide','graySide')
    const textMenuColor = useColorModeValue('darkSide', 'dark.darkSide')
    const textMenuColorActive = useColorModeValue('darkSide', 'dark.darkSide')

    const [page, SetPage] = useState(0)
    const menuList = ['Informações gerais', 'Ficha Técnica', 'Parceiros', 'Documentos', 'Mídias', 'Status', 'Investidores']

    const isMobile = useBreakpointValue({ base: true, sm: true, md: true, lg: true, xl: false })

    const [partnerList, setPartnerList] = useState<Investment["partners"] | undefined>(projectData.partners)
    const [documentList, setDocumentList] = useState<Investment["documents"] | undefined>(projectData.documents)
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
                            {menuLabel}
                        </MenuButton>
                        <MenuList
                            w='100vw'
                            bgColor={bgMenuColor}
                            color={textMenuColor}
                            borderRadius={0}
                            justifyContent={'center'}
                            alignItems={'center'}
                        >
                            <Flex onClick={() => { SetPage(0); setMenuLabel(menuList[0]) }} w='100%' fontWeight={'medium'} bgColor={page == 0 ? 'white' : 'inherit'}> <MenuItem> Informações gerais </MenuItem></Flex>
                            <Flex onClick={() => { SetPage(1); setMenuLabel(menuList[1]) }} w='100%' fontWeight={'medium'} bgColor={page == 1 ? 'white' : 'inherit'}> <MenuItem> Ficha Técnica </MenuItem></Flex>
                            <Flex onClick={() => { SetPage(2); setMenuLabel(menuList[2]) }} w='100%' fontWeight={'medium'} bgColor={page == 2 ? 'white' : 'inherit'}> <MenuItem> Parceiros </MenuItem></Flex>
                            <Flex onClick={() => { SetPage(3); setMenuLabel(menuList[3]) }} w='100%' fontWeight={'medium'} bgColor={page == 3 ? 'white' : 'inherit'}> <MenuItem> Documentos </MenuItem></Flex>
                            <Flex onClick={() => { SetPage(4); setMenuLabel(menuList[4]) }} w='100%' fontWeight={'medium'} bgColor={page == 4 ? 'white' : 'inherit'}> <MenuItem> Mídias </MenuItem></Flex>
                            <Flex onClick={() => { SetPage(5); setMenuLabel(menuList[5]) }} w='100%' fontWeight={'medium'} bgColor={page == 5 ? 'white' : 'inherit'}> <MenuItem> Status </MenuItem></Flex>
                            <Flex onClick={() => { SetPage(6); setMenuLabel(menuList[6]) }} w='100%' fontWeight={'medium'} bgColor={page == 6 ? 'white' : 'inherit'} > <MenuItem> Investidores </MenuItem></Flex>
                            <Flex onClick={() => { SetPage(7); setMenuLabel(menuList[7]) }} w='100%' fontWeight={'medium'} bgColor={page == 7 ? 'white' : 'inherit'} > <MenuItem> Proprietários </MenuItem></Flex>
                            <Flex onClick={() => { SetPage(8); setMenuLabel(menuList[8]) }} w='100%' fontWeight={'medium'} bgColor={page == 8 ? 'white' : 'inherit'} > <MenuItem> Unidades </MenuItem></Flex>

                        </MenuList>
                    </Menu>
                </Flex>
                :

                <Flex w={'min-content'} gap={4} px={4} py={2} bgColor={bgMenuColor} color={textMenuColor} borderRadius={4}>
                    <Flex onClick={() => { SetPage(0); saveCurrentPage(0) }} minW={'max-content'} borderRadius={4} py={2} px={1} as='button' fontWeight={'medium'} bgColor={page == 0 ? bgMenuColorActive : 'inherit'} >Informações gerais</Flex>
                    <Flex onClick={() => { SetPage(1); saveCurrentPage(1) }} minW={'max-content'} borderRadius={4} py={2} px={1} as='button' fontWeight={'medium'} bgColor={page == 1 ? bgMenuColorActive : 'inherit'} >Ficha Técnica</Flex>
                    <Flex onClick={() => { SetPage(2); saveCurrentPage(2) }} minW={'max-content'} borderRadius={4} py={2} px={1} as='button' fontWeight={'medium'} bgColor={page == 2 ? bgMenuColorActive : 'inherit'} >Parceiros</Flex>
                    <Flex onClick={() => { SetPage(3); saveCurrentPage(3) }} minW={'max-content'} borderRadius={4} py={2} px={1} as='button' fontWeight={'medium'} bgColor={page == 3 ? bgMenuColorActive : 'inherit'} >Documentos</Flex>
                    <Flex onClick={() => { SetPage(4); saveCurrentPage(4) }} minW={'max-content'} borderRadius={4} py={2} px={1} as='button' fontWeight={'medium'} bgColor={page == 4 ? bgMenuColorActive : 'inherit'} >Mídias</Flex>
                    <Flex onClick={() => { SetPage(5); saveCurrentPage(5) }} minW={'max-content'} borderRadius={4} py={2} px={1} as='button' fontWeight={'medium'} bgColor={page == 5 ? bgMenuColorActive : 'inherit'} >Status</Flex>
                    <Flex onClick={() => { SetPage(6); saveCurrentPage(6) }} minW={'max-content'} borderRadius={4} py={2} px={1} as='button' fontWeight={'medium'} bgColor={page == 6 ? bgMenuColorActive : 'inherit'} >Investidores</Flex>
                    <Flex onClick={() => { SetPage(7); saveCurrentPage(7) }} minW={'max-content'} borderRadius={4} py={2} px={1} as='button' fontWeight={'medium'} bgColor={page == 7 ? bgMenuColorActive : 'inherit'} >Proprietários</Flex>
                    <Flex onClick={() => { SetPage(8); saveCurrentPage(8) }} minW={'max-content'} borderRadius={4} py={2} px={1} as='button' fontWeight={'medium'} bgColor={page == 8 ? bgMenuColorActive : 'inherit'} >Unidades</Flex>
                </Flex>
            }

            {page == 0 ? (<InfosGerais userData={userData} projectData={projectData} />) : ('')}
            {page == 1 ? (<FichaTecnica userData={userData} projectData={projectData} setProjectData={setProjectData} />) : ('')}
            {page == 2 ? (<Partners userData={userData} partnerList={partnerList} setPartnerList={setPartnerList} user={user} projectData={projectData} />) : ('')}
            {page == 3 ? (<DocumentsList userData={userData} documentList={documentList} setDocumentList={setDocumentList} user={user} projectData={projectData} />) : ('')}
            {page == 4 ? (<ProjectGallery userData={userData} projectData={projectData} setProjectData={setProjectData}/>) : ('')}
            {page == 5 ? (<BuildingStatus userData={userData} projectData={projectData} />) : ('')}
            {page == 6 ? (<InvestorList userData={userData} documentList={documentList} setDocumentList={setDocumentList} user={user} projectData={projectData} />) : ('')}
            {page == 7 ? (<ProprietarioList userData={userData} documentList={documentList} setDocumentList={setDocumentList} user={user} projectData={projectData} />) : ('')}
            {page == 8 ? (<Unidades userData={userData} projectData={projectData} />) : ('')}


        </Flex>
    );
}

export default ProjectResumeAdmin
