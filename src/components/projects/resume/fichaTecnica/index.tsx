import { updateProjectFicha } from '@/app/services/updateProjectFicha';
import { floorPlanTypesAdapter, projectTypeAdapter } from '@/app/services/utils';
import { updateInvestmentSchema } from '@/schemas/investmentSchema';
import { Badge, Button, Divider, Flex, Spinner, Text } from '@chakra-ui/react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
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
import { Tipologias } from './Tipologias';
import { TipologiesState } from '@/components/CreateProjects/CreateProjectForm.';
import { UploadTipologiesImages } from '@/app/services/uploadImages';
import { UploadAlvara } from '@/app/services/uploadAlvara';
import { Alvaras } from './Alvaras';


interface ProjectDataProps {
    projectData: Investment
    userData: User
    setProjectData: Dispatch<SetStateAction<Investment | null>>
}

export function FichaTecnica({ userData, projectData, setProjectData }: ProjectDataProps) {

    const { register, handleSubmit, formState: { errors } } = useForm({});
    const [yupError, setYupError] = useState<string>("")
    const [editMode, setEditMode] = useState(false); // Estado para controlar o modo de edição

    const [isLoading, setIsLoading] = useState(false)
    const [plantas, setPlantas] = useState<Photos["url"][]>(['/assets/img-not-found.png'])

    const [progressUploading, setProgressUploading] = useState(0)
    const [newTipologies, setNewTipologies] = useState<TipologiesState[]>([])

    const buildingStatusDict = {
        LANCAMENTO: { name: "Lançamento", color: "green" },
        CONSTRUCAO: { name: "Em construção", color: "blue" },
        FINALIZACAO: { name: "Fase de finalização", color: "cyan" },
        FINALIZADO: { name: "Finalizado", color: "gray" },
    };


    useEffect(() => {
        const getPlantas = async () => {
            const { photos } = projectData
            const plantas = photos.find((img) => img.category === 'FACHADA')

            if (plantas) {
                const plantasUrl = plantas.images.map((img) => { return img.url })
                setPlantas(plantasUrl)
            } else {
                setPlantas(['/assets/img-not-found.png'])
            }

        }
        if (projectData) {
            getPlantas()
        }
    }, [projectData])


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



            const { alvaras: alvarasData } = data
            // Alvarás com fileList no lugar do link
            const alvaras = await UploadAlvara(alvarasData, projectData.title);
            console.log('alvaras')
            console.log(alvaras)
            // Alvarás com link já em string, com a url dentro.

            // Preciso pegar os alvarás novos/atualizados e adicionar nos que já tenho. Caso haja um alvará cadastrado em projectData.alvaras e um novo alvará for lançado, preciso que substitua com o novo alvará
            const { alvaras: projectAlvaras } = projectData
            console.log('projectAlvaras')
            console.log(projectAlvaras)

            // const alvaras = await UploadAlvara(alvarasData, projectData.title);

            // Começa com uma cópia dos alvarás existentes (ou um objeto vazio se não houver)
            const updatedAlvaras: Alvaras = { ...projectData.alvaras || {} };

            // Itera sobre as *chaves* de 'alvaras'
            for (const alvaraKey in alvaras) {
                if (Object.prototype.hasOwnProperty.call(alvaras, alvaraKey)) {
                    if (alvaraKey === 'demolicao' || alvaraKey === 'aprovacao' || alvaraKey === 'construcao' || alvaraKey === 'estande') {
                        const newAlvaraInfo = alvaras[alvaraKey as keyof Alvaras];

                        if (newAlvaraInfo) { //Verifica se existe
                            // VERIFICA SE O NOVO ALVARÁ TEM UM LINK VÁLIDO
                            if (newAlvaraInfo.link && newAlvaraInfo.link.length > 0) {
                                // Se tiver um link válido, sobrescreve
                                updatedAlvaras[alvaraKey as keyof Alvaras] = newAlvaraInfo;
                            } else {
                                // Se não tiver um link válido, mantém o valor existente (se houver)
                                // (Não faz nada, pois updatedAlvaras já é uma cópia do original)
                                console.warn(`Alvará ${alvaraKey} não atualizado: link vazio ou inexistente.`);
                            }
                        }
                    } else {
                        console.warn("Chave de alvará desconhecida:", alvaraKey);
                    }
                }
            }

            console.log('updatedAlvaras')
            console.log(updatedAlvaras)

            handleIsLoading();
            data = await projectTypeAdapter(data)
            data = await floorPlanTypesAdapter(data)
            const tipologiesUploaded = await UploadTipologiesImages({ tipologies: newTipologies, folderTitle: projectData.title, setProgressUploading });

            data.alvaras = updatedAlvaras

            const existingTipologies = projectData.tipologies || [];

            const tipologiesMap = new Map<string, Tipologies>();

            existingTipologies.forEach((tipology) => {
                tipologiesMap.set(tipology.id, tipology);
            });
            tipologiesUploaded.forEach((tipology) => {
                tipologiesMap.set(tipology.id, tipology);
            });

            const allTipologies = Array.from(tipologiesMap.values());

            // 3. Adicionar as tipologias aos dados a serem enviados
            data.tipologies = allTipologies; // Usa o array combinado

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
                    <Flex flexDir={['column']} gap={4}>
                        <Flex>
                            <Badge variant='solid' fontSize={'md'} colorScheme={buildingStatusDict[projectData.buildingStatus].color}> {buildingStatusDict[projectData.buildingStatus].name} </Badge>
                        </Flex>
                        <Flex> <Text fontWeight={'semibold'} fontSize={'2xl'}> Descrição </Text> </Flex>
                        <Text fontWeight={'medium'} fontSize={'lg'}>{projectData.description}</Text>
                    </Flex>

                    <Flex gap={4} flexDir={['column', 'column', 'column', 'row', 'row']}>
                        <Caracteristicas projectData={projectData} />
                        <Divider orientation='vertical' h={'100%'} w='1px' mx='auto' bgColor={'grayDivisor'} />
                        <Mapa projectData={projectData} />
                    </Flex>

                    <Divider orientation='horizontal' h={'1px'} w='100%' mx='auto' bgColor={'grayDivisor'} />

                    <Flex gap={4} flexDir={['column', 'column', 'column', 'row', 'row']}>
                        <Tipologias projectData={projectData} />
                        <Divider orientation='vertical' h={'100%'} w='1px' mx='auto' bgColor={'grayDivisor'} />
                        <Alvaras projectData={projectData} />
                    </Flex>

                    <Divider orientation='horizontal' h={'1px'} w='100%' mx='auto' bgColor={'grayDivisor'} />

                    <Flex gap={4} flexDir={['column', 'column', 'column', 'row', 'row']}>
                        <Custos projectData={projectData} />
                        <Divider orientation='vertical' h={'100%'} w='1px' mx='auto' bgColor={'grayDivisor'} />
                        <Flex flexDir={'column'} w='100%' gap={4} h='100%' justifyContent={'space-between'}>
                            <Carousel images={plantas} />
                            <Construtora projectData={projectData} />
                        </Flex>
                    </Flex>

                    {userData.role === 'PROJECT_MANAGER' || userData.role === 'ADMINISTRATOR' ? <>
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
                                    < Form projectData={projectData} setProjectData={setProjectData} register={register} userData={userData} tipologies={projectData.tipologies} newTipologies={newTipologies} setNewTipologies={setNewTipologies} />
                                </form >
                                : ''
                        }
                    </>
                        : ''
                    }
                </>
            }
        </Flex >
    )
}