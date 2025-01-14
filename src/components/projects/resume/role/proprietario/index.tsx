import { Flex, IconButton, Menu, MenuButton, MenuItem, MenuList, useBreakpointValue } from '@chakra-ui/react';
import { FichaTecnica } from '../../fichaTecnica';
import { useState } from 'react';
import Partners from '../../partners';
import { UserProfile } from '@auth0/nextjs-auth0/client';
import { SpinnerFullScreen } from '@/components/Loading/SpinnerFullScreen';
import DocumentsList from '../../documentsList';
import { InfosGerais } from '../../infosGerais';
import { ProjectGallery } from '../../gallery';
import { BuildingStatus } from '../../buildingStatus';
import { Unidades } from '../../unidades';

interface ProjectDataProps {
    userData: User
    projectData: Investment
    user: UserProfile | undefined
}

function ProjectResumeProprietario({ userData, user, projectData }: ProjectDataProps) {

    const menuList = ['Informações gerais', 'Ficha Técnica', 'Parceiros', 'Documentos', 'Mídias', 'Status']

    const [page, SetPage] = useState(0)
    const [partnerList, setPartnerList] = useState<Investment["partners"] | undefined>(projectData.partners)
    const [documentList, setDocumentList] = useState<Investment["documents"] | undefined>(projectData.documents)
    const [menuLabel, setMenuLabel] = useState(menuList[page])

    const saveCurrentPage = (currentPage: number) => {
        localStorage.setItem('currentPage', currentPage.toString());
    };



    const isMobile = useBreakpointValue({ base: true, sm: true, md: false, lg: false, xl: false })

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
                            {menuLabel}
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
                            <Flex onClick={() => { SetPage(3); saveCurrentPage(3); setMenuLabel(menuList[3]) }} w='100%' fontWeight={'medium'} bgColor={page == 3 ? 'white' : 'inherit'}> <MenuItem> Documentos </MenuItem></Flex>
                            <Flex onClick={() => { SetPage(4); saveCurrentPage(4); setMenuLabel(menuList[4]) }} w='100%' fontWeight={'medium'} bgColor={page == 4 ? 'white' : 'inherit'}> <MenuItem> Mídias </MenuItem></Flex>
                            <Flex onClick={() => { SetPage(5); saveCurrentPage(5); setMenuLabel(menuList[5]) }} w='100%' fontWeight={'medium'} bgColor={page == 5 ? 'white' : 'inherit'}> <MenuItem> Status </MenuItem></Flex>
                            <Flex onClick={() => { SetPage(7); saveCurrentPage(7); setMenuLabel(menuList[7]) }} w='100%' fontWeight={'medium'} bgColor={page == 7 ? 'white' : 'inherit'}> <MenuItem> Unidades </MenuItem></Flex>

                        </MenuList>
                    </Menu>
                </Flex>
                :
                <Flex w={'100%'} gap={4} px={[4, 4, 4, 4, 4]} py={2} bgColor={'grayMenuSide'} borderRadius={4} >
                    <Flex onClick={() => { SetPage(0) }} minW={'max-content'} borderRadius={4} py={2} px={1} as='button' fontWeight={'medium'} bgColor={page == 0 ? 'white' : 'inherit'} >Informações gerais</Flex>
                    <Flex onClick={() => { SetPage(3) }} minW={'max-content'} borderRadius={4} py={2} px={1} as='button' fontWeight={'medium'} bgColor={page == 3 ? 'white' : 'inherit'} >Documentos</Flex>
                    <Flex onClick={() => { SetPage(4) }} minW={'max-content'} borderRadius={4} py={2} px={1} as='button' fontWeight={'medium'} bgColor={page == 4 ? 'white' : 'inherit'} >Mídias</Flex>
                    <Flex onClick={() => { SetPage(5) }} minW={'max-content'} borderRadius={4} py={2} px={1} as='button' fontWeight={'medium'} bgColor={page == 5 ? 'white' : 'inherit'} >Status</Flex>
                    <Flex onClick={() => { SetPage(7); saveCurrentPage(7) }} minW={'max-content'} borderRadius={4} py={2} px={1} as='button' fontWeight={'medium'} bgColor={page == 7 ? 'white' : 'inherit'} >Unidades</Flex>                    
                </Flex>
            }

            {page == 0 ? (<InfosGerais userData={userData} projectData={projectData} />) : ('')}
            {page == 3 ? (<DocumentsList userData={userData} documentList={documentList} setDocumentList={setDocumentList} user={user} projectData={projectData} />) : ('')}
            {page == 4 ? (<ProjectGallery userData={userData} projectData={projectData} />) : ('')}
            {page == 5 ? (<BuildingStatus userData={userData} projectData={projectData} />) : ('')}
            {page == 7 ? (<Unidades userData={userData} projectData={projectData} />) : ('')}


        </Flex>
    );
}

export default ProjectResumeProprietario
