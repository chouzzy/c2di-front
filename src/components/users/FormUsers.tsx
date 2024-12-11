import {
    Flex,
    Button,
} from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { updateUsersSchema } from '@/schemas/usersSchema';
import { ErrorInputComponent } from '../ErrorInputComponent';
import { ValidationError } from 'yup';
import moment from 'moment';
import { StaticProfile } from './StaticProfile';
import { UsersInput } from './UsersInput';
import { UsersSelectInput } from './UsersSelectInput';
import { genderOptions } from './utils';
import { useRouter } from 'next/navigation';
import { fetchCities, fetchStates } from '@/app/services/ibge';
import { SpinnerFullScreen } from '../Loading/SpinnerFullScreen';
import { api } from '@/app/services/axios';

interface FormUsersProps {
    userData: User | null
}

function FormUsers({ userData }: FormUsersProps) {

    const { register, handleSubmit, formState: { errors } } = useForm({});

    const [states, setStates] = useState<string[]>()
    const [cities, setCities] = useState<string[]>()

    const [state, setState] = useState<string>("SP")
    const [city, setCity] = useState<string>("São Paulo")

    const [yupError, setYupError] = useState<string>("")

    const [editMode, setEditMode] = useState(false); // Estado para controlar o modo de edição

    const handleEditClick = () => {
        setEditMode(true); // Ativa o modo de edição
    };

    const handleSaveClick = () => {
        window.location.reload();
    };


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


    if (!userData) {
        return <SpinnerFullScreen />
    }

    // SUBMIT FORM
    const onSubmit = async (data: any) => {

        try {
            // Valida os dados com o Yup
            if (!data.address.zipCode || !data.address.street || !data.address.city || !data.address.state) {
                delete data.address
            }
            await updateUsersSchema.validate(data);

            data.birth = new Date(data.birth)




            const response = await api.put(`users/update/${userData.id}`, data, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json' // Define o header Content-Type
                }
            });
            console.log(response)
            handleSaveClick()


        } catch (error: any) {
            if (error instanceof ValidationError) {
                setYupError(error.message)
            }
        }
    };



    return (
        <Flex w='100%' flexDirection="column" gap={2}>

            <ErrorInputComponent error={yupError} />
            <form>

                {/* Nome */}
                {editMode ?
                    <UsersInput
                        key={"name"}
                        type='text'
                        placeholder={'Nome completo'}
                        label_top='Nome completo'
                        defaultValue={userData.name}
                        label_bottom='O nome que será exibido no seu perfil e para os gerentes dos seus investimentos.'
                        register={register("name")}
                    />
                    :
                    <StaticProfile type='Nome completo' data={userData.name} />
                }

                {/* E-mail */}
                {editMode ?
                    <UsersInput
                        key={"email"}
                        type='email'
                        placeholder={'E-mail'}
                        label_top='E-mail'
                        defaultValue={userData.email}
                        label_bottom='O e-mail cadastrado para você acessar sua conta. Não pode ser alterado.'
                        register={register("email")}
                    />
                    :

                    <StaticProfile type='E-mail' data={userData.email} />
                }

                {/* Telefone e Gênero */}
                <Flex mt={4} w='100%' gap={8}>

                    {/* Telefone */}
                    <Flex>
                        {editMode ?
                            <UsersInput
                                key={"phoneNumber"}
                                type='tel'
                                placeholder={'Telefone'}
                                label_top='Número de telefone'
                                defaultValue={userData.phoneNumber}
                                label_bottom='Telefone para que seus gerentes entrem em contato.'
                                register={register("phoneNumber")}
                            />
                            :

                            <StaticProfile type='Telefone' data={userData.phoneNumber} />
                        }
                    </Flex>

                    {/* Gênero */}
                    <Flex>
                        {editMode ?
                            <UsersSelectInput
                                key={"gender"}
                                options={genderOptions}
                                defaultValue={userData.gender}
                                label_top='Gênero'
                                label_bottom='O gênero com o qual você se identifica.'
                                placeholder='Selecione'
                                register={register("gender")}
                            />
                            :
                            <StaticProfile type='Gênero' data={userData.gender} />
                        }
                    </Flex>


                </Flex>


                {/* Profissão, Data de nascimento e CPF */}
                <Flex mt={4} alignItems={['start', 'start', 'start', 'center', 'center']} gap={6} flexDir={['column', 'column', 'row', 'row', 'row']}>

                    {/* Profissão */}
                    {editMode ?
                        <UsersInput
                            key={"profession"}
                            type='text'
                            placeholder={'Gerente financeiro'}
                            label_top='Sua profissão'
                            defaultValue={userData.profession}
                            register={register("profession")}
                        />
                        :

                        <StaticProfile type='Profissão' data={userData.profession} />
                    }
                    {/* Data de nascimento */}
                    {editMode ?
                        <UsersInput
                            key={"birth"}
                            type='date'
                            placeholder={""}
                            label_top='Data de Nascimento'
                            defaultValue={moment(new Date(userData.birth).toLocaleDateString("pt-br"), 'DD/MM/YYYY').format('YYYY-MM-DD')}
                            register={register("birth")}
                        />
                        :
                        <StaticProfile type='Data de nascimento' data={new Date(userData.birth).toLocaleDateString("pt-br")} />
                    }

                    {/* Nome de usuário */}
                    {editMode ?
                        <UsersInput
                            key={"username"}
                            type='text'
                            placeholder={'Ex: joaopedro98'}
                            label_top='Nome de usuário'
                            defaultValue={userData.username}
                            register={register("username")}
                        />
                        :
                        <StaticProfile type='Nome de usuário' data={userData.username} />
                    }
                </Flex>

                {/* CEP, Estado e Cidade */}
                <Flex mt={4} alignItems={['start', 'start', 'start', 'center', 'center']} gap={8} flexDir={['column', 'column', 'row', 'row', 'row']}>

                    <Flex maxW={72} gap={8}>
                        {editMode ?
                            <UsersInput
                                key={"zipCode"}
                                type='text'
                                placeholder={'XXXXX-XXX'}
                                label_top='CEP'
                                defaultValue={(userData.address && userData.address.zipCode) ?? ""}
                                register={register("address.zipCode")}
                            />
                            :
                            <StaticProfile type='CEP' data={(userData.address && userData.address.zipCode) ?? "Não informado"} />
                        }

                        {editMode ?
                            <UsersSelectInput
                                key={"state"}
                                state={state}
                                setState={setState}
                                options={states ?? []}
                                label_top='Estado'
                                placeholder='Selecione'
                                defaultValue={(userData.address && userData.address.state) ?? ""}
                                register={register("address.state")}
                            />
                            :
                            <StaticProfile type='Estado' data={(userData.address && userData.address.state) ?? "Não informado"} />
                        }
                    </Flex>

                    <Flex >
                        {editMode ?
                            <UsersSelectInput
                                key={"city"}
                                state={city}
                                setState={setCity}
                                options={cities ?? []}
                                label_top='Cidade'
                                placeholder='Selecione'
                                defaultValue={(userData.address && userData.address.city) ?? ""}
                                register={register("address.city")}
                            />
                            :
                            <StaticProfile type='Cidade' data={(userData.address && userData.address.city) ?? "Não informado"} />
                        }
                    </Flex>

                </Flex>

                {/* Endereço */}
                <Flex w='100%'>
                    {editMode ?
                        <UsersInput
                            key={"address"}
                            type='text'
                            placeholder={"Av. Exemplo dos Santos, 456"}
                            label_top='Endereço'
                            defaultValue={(userData.address && userData.address.street) ?? ""}
                            register={register("address.street")}
                        />
                        :

                        <StaticProfile type='Endereço' data={(userData.address && userData.address.street) ?? "Não informado"} />
                    }
                </Flex>


                {editMode ?
                    <Button onClick={handleSubmit(onSubmit)} color={'lightSide'} fontWeight={'light'} bgColor={'darkSide'} mt={4} maxW={40}>
                        Salvar dados
                    </Button>
                    :
                    <Button color='lightSide' bgColor="redSide" onClick={handleEditClick} mt={4} maxW={40}>
                        Editar
                    </Button>
                }

            </form>

        </Flex>
    );
}

export default FormUsers
