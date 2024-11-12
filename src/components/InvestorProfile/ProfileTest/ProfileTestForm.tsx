import { ErrorInputComponent } from "@/components/ErrorInputComponent";
import { Flex, Button, Spinner } from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { UserProfile } from "@auth0/nextjs-auth0/client";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { PersonalDataAndGoals } from "./PersonalDataAndGoals";
import { RiskAndExperience } from "./RiskAndExperience";
import { HorizonAndNetWorth } from "./HorizonAndNetWorth";
import { PreferencesAndConsiderations } from "./PreferencesAndConsiderations";
import { updateInvestorProfile } from "@/app/api/updateInvestorProfile/route";

interface CreateInvestorAccountCardProps {
    user: UserProfile
    router: AppRouterInstance
    userData: User
}


export function ProfileTestForm({ user, router, userData }: CreateInvestorAccountCardProps) {

    const { register, handleSubmit, formState: { errors } } = useForm({});
    const [yupError, setYupError] = useState<string>("")

    const handleSaveClick = () => {
        router.push(`/users/update/investor`)
    };

    const pages = [0, 1, 2, 3]

    const [page, setPage] = useState(0)
    const [disableNextPageButton, setDisableNextPageButton] = useState(false)
    const [disablePreviousPageButton, setDisablePreviousPageButton] = useState(true)

    // SUBMIT FORM
    const onSubmit = async (data: any) => {

        try {
            console.log('data')
            console.log(data)
            if (page < (pages.length - 1)) {
                nextPage()
                return
            }

            const postData = { ...data, userId: userData.id }

            // await createUsersSchema.validate(data);

            const response = await updateInvestorProfile(postData)


            handleSaveClick()

        } catch (error: any) {
            if (error instanceof AxiosError) {
                if (error.response) {
                    setYupError(error.response?.data.error.message)
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
        <Flex w='100%' minH={'100vh'} bgColor={'lightSide'}>
            <Flex w='100%' alignItems={'center'} justifyContent={'space-between'} py={20} px={4} flexDir={'column'}>

                <Flex flexDir={'column'} gap={8} px={8} h='100%' w='100%'>
                    {/* BEM VINDO E INSTRUÇÃO */}
                    <Flex flexDir={'column'} alignItems={'center'} justifyContent={'center'}>
                        <Flex fontSize={28} fontWeight={'semibold'} textAlign={'center'}>
                            Perfil do Investidor Imobiliário
                        </Flex>
                        <Flex>
                            Preencha o formulário e determinaremos seu perfil
                        </Flex>
                    </Flex>

                    <Flex maxW='50vw'>
                        <ErrorInputComponent error={yupError} />
                    </Flex>
                    <form onSubmit={handleSubmit(onSubmit)} style={{ height: '100%', width: '100%' }}>
                        <Flex flexDir={'column'} justifyContent={'space-between'} h='100%'>


                            <Flex flexDir={'column'} gap={8}>


                                {/* DADOS PESSOAIS */}
                                {page === 0 ?
                                    <PersonalDataAndGoals register={register} userData={userData} />
                                    :
                                    ''
                                }

                                {/* OBJETIVOS E EXPERIENCIA */}
                                {page === 1 ?
                                    <RiskAndExperience register={register} />
                                    :
                                    ''
                                }
                                {/* RISCO, HORIZONTE E PATRIMONIO */}
                                {page === 2 ?
                                    <HorizonAndNetWorth register={register} />
                                    :
                                    ''
                                }

                                {/* PREFERÊNCIAS E CONSIDERAÇÕES FINAIS */}

                                {page === 3 ?
                                    <>
                                        <PreferencesAndConsiderations register={register} />
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

                            </Flex>
                        </Flex>
                    </form>

                </Flex>



            </Flex>
        </Flex >
    )
}