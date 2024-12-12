import { ErrorInputComponent } from "@/components/ErrorInputComponent";
import { Flex, Button, Spinner, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { UserProfile } from "@auth0/nextjs-auth0/client";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { updateInvestorProfile } from "@/app/services/updateInvestorProfile";
import { FirstPage } from "./CreateProjectPages/FirstPage";
import { SecondPage } from "./CreateProjectPages/SecondPage";
import { ThirdPage } from "./CreateProjectPages/ThirdPage";
import { createInvestorUtils, documentsArrayAdapter, floorPlanTypesAdapter, imagesArrayAdapter, projectTypeAdapter } from "@/app/services/utils";
import { createInvestmentSchema } from "@/schemas/investmentSchema";
import { createPrismaInvestment } from "@/app/services/createInvestment";
import axios, { AxiosError } from "axios";
import { SpinnerFullScreen } from "../Loading/SpinnerFullScreen";
import { changePrismaProjectFotos } from "@/app/services/changeFotos";

interface CreateInvestorAccountCardProps {
    user: UserProfile
    router: AppRouterInstance
    userData: User
}


export function CreateProjectForm({ user, router, userData }: CreateInvestorAccountCardProps) {

    const { register, handleSubmit, formState: { errors } } = useForm({});
    const [yupError, setYupError] = useState<string>("")
    const [isUploading, setIsUploading] = useState(false)
    const [totalUploading, setTotalUploading] = useState(0)
    const [progressUploading, setProgressUploading] = useState(0)

    const handleSaveClick = () => {
        router.push('/projects');
    };
    const pages = [0, 1, 2]

    const [page, setPage] = useState(0)

    // SUBMIT FORM
    const onSubmit = async (data: any) => {

        try {
            if (page < (pages.length - 1)) {
                nextPage()
                return
            }

            setIsUploading(true)
            let totalFiles = 0;

            for (const label in data.image) {
                if (data.image.hasOwnProperty(label)) {
                    totalFiles += data.image[label].length;
                }
            }
            setTotalUploading(totalFiles); // Define o total de arquivos

            console.log('data.image')
            console.log(data.image)

            data = await createInvestorUtils(data, userData.id)

            const { image } = data

            delete data.image

            await createInvestmentSchema.validate(data);

            const investment = await createPrismaInvestment(data)

            const images: Investment["images"] = []

            for (const label in image) {

                if (image.hasOwnProperty(label)) {

                    const files = image[label];

                    const formData = new FormData();

                    for (let i = 0; i < files.length; i++) {
                        formData.append('file', files[i]);
                        setProgressUploading((prevProgress) => prevProgress + 1); // Corrigido
                    }

                    formData.append('projectId', data.title);

                    const responseFiles = await axios.post('/api/upload', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data', // Define o Content-Type para upload de arquivos
                        },
                    });

                    const imageUrls = responseFiles.data.imageUrls;

                    for (let index = 0; index < imageUrls.length; index++) {

                        console.log('imageUrls[index]')
                        console.log(imageUrls[index])
                        images.push({
                            id: 'newimage',
                            label: label,
                            url: imageUrls[index],
                            description: imageUrls[index].replace('https://c2di-space.nyc3.digitaloceanspaces.com/', '')
                        })
                    }
                }
            }

            investment.images = images

            await changePrismaProjectFotos(investment.id, investment)

            setIsUploading(false)

            handleSaveClick()

        } catch (error: any) {
            if (error instanceof AxiosError) {
                if (error.response) {
                    setYupError('Ocorreu um erro ao criar o projeto, verifique os dados e tente novamente.')
                    console.error(error)
                    setIsUploading(false)
                } else {
                    console.error(error)
                    setIsUploading(false)
                }
            } else {
                console.error(error)
                setIsUploading(false)
            }
        }
    };

    const nextPage = async () => {
        setPage(page + 1)
    }
    const previousPage = async () => {
        setPage(page - 1)
    }

    return (
        <Flex w='100%'>
            {isUploading ?
                <Flex w='100%' h='100%' alignItems={'center'} justifyContent={'center'} flexDir={'column'}>
                    <Flex maxW='50vw'>
                        <ErrorInputComponent error={yupError} />
                    </Flex>
                    <Flex alignItems={'center'} p={8} justifyContent={'center'} gap={4}>
                        <Text> Fazendo o upload de {progressUploading} imagens de um total de {totalUploading}</Text>
                        <Spinner boxSize={6} />
                    </Flex>
                </Flex>
                :
                <Flex w='100%' alignItems={'center'} justifyContent={'space-between'} flexDir={'column'} >

                    <Flex flexDir={'column'} gap={8} h={780} w='100%'>

                        <form onSubmit={handleSubmit(onSubmit)} style={{ height: '100%', width: '100%' }}>
                            <Flex flexDir={'column'} justifyContent={'space-between'} h='100%' gap={8}>


                                <Flex flexDir={'column'} gap={8}>


                                    {page === 0 ?
                                        <FirstPage register={register} userData={userData} />
                                        :
                                        ''
                                    }

                                    {page === 1 ?
                                        <SecondPage register={register} userData={userData} />
                                        :
                                        ''
                                    }

                                    {/* FOTOS E DOCUMENTOS */}
                                    {page === 2 ?
                                        <ThirdPage register={register} userData={userData} />
                                        :
                                        ''
                                    }



                                </Flex>

                                <Flex alignItems={'center'} justifyContent={'space-between'} w='100%'>

                                    <Button
                                        colorScheme="blackAlpha"
                                        fontSize={14}
                                        color={'lightSide'}
                                        fontWeight={'light'}
                                        bgColor={'darkSide'}
                                        isDisabled={page == 0}
                                        onClick={previousPage}
                                    >
                                        Anterior
                                    </Button>
                                    <Flex fontSize={14}>
                                        Página {page + 1} de {pages.length}
                                    </Flex>

                                    {page === pages.length - 1 ?
                                        <>
                                            <Button
                                                type='submit'
                                                fontSize={14}
                                                color={'lightSide'}
                                                fontWeight={'light'}
                                                bgColor={'darkSide'}
                                                size={['md', 'md', 'md', 'md', 'md']}
                                                _hover={{ bgColor: "graySide", transition: '300ms' }}
                                            >
                                                Salvar
                                            </Button>
                                        </>
                                        :
                                        <Button
                                            type="submit"
                                            colorScheme="blackAlpha"
                                            fontSize={14}
                                            color={'lightSide'}
                                            fontWeight={'light'}
                                            bgColor={'darkSide'}
                                            isDisabled={page >= (pages.length - 1)}
                                        // onClick={nextPage}
                                        >
                                            Próxima
                                        </Button>
                                    }

                                </Flex>

                            </Flex>
                        </form>

                    </Flex>



                </Flex>
            }
        </Flex >
    )
}