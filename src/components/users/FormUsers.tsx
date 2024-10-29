import {
    Flex,
    Button,
} from '@chakra-ui/react';
import { UsersInput } from './UsersInput';
import { UsersSelectInput } from './UsersSelectInput';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"; // Importe o yupResolver
import { updateUsersSchema } from '@/pages/schemas/usersSchema';
ya
function FormUsers() {

    const genderOptions = ["Masculino", "Feminino", "Outro"]

    const [states, setStates] = useState<string[]>()
    const [cities, setCities] = useState<string[]>()

    const [state, setState] = useState<string>("")
    const [city, setCity] = useState<string>("")

    useEffect(() => {
        const fetchStates = async () => {
            const response = await axios( // Adicione o await aqui
                'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
            );

            let states: string[] = response.data.map((state: any) => {
                return state.sigla
            })

            states.sort()
            // const states = response.data; // Acesse os dados da resposta
            setStates(states)

        };

        fetchStates(); // Não precisa de await aqui, pois o useEffect não retorna nada
    }, []);

    useEffect(() => {
        const fetchCities = async (state: string) => {
            if (state) {
                const response = await axios(
                    `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/municipios`,
                );


                let cities: string[] = response.data.map((city: any) => {
                    return city.nome
                })
                setCities(cities.sort());
            };
        }

        fetchCities(state); // Não precisa de await aqui, pois o useEffect não retorna nada
    }, [state]);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(updateUsersSchema)
    });

    const onSubmit = (data:any) => console.log(data);

    return (
        <Flex w='100%' flexDirection="column" gap={2}>
            <form onSubmit={handleSubmit(onSubmit)}>

                {/* Nome */}
                <UsersInput
                    key={"nome"}
                    type='text'
                    placeholder='João da Silva Gomes'
                    label_top='Nome'
                    label_bottom='O nome que será exibido no seu perfil e para os gerentes dos seus investimentos.'
                    register={register("name")}
                />

                {/* E-mail */}
                <UsersInput
                    key={"email"}
                    type='email'
                    placeholder='joaodasilva@exemplo.com'
                    label_top='E-mail'
                    label_bottom='O e-mail cadastrado para você acessar sua conta. Não pode ser alterado.'
                    register={register("email")}
                />

                {/* Telefone e Gênero */}
                <Flex mt={4} w='100%' gap={8}>

                    {/* Telefone */}
                    <Flex>
                        <UsersInput
                            key={"telefone"}
                            type='tel'
                            placeholder="(11) 99999-9999"
                            label_top='Número de telefone'
                            label_bottom='Telefone para que seus gerentes entrem em contato.'
                            register={register("telefone")}
                        />
                    </Flex>

                    {/* Gênero */}
                    <Flex>
                        <UsersSelectInput
                            key={"gender"}
                            options={genderOptions}
                            label_top='Gênero'
                            label_bottom='O gênero com o qual você se identifica.'
                            placeholder='Selecione'
                            register={register("gender")}
                        />
                    </Flex>


                </Flex>


                {/* Profissão, Data de nascimento e CPF */}
                <Flex mt={4} alignItems={'center'} gap={6}>

                    {/* Profissão */}
                    <UsersInput
                        key={"profession"}
                        type='text'
                        placeholder='Engenheiro mecânico'
                        label_top='Sua profissão'
                        register={register("profession")}
                    />
                    {/* Data de nascimento */}
                    <UsersInput
                        key={"birth"}
                        type='date'
                        placeholder=''
                        label_top='Data de Nascimento'
                        register={register("birth")}
                    />

                    {/* CPF */}
                    <UsersInput
                        key={"cpf"}
                        type='text'
                        placeholder='111.111.111-11'
                        label_top='CPF'
                        register={register("cpf")}
                    />
                </Flex>

                {/* CEP, Estado e Cidade */}
                <Flex mt={4} alignItems={'center'} gap={8}>

                    <Flex maxW={64} gap={8}>
                        <UsersInput
                            key={"cep"}
                            type='text'
                            placeholder='111-1111'
                            label_top='CEP'
                            register={register("cep")}
                        />

                        <UsersSelectInput
                            key={"state"}
                            state={state}
                            setState={setState}
                            options={states ?? []}
                            label_top='Estado'
                            placeholder='Selecione'
                            register={register("state")}
                        />
                    </Flex>

                    <Flex >
                        <UsersSelectInput
                            key={"city"}
                            state={city}
                            setState={setCity}
                            options={cities ?? []}
                            label_top='Cidade'
                            placeholder='Selecione'
                            register={register("city")}
                            />
                    </Flex>

                </Flex>

                {/* Endereço */}
                <Flex w='100%'>
                    <UsersInput
                        key={"address"}
                        type='text'
                        placeholder='Av. Exemplo dos santos, 456'
                        label_top='Endereço'
                        register={register("address")}
                    />
                </Flex>

                <Button type='submit' color={'lightSide'} fontWeight={'light'} bgColor={'darkSide'} mt={4} maxW={40}>
                    Atualizar perfil
                </Button>


            </form>
        </Flex>
    );
}

export default FormUsers;