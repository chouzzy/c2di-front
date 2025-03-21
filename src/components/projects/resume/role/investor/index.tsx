import { Flex, IconButton, Menu, MenuButton, MenuItem, MenuList, useBreakpointValue, useColorModeValue } from '@chakra-ui/react';
import { FichaTecnica } from '../../fichaTecnica';
import { Dispatch, SetStateAction, useState } from 'react';
import Partners from '../../partners';
import { UserProfile } from '@auth0/nextjs-auth0/client';
import { SpinnerFullScreen } from '@/components/Loading/SpinnerFullScreen';
import DocumentsList from '../../documentsList';
import { InfosGerais } from '../../infosGerais';
import { ProjectGallery } from '../../gallery';
import { BuildingStatus } from '../../buildingStatus';
import { ArrowFatLinesDown, CaretDoubleDown, List } from 'phosphor-react';
import { Unidades } from '../../unidades';

interface ProjectDataProps {
    userData: User
    projectData: Investment
    user: UserProfile | undefined
    setProjectData: Dispatch<SetStateAction<Investment | null>>
}

function ProjectResumeInvestor({ userData, user, projectData, setProjectData }: ProjectDataProps) {

    const menuList = ['Informações gerais', 'Ficha Técnica', 'Parceiros', 'Documentos', 'Mídias', 'Status']

    const menuBgColor = useColorModeValue('grayMenuSide', 'dark.beigeSide')
    const menuTextColor = useColorModeValue('darkSide', 'lightSide')
    const menuColor = useColorModeValue('white', 'dark.grayHoverSide')

    const [page, SetPage] = useState(0)
    const [partnerList, setPartnerList] = useState<Investment["partners"] | undefined>(projectData.partners)
    const [documentList, setDocumentList] = useState<Investment["documents"] | undefined>(projectData.documents)
    const [menuLabel, setMenuLabel] = useState(menuList[page])


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
                            <Flex alignItems={'center'} justifyContent={'center'} gap={4}>

                                {menuLabel} <ArrowFatLinesDown />
                            </Flex>
                        </MenuButton>
                        <MenuList
                            w='100vw'
                            bgColor={menuBgColor}
                            color={menuTextColor}
                            borderRadius={0}
                            justifyContent={'center'}
                            alignItems={'center'}
                        >
                            <Flex onClick={() => { SetPage(0); setMenuLabel(menuList[0]) }} w='100%' fontWeight={'medium'} bgColor={page == 0 ? menuColor : 'inherit'} color={page == 0 ? 'white' : 'inherit'}> <MenuItem> Informações gerais </MenuItem></Flex>
                            <Flex onClick={() => { SetPage(1); setMenuLabel(menuList[1]) }} w='100%' fontWeight={'medium'} bgColor={page == 1 ? menuColor : 'inherit'} color={page == 1 ? 'white' : 'inherit'}> <MenuItem> Ficha Técnica </MenuItem></Flex>
                            <Flex onClick={() => { SetPage(2); setMenuLabel(menuList[2]) }} w='100%' fontWeight={'medium'} bgColor={page == 2 ? menuColor : 'inherit'} color={page == 2 ? 'white' : 'inherit'}> <MenuItem> Parceiros </MenuItem></Flex>
                            <Flex onClick={() => { SetPage(3); setMenuLabel(menuList[3]) }} w='100%' fontWeight={'medium'} bgColor={page == 3 ? menuColor : 'inherit'} color={page == 3 ? 'white' : 'inherit'}> <MenuItem> Documentos </MenuItem></Flex>
                            <Flex onClick={() => { SetPage(4); setMenuLabel(menuList[4]) }} w='100%' fontWeight={'medium'} bgColor={page == 4 ? menuColor : 'inherit'} color={page == 4 ? 'white' : 'inherit'}> <MenuItem> Mídias </MenuItem></Flex>
                            <Flex onClick={() => { SetPage(5); setMenuLabel(menuList[5]) }} w='100%' fontWeight={'medium'} bgColor={page == 5 ? menuColor : 'inherit'} color={page == 5 ? 'white' : 'inherit'}> <MenuItem> Status </MenuItem></Flex>
                            <Flex onClick={() => { SetPage(6); setMenuLabel(menuList[6]) }} w='100%' fontWeight={'medium'} bgColor={page == 6 ? menuColor : 'inherit'} color={page == 6 ? 'white' : 'inherit'}> <MenuItem> Unidades </MenuItem></Flex>
                        </MenuList>
                    </Menu>
                </Flex>
                :
                <Flex w={'100%'} gap={4} px={[4, 4, 4, 4, 4]} py={2} borderRadius={4} bgColor={menuBgColor} color={menuTextColor}>
                    <Flex onClick={() => { SetPage(0) }} minW={'max-content'} borderRadius={4} py={2} px={1} as='button' fontWeight={'medium'} bgColor={page == 0 ? menuColor : 'inherit'} >Informações gerais</Flex>
                    <Flex onClick={() => { SetPage(1) }} minW={'max-content'} borderRadius={4} py={2} px={1} as='button' fontWeight={'medium'} bgColor={page == 1 ? menuColor : 'inherit'} >Ficha Técnica</Flex>
                    <Flex onClick={() => { SetPage(2) }} minW={'max-content'} borderRadius={4} py={2} px={1} as='button' fontWeight={'medium'} bgColor={page == 2 ? menuColor : 'inherit'} >Parceiros</Flex>
                    <Flex onClick={() => { SetPage(3) }} minW={'max-content'} borderRadius={4} py={2} px={1} as='button' fontWeight={'medium'} bgColor={page == 3 ? menuColor : 'inherit'} >Documentos</Flex>
                    <Flex onClick={() => { SetPage(4) }} minW={'max-content'} borderRadius={4} py={2} px={1} as='button' fontWeight={'medium'} bgColor={page == 4 ? menuColor : 'inherit'} >Mídias</Flex>
                    <Flex onClick={() => { SetPage(5) }} minW={'max-content'} borderRadius={4} py={2} px={1} as='button' fontWeight={'medium'} bgColor={page == 5 ? menuColor : 'inherit'} >Status</Flex>
                    <Flex onClick={() => { SetPage(6) }} minW={'max-content'} borderRadius={4} py={2} px={1} as='button' fontWeight={'medium'} bgColor={page == 6 ? menuColor : 'inherit'} >Unidades</Flex>
                </Flex>
            }

            {page == 0 ? (<InfosGerais userData={userData} projectData={projectData} />) : ('')}
            {page == 1 ? (<FichaTecnica userData={userData} projectData={projectData} setProjectData={setProjectData} />) : ('')}
            {page == 2 ? (<Partners userData={userData} partnerList={partnerList} setPartnerList={setPartnerList} user={user} projectData={projectData} />) : ('')}
            {page == 3 ? (<DocumentsList userData={userData} documentList={documentList} setDocumentList={setDocumentList} user={user} projectData={projectData} />) : ('')}
            {page == 4 ? (<ProjectGallery userData={userData} projectData={projectData} setProjectData={setProjectData} />) : ('')}
            {page == 5 ? (<BuildingStatus userData={userData} projectData={projectData} />) : ('')}
            {page == 6 ? (<Unidades userData={userData} projectData={projectData} />) : ('')}


        </Flex>
    );
}

export default ProjectResumeInvestor
