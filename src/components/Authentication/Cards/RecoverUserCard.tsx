import { Flex, Image, useColorModeValue } from "@chakra-ui/react";
import { register } from "module";
import { FaFacebook, FaApple } from "react-icons/fa";
import { AuthInput } from "../Inputs/AuthInput";
import { useForm } from "react-hook-form";
import { useState } from "react";


export function RecoverUserCard() {

    const { register, handleSubmit, formState: { errors } } = useForm({});

    const [emailSent, setEmailSent] = useState<boolean>(false)

    return (


        <Flex w='100%'>
            <Flex w='100%' bgColor={'lightSide'} alignItems={'center'} justifyContent={'center'}>
                <Flex flexDir={'column'} gap={8}>

                    {/* BEM VINDO E INSTRUÇÃO */}
                    <Flex flexDir={'column'} alignItems={'center'} justifyContent={'center'}>
                        <Flex fontSize={28} fontWeight={'semibold'}>
                            {emailSent ?
                                'E-mail enviado!'
                                :
                                'Esqueceu sua senha?'
                            }
                        </Flex>
                        <Flex>
                            {emailSent ?
                                'Verifique sua caixa de entrada para recuperar sua senha'
                                :
                                'Te enviaremos um link para recuperar sua conta'
                            }
                        </Flex>
                    </Flex>

                    {/* AUTH INPUTS: LOGIN E SENHA */}
                    <Flex flexDir={'column'} gap={4}>


                        <AuthInput
                            key={"email"}
                            type='email'
                            placeholder={'nome@exemplo.com'}
                            label_top='E-mail'
                            register={register("email")}
                        />

                        <Flex
                            as={'button'}
                            onClick={() => {setEmailSent(!emailSent)}}
                            fontSize={'sm'}
                            bgColor={useColorModeValue('darkSide', 'dark.lightSide')}
                            color={"lightSide"}
                            p={2}
                            borderRadius={8}
                            fontWeight={'normal'}
                            alignItems={'center'}
                            justifyContent={'center'}
                        >
                            {emailSent ?
                                'Não recebeu o link? Enviar novamente'
                                :
                                'Enviar e-mail de recuperação'
                            }
                        </Flex>

                    </Flex>

                    {/* VOLTAR PARA O LOGIN */}

                    <Flex justifyContent={'center'} fontWeight={'medium'} fontSize={'sm'}>

                        <Flex borderBottom='2px' borderColor={'graySide'}>
                            Voltar para o login
                        </Flex>

                    </Flex>
                </Flex>
            </Flex>

        </Flex>
    )
}