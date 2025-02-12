import { ErrorInputComponent } from "@/components/ErrorInputComponent";
import { Flex, Button, Spinner, Text, useColorModeValue } from "@chakra-ui/react";
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
import { changePrismaProjectDoc } from "@/app/services/changeDoc";
import { UploadDocuments } from "@/app/services/uploadDocuments";
import { UploadImages } from "@/app/services/uploadImages";

interface CreateInvestorAccountCardProps {
    user: UserProfile
    router: AppRouterInstance
    userData: User
}


export function CreateProjectForm({ user, router, userData }: CreateInvestorAccountCardProps) {

    const bgButtonColor = useColorModeValue('darkSide', 'dark.lightSide')

    const { register, handleSubmit, formState: { errors } } = useForm({});
    const [yupError, setYupError] = useState<string>("")
    const [isUploading, setIsUploading] = useState(false)
    const [totalUploading, setTotalUploading] = useState(0)
    const [progressUploading, setProgressUploading] = useState(0)

    const handleSaveClick = () => {
        router.push('/projects');
    };
    const pages = [0, 1, 2]

    const [page, setPage] = useState(2)

    // SUBMIT FORM
    const onSubmit = async (data: any) => {

        try {
            if (page < (pages.length - 1)) {
                nextPage()
                return
            }

            // INICIA CARREGAMENTO
            setIsUploading(true)
            let totalFiles = 0;

            // LÊ CADA IMAGEM DO ARRAY DATA.IMAGE
            for (const label in data.image) {
                if (data.image.hasOwnProperty(label)) {
                    totalFiles += data.image[label].length;
                }
            }
            setTotalUploading(totalFiles); // Define o total de arquivos

            // TRANSFORMA O ARRAY DE IMAGENS NO FORMATO DO BANCO DE DADOS
            data = await createInvestorUtils(data, userData.id)

            const { image, document } = data

            // Deleta array antigo de imagens, o novo formatado se chama data.images
            delete data.image
            delete data.document

            await createInvestmentSchema.validate(data);

            // Cria o investimento antes de cadastrar imagens no banco de imagens
            const investment = await createPrismaInvestment(data)

            const docs = await UploadDocuments(document, investment.title);
            const images = await UploadImages({image, folderTitle: investment.title, setProgressUploading});
            
            

            investment.images = images
            investment.documents = docs

            await changePrismaProjectFotos(investment.id, investment)
            await changePrismaProjectDoc(investment.id, investment)

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
                                        bgColor={bgButtonColor}
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
                                                bgColor={bgButtonColor}
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
                                            bgColor={bgButtonColor}
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