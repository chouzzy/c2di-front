import { Flex, useColorModeValue } from "@chakra-ui/react";
import { AuthInput } from "../Inputs/AuthInput";
import { useForm } from "react-hook-form";


export function NewPasswordCard() {

    const bgButtonColor = useColorModeValue('darkSide', 'dark.lightSide')
    const { register, handleSubmit, formState: { errors } } = useForm({});

    return (


        <Flex w='100%'>
            <Flex w='100%' bgColor={'lightSide'} alignItems={'center'} justifyContent={'center'}>
                <Flex flexDir={'column'} gap={8}>

                    {/* BEM VINDO E INSTRUÇÃO */}
                    <Flex flexDir={'column'} alignItems={'center'} justifyContent={'center'}>
                        <Flex fontSize={28} fontWeight={'semibold'}>
                            Recupere sua senha
                        </Flex>
                        <Flex>
                            Crie uma nova senha para acessar sua conta
                        </Flex>
                    </Flex>

                    {/* AUTH INPUTS: LOGIN E SENHA */}
                    <Flex flexDir={'column'} gap={4}>


                        <AuthInput
                            key={"email"}
                            type='email'
                            disabled
                            placeholder={'nome@exemplo.com'}
                            label_top='E-mail'
                            register={register("email")}
                        />

                        <AuthInput
                            key={"password"}
                            type='password'
                            placeholder={'********'}
                            label_top='Nova senha'
                            register={register("password")}
                        />

                        <AuthInput
                            key={"password"}
                            type='password'
                            placeholder={'********'}
                            label_top='Confirmar nova senha'
                            register={register("conrifmPassword")}
                        />

                        <Flex
                            as={'button'}
                            fontSize={'sm'}
                            bgColor={bgButtonColor}
                            color={"lightSide"}
                            p={2}
                            borderRadius={8}
                            fontWeight={'normal'}
                            alignItems={'center'}
                            justifyContent={'center'}
                        >
                            Salvar e voltar para login
                        </Flex>

                    </Flex>
                </Flex>
            </Flex>

        </Flex>
    )
}