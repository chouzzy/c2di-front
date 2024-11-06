import { ErrorInputComponent } from "@/components/ErrorInputComponent";
import { Flex, Button, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthInput } from "../../Inputs/AuthInput";
import { AuthSelectInput } from "../../Inputs/AuthSelectInput";
import { useRouter } from "next/navigation";
import { ValidationError } from "yup";
import axios from "axios";
import { createUsersSchema } from "@/schemas/usersSchema";
import { genderOptions } from "@/components/users/utils";
import { fetchCities, fetchStates } from "@/app/api/ibge/route";
import { useUser } from "@auth0/nextjs-auth0/client";


export function CreateInvestorAccountCard() {

    const router = useRouter()

    const { user, isLoading } = useUser()

    console.log(user)

    const { register, handleSubmit, formState: { errors } } = useForm({});
    const [yupError, setYupError] = useState<string>("")

    const [states, setStates] = useState<string[]>()
    const [cities, setCities] = useState<string[]>()

    const [state, setState] = useState<string>("SP")
    const [city, setCity] = useState<string>("São Paulo")

    // GET STATE
    useEffect(() => {
        const setFetchedStates = async () => {
            const statesFetched = await fetchStates()
            setStates(statesFetched)
        };

        setFetchedStates();
    }, []);

    // GET CITY
    useEffect(() => {
        const setfetchedCities = async (state: string) => {
            if (state) {
                const citiesFetched = await fetchCities(state)
                setCities(citiesFetched.sort());
            };
        }

        setfetchedCities(state);
    }, [state]);

    const handleSaveClick = (id:string) => {
        router.push(`/users/update/${id}`)
    };

    // SUBMIT FORM
    const onSubmit = async (data: any) => {

        try {
            setYupError("")
            // Valida os dados com o Yup
            if (!data.address.zipCode || !data.address.street || !data.address.city || !data.address.state) {
                delete data.address
            }

            data.role = "INVESTOR"
            data.email = user?.email

            await createUsersSchema.validate(data);

            data.birth = new Date(data.birth)

            const response = await axios.post(`http://localhost:8081/users/create`, data, {
                headers: {
                    'Content-Type': 'application/json' // Define o header Content-Type
                }
            });

            handleSaveClick(response.data.user.id)



        } catch (error: any) {
            if (error instanceof ValidationError) {
                setYupError(error.message)
            }
            console.log('error on submit')
            console.log(error)
        }
    };

    if (!user) {
        return (
            <Flex h='100%' w='100%' alignItems={'center'} justifyContent={'center'}>
                <Spinner boxSize={32}/>
            </Flex>
        )
    }
    if (!user.email) {
        return (
            <Flex  h='100%' w='100%' alignItems={'center'} justifyContent={'center'}>
                <Spinner boxSize={32}/>
            </Flex>
        )
    }

    return (
        <Flex w='100%'>
            <Flex w='100%' bgColor={'lightSide'} alignItems={'center'} justifyContent={'center'}>

                    <Flex flexDir={'column'} gap={8} px={8}>
                        {/* BEM VINDO E INSTRUÇÃO */}
                        <Flex flexDir={'column'} alignItems={'center'} justifyContent={'center'}>
                            <Flex fontSize={28} fontWeight={'semibold'}>
                                Criar sua conta
                            </Flex>
                            <Flex>
                                Insira seus dados para continuar
                            </Flex>
                        </Flex>

                        <ErrorInputComponent error={yupError} />
                        <form>
                            <Flex flexDir={'column'} gap={4}>

                                {/* Nome */}
                                <AuthInput
                                    key={"name"}
                                    isRequired={true}
                                    type='text'
                                    placeholder={'Nome completo'}
                                    label_top='Nome completo'
                                    register={register("name")}
                                />

                                {/* E-mail */}
                                <AuthInput
                                    key={"email"}
                                    value={user.email}
                                    disabled={true}
                                    isRequired={true}
                                    type='email'
                                    placeholder={'E-mail'}
                                    label_top='E-mail'
                                    register={register("email")}
                                />

                                {/* Telefone e Gênero */}
                                <Flex mt={4} w='100%' gap={8}>

                                    {/* Telefone */}
                                    <Flex>
                                        <AuthInput
                                            key={"phoneNumber"}
                                            isRequired={true}
                                            type='tel'
                                            placeholder={'Telefone'}
                                            label_top='Número de telefone'
                                            register={register("phoneNumber")}
                                        />

                                    </Flex>

                                    {/* Gênero */}
                                    <Flex>
                                        <AuthSelectInput
                                            key={"gender"}
                                            isRequired={true}
                                            options={genderOptions}
                                            label_top='Gênero'
                                            placeholder='Selecione'
                                            register={register("gender")}
                                        />
                                    </Flex>

                                    {/* CPF */}
                                    <Flex>
                                        <AuthInput
                                            key={"phoneNumber"}
                                            isRequired={true}
                                            type='number'
                                            placeholder={'CPF'}
                                            label_top='CPF'
                                            register={register("cpf")}
                                        />

                                    </Flex>

                                </Flex>


                                {/* Profissão, Data de nascimento e CPF */}
                                <Flex mt={4} alignItems={'center'} gap={6}>

                                    {/* Profissão */}
                                    <AuthInput
                                        key={"profession"}
                                        isRequired={true}
                                        type='text'
                                        placeholder={'Ex: Engenheiro Mecânico'}
                                        label_top='Sua profissão'
                                        register={register("profession")}
                                    />
                                    {/* Data de nascimento */}
                                    <AuthInput
                                        key={"birth"}
                                        isRequired={true}
                                        type='date'
                                        placeholder={""}
                                        label_top='Data de Nascimento'
                                        register={register("birth")}
                                    />

                                    {/* Nome de usuário */}
                                    <AuthInput
                                        key={"username"}
                                        isRequired={true}
                                        type='text'
                                        placeholder={'Ex: joaopedro98'}
                                        label_top='Nome de usuário'
                                        register={register("username")}
                                    />
                                </Flex>

                                {/* Numero, Complemento e Bairro */}
                                <Flex mt={4} alignItems={'center'} gap={8}>

                                    <Flex maxW={72} gap={8}>
                                        <AuthInput
                                            key={"number"}
                                            isRequired={true}
                                            type='number'
                                            placeholder={'Ex: 456'}
                                            label_top='Número'
                                            register={register("address.number")}
                                        />


                                    </Flex>
                                    <Flex maxW={72} gap={8}>
                                        <AuthInput
                                            key={"complement"}
                                            isRequired={false}
                                            type='text'
                                            placeholder={'Ex: Bloco 1'}
                                            label_top='Complemento'
                                            register={register("address.zipCode")}
                                        />


                                    </Flex>
                                    <Flex maxW={72} gap={8}>
                                        <AuthInput
                                            key={"district"}
                                            isRequired={true}
                                            type='Bairro'
                                            placeholder={'Ex: Tatuapé'}
                                            label_top='Bairro'
                                            register={register("address.district")}
                                        />


                                    </Flex>

                                </Flex>

                                {/* CEP, Estado e Cidade */}
                                <Flex mt={4} alignItems={'center'} gap={8}>

                                    <Flex maxW={72} gap={8}>
                                        <AuthInput
                                            key={"zipCode"}
                                            isRequired={true}
                                            type='text'
                                            placeholder={'XXXXX-XXX'}
                                            label_top='CEP'
                                            register={register("address.zipCode")}
                                        />

                                        <AuthSelectInput
                                            key={"state"}
                                            isRequired={true}
                                            state={state}
                                            setState={setState}
                                            options={states ?? []}
                                            label_top='Estado'
                                            placeholder='Selecione'
                                            register={register("address.state")}
                                        />
                                    </Flex>

                                    <Flex >
                                        <AuthSelectInput
                                            key={"city"}
                                            isRequired={true}
                                            state={city}
                                            setState={setCity}
                                            options={cities ?? []}
                                            label_top='Cidade'
                                            placeholder='Selecione'
                                            register={register("address.city")}
                                        />
                                    </Flex>

                                </Flex>

                                {/* Endereço */}
                                <Flex w='100%' pt={2}>
                                    <AuthInput
                                        key={"address"}
                                        isRequired={true}
                                        type='text'
                                        placeholder={"Av. Exemplo dos Santos, 456"}
                                        label_top='Endereço'
                                        register={register("address.street")}
                                    />
                                </Flex>

                                {/* Senha e confirme sua senha */}
                                {/* <Flex w='100%' pt={2} gap={8}>
                                <AuthInput
                                    key={"password"}
                                    type='password'
                                    placeholder={'********'}
                                    label_top='Nova senha'
                                    register={register("password")}
                                />

                                <AuthInput
                                    key={"password-confirm"}
                                    type='password'
                                    placeholder={'********'}
                                    label_top='Confirmar nova senha'
                                    register={register("conrifmPassword")}
                                />

                            </Flex> */}


                                <Flex w='100%' gap={4}>
                                    <Button w='100%' onClick={() => { console.log("save and redirect to test investor profile") }} fontSize={14} color={'lightSide'} fontWeight={'light'} bgColor={'redSide'} mt={4} >
                                        Descobrir seu perfil de investidor
                                    </Button>
                                    <Button onClick={handleSubmit(onSubmit)} fontSize={14} color={'lightSide'} fontWeight={'light'} bgColor={'darkSide'} mt={4} minW={48}>
                                        Salvar e ir para o painel
                                    </Button>
                                </Flex>
                            </Flex>
                        </form>
                    </Flex>
            </Flex>
        </Flex>
    )
}