import { updateProjectFicha } from '@/app/services/updateProjectFicha';
import { floorPlanTypesAdapter, projectTypeAdapter } from '@/app/services/utils';
import { updateInvestmentSchema } from '@/schemas/investmentSchema';
import { Badge, Button, Divider, Flex, Spinner, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ValidationError } from 'yup';

import { Form } from './Form';
import { Caracteristicas } from './Caracteristicas';
import { Mapa } from './Mapa';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Carousel from './Carousel';
import { Custos } from './Custos';
import { Construtora } from './Construtora';


interface ProjectDataProps {
    projectData: Investment
    userData: User
}

export function FichaTecnica({ userData, projectData }: ProjectDataProps) {

    const { register, handleSubmit, formState: { errors } } = useForm({});
    const [yupError, setYupError] = useState<string>("")
    const [editMode, setEditMode] = useState(false); // Estado para controlar o modo de edição

    const [isLoading, setIsLoading] = useState(false)

    const buildingStatusDict = {
        LANCAMENTO: { name: "Lançamento", color: "green" },
        CONSTRUCAO: { name: "Em construção", color: "blue" },
        FINALIZACAO: { name: "Fase de finalização", color: "cyan" },
        FINALIZADO: { name: "Finalizado", color: "gray" },
    };

    const { images } = projectData
    const plantas = images.filter((img) => { return img.label === 'PLANTAS' })


    const handleEditClick = () => {
        setEditMode(true); // Ativa o modo de edição
    };

    const handleEditCancel = () => {
        setEditMode(false); // Ativa o modo de edição
    };

    const handleIsLoading = () => {
        setIsLoading(true); // Ativa o modo de edição
    };

    const onSubmit = async (data: any) => {

        try {
            handleIsLoading(); 
            data = await projectTypeAdapter(data)
            data = await floorPlanTypesAdapter(data)
            await updateInvestmentSchema.validate(data);


            const response = await updateProjectFicha(projectData.id, data)

            window.location.href = `${window.location.pathname}`

        } catch (error: any) {
            console.error(error)
            if (error instanceof ValidationError) {
                setYupError(error.message)
            }
        }
    }

    return (


        <Flex w='100%' flexDir={'column'} py={8} gap={8}>

            {isLoading ?
                <Spinner boxSize={32} mx='auto' />
                :

                <>
                    <Flex flexDir={'column'} gap={4}>
                        <Flex>
                            <Badge variant='solid' fontSize={'md'} colorScheme={buildingStatusDict[projectData.buildingStatus].color}> {buildingStatusDict[projectData.buildingStatus].name} </Badge>
                        </Flex>
                        <Flex> <Text fontWeight={'semibold'} fontSize={'2xl'}> Descrição </Text> </Flex>
                        <Text fontWeight={'medium'} fontSize={'lg'}>{projectData.description}</Text>
                    </Flex>

                    <Flex gap={4}>
                        <Caracteristicas projectData={projectData} />
                        <Divider orientation='vertical' h={'100%'} w='1px' mx='auto' bgColor={'grayDivisor'} />
                        <Mapa projectData={projectData} />
                    </Flex>

                    <Divider orientation='horizontal' h={'1px'} w='100%' mx='auto' bgColor={'grayDivisor'} />

                    <Flex gap={4}>
                        <Custos projectData={projectData} />
                        <Divider orientation='vertical' h={'100%'} w='1px' mx='auto' bgColor={'grayDivisor'} />
                        <Flex flexDir={'column'} w='100%' gap={4} h='100%' justifyContent={'space-between'}>
                            <Carousel images={plantas} />
                            <Construtora projectData={projectData} />
                        </Flex>
                    </Flex>
               

            {editMode ?
                <Button color='lightSide' bgColor="redSide" onClick={handleEditCancel} mt={4} maxW={40}>
                    Cancelar
                </Button>
                :
                <Button color='lightSide' bgColor="redSide" onClick={handleEditClick} mt={4} maxW={40}>
                    Editar
                </Button>
            }

            {
                editMode ?
                    <form onSubmit={handleSubmit(onSubmit)}>
                        < Form projectData={projectData} register={register} userData={userData} />
                    </form >
                    : ''
            }
             </>
            }
        </Flex >
    )
}