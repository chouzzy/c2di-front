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

interface ProjectDataProps {
    projectData: Investment
    user: UserProfile | undefined
}

function ProjectResumeAdmin({ user, projectData }: ProjectDataProps) {

    const [page, SetPage] = useState(0)

    if (!user) {
        return <SpinnerFullScreen/>
    }
    if (!projectData) {
        return <SpinnerFullScreen/>
    }

    return (

        <Flex w='100%' flexDirection="column" gap={2}>

            <Flex w={'min-content'} gap={4} px={4} py={2} bgColor={'grayMenuSide'} borderRadius={4} >
                <Flex onClick={() => { SetPage(0) }} minW={'max-content'} borderRadius={4} py={2} px={1} as='button' fontWeight={'medium'} bgColor={page == 0 ? 'white' : 'inherit'} >Informações gerais</Flex>
                <Flex onClick={() => { SetPage(1) }} minW={'max-content'} borderRadius={4} py={2} px={1} as='button' fontWeight={'medium'} bgColor={page == 1 ? 'white' : 'inherit'} >Ficha Técnica</Flex>
                <Flex onClick={() => { SetPage(2) }} minW={'max-content'} borderRadius={4} py={2} px={1} as='button' fontWeight={'medium'} bgColor={page == 2 ? 'white' : 'inherit'} >Parceiros</Flex>
                <Flex onClick={() => { SetPage(3) }} minW={'max-content'} borderRadius={4} py={2} px={1} as='button' fontWeight={'medium'} bgColor={page == 3 ? 'white' : 'inherit'} >Documentos</Flex>
                <Flex onClick={() => { SetPage(4) }} minW={'max-content'} borderRadius={4} py={2} px={1} as='button' fontWeight={'medium'} bgColor={page == 4 ? 'white' : 'inherit'} >Mídias</Flex>
                <Flex onClick={() => { SetPage(5) }} minW={'max-content'} borderRadius={4} py={2} px={1} as='button' fontWeight={'medium'} bgColor={page == 5 ? 'white' : 'inherit'} >Investidores</Flex>
            </Flex>

            {page == 0 ? (<InfosGerais projectData={projectData} />) : ('')}
            {page == 1 ? (<FichaTecnica projectData={projectData} />) : ('')}
            {page == 2 ? (<Partners user={user} projectData={projectData} />) : ('')}
            {page == 3 ? (<DocumentsList user={user} projectData={projectData} />) : ('')}
            

        </Flex>
    );
}

export default ProjectResumeAdmin