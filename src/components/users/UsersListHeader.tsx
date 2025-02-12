
import { createUsersByAdminSchema } from "@/schemas/usersSchema";
import { Button, Flex, Spinner, Text, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useColorModeValue } from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorInputComponent } from "../ErrorInputComponent";
import { AxiosError } from "axios";
import { createPrismaUser } from "@/app/services/createUser";
import { useRouter } from "next/navigation";
import { AuthInput } from "../Authentication/Inputs/AuthInput";
import { SelectInput } from "../Authentication/Inputs/SelectInput";


export function UsersListHeader() {
    
    const bgButtonColor = useColorModeValue('darkSide', 'dark.lightSide')
    
    const { isOpen, onOpen, onClose } = useDisclosure() // Adiciona o hook useDisclosure
    const { register, handleSubmit } = useForm()
    const [yupError, setYupError] = useState<string>("")
    const [createUserLoading, setCreateUserLoading] = useState(false)
    const router = useRouter()


    const createUserByAdmin = async () => {
        console.log('create')
        onOpen()

    }

    const handleSaveClick = () => {
        onClose()
        window.location.reload();
    };

    const onSubmit = async (data: any) => {

        try {
            setCreateUserLoading(true)
            setYupError("")

            switch (data.role) {
                case 'Gerente de projetos':
                    data.role = 'PROJECT_MANAGER'
                    break
                case 'Administrador':
                    data.role = 'ADMINISTRATOR'
                    break
            }

            await createUsersByAdminSchema.validate(data);

            const response = await createPrismaUser(data)

            console.log(response)


            if (response.status === 200 || response.status === 202) {
                setCreateUserLoading(false)
                handleSaveClick()
            } else {
                console.log('erro no cradastro')
                alert('Ocorreu um problema no cadastro, entre em contato com o suporte.')
                throw Error("Ocorreu um problema ao cadastrar")
            }




        } catch (error: any) {
            if (error instanceof AxiosError) {
                if (error.response) {
                    console.log(error)
                } else {
                    console.log(error)
                }
            } else {
                console.log(error)
            }
        }
    };

    return (
        <Flex flexDir={['column', 'column', 'column', 'row', 'row']} w='100%' justifyContent={'space-between'}>
            <Flex flexDir={'column'}>
                <Flex>
                    <Text fontSize={28} fontWeight={'semibold'}>
                        Usuários
                    </Text>
                </Flex>
                <Flex>
                    <Text fontSize={16}>
                        Aqui você pode visualizar a listagem de usuários cadastrados no portal
                    </Text>
                </Flex>
            </Flex>

            <Flex>
                <Button onClick={createUserByAdmin} _hover={{ bgColor: 'redSide', transition: '300ms' }} size={['sm','sm','sm','md']} color={'lightSide'} bgColor={bgButtonColor} mt={4}>
                    Criar usuário
                </Button>
            </Flex>


            {/* Modal */}
            <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
                <ModalOverlay />
                <ModalContent p={[0,0,0,4,4]} m={2}>
                    <ModalHeader>
                        <Flex gap={2} alignItems={'start'} flexDir={'column'} pt={4}>
                            <Text>
                                Criar usuário
                            </Text>
                            <Text fontWeight={'light'} fontSize={14}>
                                O usuário será criado no banco de dados e poderá alterar os dados na página de atualizar perfil. Após a criação, o usuário deverá efetuar o login e autorizar o uso do e-mail.
                            </Text>
                        </Flex>
                    </ModalHeader>
                    <ModalCloseButton color={'#EF3A5D'} />
                    <ModalBody >
                        <Flex flexDir={'column'} alignItems={'center'} justifyContent={'center'} gap={8} w='100%'>

                            <ErrorInputComponent error={yupError} />

                            <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
                                <Flex alignItems={'center'} flexDir={'column'} w='100%' gap={2}>
                                    <SelectInput
                                        key={'role'}
                                        isRequired={true}
                                        label_top="Tipo de usuário"
                                        options={['Administrador', 'Gerente de projetos']}
                                        placeholder="Selecione"
                                        register={register("role")}
                                    />
                                    <AuthInput
                                        key={"name"}
                                        isRequired={true}
                                        type='text'
                                        placeholder={'Nome completo do usuário'}
                                        label_top='Nome completo'
                                        register={register("name")}
                                    />

                                    <AuthInput
                                        key={"phoneNumber"}
                                        isRequired={true}
                                        type='number'
                                        placeholder={'CPF'}
                                        label_top='CPF'
                                        register={register("cpf")}
                                    />

                                    {/* E-mail */}
                                    <AuthInput
                                        key={"email"}
                                        isRequired={true}
                                        type='email'
                                        placeholder={'E-mail'}
                                        label_top='E-mail'
                                        register={register("email")}
                                    />

                                    <AuthInput
                                        key={"username"}
                                        isRequired={true}
                                        type='text'
                                        placeholder={'Ex: joaopedro98'}
                                        label_top='Nome de usuário'
                                        register={register("username")}
                                    />


                                </Flex>
                                <Flex alignItems={'center'} justifyContent={'end'} py={4}>
                                    <Button type="submit" _hover={{ bgColor: 'redSide' }} color={'lightSide'} bgColor={bgButtonColor} mt={4}>
                                        <Flex minW={24} alignItems={'center'} justifyContent={'center'}>
                                            {createUserLoading ?
                                                <Spinner boxSize={6} />
                                                :
                                                <Text>Criar usuário</Text>
                                            }
                                        </Flex>
                                    </Button>
                                </Flex>
                            </form>

                        </Flex>
                    </ModalBody>

                    {/* <ModalFooter>
                        <Button colorScheme='red' mr={3} onClick={onClose}>
                            Fechar
                        </Button>
                    </ModalFooter> */}
                </ModalContent>
            </Modal>
        </Flex>


    )
}