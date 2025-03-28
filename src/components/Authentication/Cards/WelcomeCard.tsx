"use client"
import { Flex, Spinner, useColorModeValue } from "@chakra-ui/react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { UserProfile } from "@auth0/nextjs-auth0/client";
import { useState } from "react";
import { useRouter } from "next/navigation";


interface WelcomeCardProps {
    user: UserProfile | undefined,
    isLoading: boolean,
    register: UseFormRegister<FieldValues>
}

export function WelcomeCard({ user, isLoading, register }: WelcomeCardProps) {

    const bgButtonColor = useColorModeValue('darkSide', 'dark.lightSide')

    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const LoginCallback = () => {
        setLoading(true)
        router.push("api/auth/login")
    }

    return (
        <Flex w='100%'>
            <Flex w='100%' bgColor={'lightSide'} alignItems={'center'} justifyContent={'center'}>
                {isLoading ?
                    <Spinner boxSize={32} />
                    :
                    <Flex flexDir={'column'} gap={8}>

                        {/* BEM VINDO E INSTRUÇÃO */}
                        <Flex flexDir={'column'} alignItems={'center'} justifyContent={'center'}>
                            <Flex fontSize={28} fontWeight={'semibold'}>
                                Bem-vindo
                            </Flex>
                            <Flex>Clique no botão abaixo para entrar no portal</Flex>
                        </Flex>

                        {/* AUTH INPUTS: LOGIN E SENHA */}
                        <Flex flexDir={'column'} gap={4}>


                            {/* <AuthInput
                                key={"email"}
                                type='email'
                                placeholder={'nome@exemplo.com'}
                                label_top='E-mail'
                                register={register("email")}
                            />
                            <AuthInput
                                key={"password"}
                                type='password'
                                placeholder={'*************'}
                                label_top='Senha'
                                register={register("password")}
                            /> */}

                            {/* <Link href='/api/auth/login'> */}
                            <Flex
                                as={'button'}
                                onClick={() => { LoginCallback() }}
                                bgColor={bgButtonColor}
                                color={"lightSide"}
                                p={2}
                                borderRadius={8}
                                fontWeight={'normal'}
                                alignItems={'center'}
                                justifyContent={'center'}
                                _hover={{ bgColor: "redSide", transition: '300ms' }}
                            >
                                {loading ?
                                    <Spinner boxSize={6} />
                                    :
                                    'Entrar / Cadastrar'
                                }
                            </Flex>
                            {/* </Link> */}

                            {/* <Flex justifyContent={'space-between'} fontWeight={'medium'} fontSize={'sm'}>

                                <Flex borderBottom='2px' borderColor={'graySide'}>
                                    Esqueci minha senha
                                </Flex>
                                <Flex borderBottom='2px' borderColor={'graySide'}>
                                    Criar uma conta
                                </Flex>

                            </Flex> */}
                        </Flex>

                        {/* CRIAR CONTA - ESQUECI MINHA SENHA LINKS */}

                        {/* SOCIAL MEDIA DIVISOR */}
                        {/* <Flex alignItems={'center'} gap={2}>
                            <Flex h={'0.5px'} bgColor={'graySide'} w='100%' />
                            <Flex w='100%'> OU ENTRE COM </Flex>
                            <Flex h={'0.5px'} bgColor={'graySide'} w='100%' />
                        </Flex> */}

                        {/* SOCIAL MEDIA ICONS LOGIN GOOGLE, FACEBOOK E APPLE */}
                        {/* <Flex gap={8} px={8}>

                            <Flex boxSize={24} bgColor='white'>
                                <Flex alignItems={'center'} justifyContent={'center'} w='100%' border='1px' borderColor={'borderMediaSide'} onClick={() => { LoginCallback() }} cursor={'pointer'}>
                                    <Image src="/media-icons/google.svg" boxSize={12} />
                                </Flex>
                            </Flex>

                            <Flex boxSize={24} bgColor='white'>
                                <Flex alignItems={'center'} justifyContent={'center'} w='100%' color={"facebook"} border='1px' borderColor={'borderMediaSide'} onClick={() => { LoginCallback() }} cursor={'pointer'}>
                                    <FaFacebook size={32} />
                                </Flex>
                            </Flex>

                            <Flex boxSize={24} bgColor='white'>
                                <Flex alignItems={'center'} justifyContent={'center'} w='100%' color={"appleBlack"} border='1px' borderColor={'borderMediaSide'} onClick={() => { LoginCallback() }} cursor={'pointer'}>
                                    <FaApple size={32} />
                                </Flex>
                            </Flex>
                        </Flex>
                         */}
                    </Flex>
                }
            </Flex>

        </Flex>
    )
}