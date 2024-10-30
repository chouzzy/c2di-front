import { Flex, Image } from "@chakra-ui/react";
import { register } from "module";
import { FaFacebook, FaApple } from "react-icons/fa";
import { AuthInput } from "../Inputs/AuthInput";
import { useForm } from "react-hook-form";


export function WelcomeCard() {

    const { register, handleSubmit, formState: { errors } } = useForm({});

    return (


        <Flex w='100%'>
            <Flex w='100%' bgColor={'lightSide'} alignItems={'center'} justifyContent={'center'}>
                <Flex flexDir={'column'} gap={8}>

                    {/* BEM VINDO E INSTRUÇÃO */}
                    <Flex flexDir={'column'} alignItems={'center'} justifyContent={'center'}>
                        <Flex fontSize={28} fontWeight={'semibold'}>
                            Bem-vindo de volta!
                        </Flex>
                        <Flex>Insira seu e-mail e senha para entrar no portal</Flex>
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
                        <AuthInput
                            key={"password"}
                            type='password'
                            placeholder={'*************'}
                            label_top='Senha'
                            register={register("password")}
                        />

                        <Flex
                            as={'button'}
                            bgColor={'darkSide'}
                            color={"lightSide"}
                            p={2}
                            borderRadius={8}
                            fontWeight={'normal'}
                            alignItems={'center'}
                            justifyContent={'center'}
                        >
                            Entrar com e-mail
                        </Flex>

                        <Flex justifyContent={'space-between'} fontWeight={'medium'} fontSize={'sm'}>

                            <Flex borderBottom='2px' borderColor={'graySide'}>
                                Esqueci minha senha
                            </Flex>
                            <Flex borderBottom='2px' borderColor={'graySide'}>
                                Criar uma conta
                            </Flex>

                        </Flex>
                    </Flex>

                    {/* CRIAR CONTA - ESQUECI MINHA SENHA LINKS */}

                    {/* SOCIAL MEDIA DIVISOR */}
                    <Flex alignItems={'center'} gap={2}>
                        <Flex h={'0.5px'} bgColor={'graySide'} w='100%' />
                        <Flex w='100%'> OU ENTRE COM </Flex>
                        <Flex h={'0.5px'} bgColor={'graySide'} w='100%' />
                    </Flex>

                    {/* SOCIAL MEDIA ICONS LOGIN GOOGLE, FACEBOOK E APPLE */}
                    <Flex gap={8} px={8}>

                        <Flex boxSize={24} bgColor='white'>
                            <Flex alignItems={'center'} justifyContent={'center'} w='100%' border='1px' borderColor={'borderMediaSide'}>
                                <Image src="/media-icons/google.svg" boxSize={12} />
                            </Flex>
                        </Flex>

                        <Flex boxSize={24} bgColor='white'>
                            <Flex alignItems={'center'} justifyContent={'center'} w='100%' color={"facebook"} border='1px' borderColor={'borderMediaSide'}>
                                <FaFacebook size={32} />
                            </Flex>
                        </Flex>

                        <Flex boxSize={24} bgColor='white'>
                            <Flex alignItems={'center'} justifyContent={'center'} w='100%' color={"appleBlack"} border='1px' borderColor={'borderMediaSide'}>
                                <FaApple size={32} />
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>

        </Flex>
    )
}