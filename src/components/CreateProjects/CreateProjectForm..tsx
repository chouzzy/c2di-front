import { ErrorInputComponent } from "@/components/ErrorInputComponent";
import { Flex, Button, Spinner } from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { UserProfile } from "@auth0/nextjs-auth0/client";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { updateInvestorProfile } from "@/app/services/updateInvestorProfile/route";
import { FirstPage } from "./CreateProjectPages/FirstPage";
import { SecondPage } from "./CreateProjectPages/SecondPage";
import { ThirdPage } from "./CreateProjectPages/ThirdPage";
import { createInvestorUtils, documentsArrayAdapter, floorPlanTypesAdapter, imagesArrayAdapter, projectTypeAdapter } from "@/app/services/utils";
import { createInvestmentSchema } from "@/schemas/investmentSchema";
import { createPrismaInvestment } from "@/app/services/createInvestment/route";

interface CreateInvestorAccountCardProps {
    user: UserProfile
    router: AppRouterInstance
    userData: User
}


export function CreateProjectForm({ user, router, userData }: CreateInvestorAccountCardProps) {

    const { register, handleSubmit, formState: { errors } } = useForm({});
    const [yupError, setYupError] = useState<string>("")

    const handleSaveClick = () => {
        window.location.href = 'http://localhost:3000/projects'
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

            data = await createInvestorUtils(data, userData.id)

            console.log('data')
            console.log(data)


            await createInvestmentSchema.validate(data);

            const response = await createPrismaInvestment(data)

            handleSaveClick()

        } catch (error: any) {
            if (error instanceof AxiosError) {
                if (error.response) {
                    setYupError('Ocorreu um erro ao criar o projeto, verifique os dados e tente novamente.')
                    console.error(error)
                } else {
                    console.error(error)
                }
            } else {
                console.error(error)
            }
        }
    };

    const nextPage = async () => {
        setPage(page + 1)
    }
    const previousPage = async () => {
        setPage(page - 1)
    }

    if (!user) {
        return (
            <Flex h='100%' w='100%' alignItems={'center'} justifyContent={'center'}>
                <Spinner boxSize={32} />
            </Flex>
        )
    }
    if (!user.email) {
        return (
            <Flex h='100%' w='100%' alignItems={'center'} justifyContent={'center'}>
                <Spinner boxSize={32} />
            </Flex>
        )
    }



    return (
        <Flex w='100%'>
            <Flex w='100%' alignItems={'center'} justifyContent={'space-between'} flexDir={'column'}>

                <Flex flexDir={'column'} gap={8} h={780} w='100%'>

                    <Flex maxW='50vw'>
                        <ErrorInputComponent error={yupError} />
                    </Flex>
                    <form onSubmit={handleSubmit(onSubmit)} style={{ height: '100%', width: '100%' }}>
                        <Flex flexDir={'column'} justifyContent={'space-between'} h='100%'>


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
                                <Flex>
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
                                            mt={4}
                                            minW={48}
                                            _hover={{ bgColor: "graySide", transition: '300ms' }}
                                        >
                                            Salvar e ir para o painel
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
        </Flex >
    )
}