import { updateProjectFicha } from '@/app/services/updateProjectFicha/route';
import { floorPlanTypesAdapter, numbersAdapter, projectTypeAdapter, projectTypeReverseAdapter } from '@/app/services/utils';
import { AuthInput } from '@/components/Authentication/Inputs/AuthInput';
import { ProjectInput } from '@/components/CreateProjects/Inputs/ProjectInput';
import { ProjectSelectInput } from '@/components/CreateProjects/Inputs/SelectInput';
import { TextAreaInput } from '@/components/CreateProjects/Inputs/TextAreaInput';
import { StaticProject } from '@/components/users/StaticProject';
import { updateInvestmentSchema } from '@/schemas/investmentSchema';
import { updateUsersSchema } from '@/schemas/usersSchema';
import { Button, Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ValidationError } from 'yup';


interface ProjectDataProps {
    projectData: Investment
    userData: User
}

export function FichaTecnica({ userData, projectData }: ProjectDataProps) {

    const { register, handleSubmit, formState: { errors } } = useForm({});
    const [yupError, setYupError] = useState<string>("")
    const [editMode, setEditMode] = useState(false); // Estado para controlar o modo de edição
    const projectTypesDict = {
        RESIDENCIAL_MULTIFAMILIAR: "Residencial Multifamiliar",
        RESIDENCIAL_VERTICAL: "Residencial vertical",
        COMERCIAL_GERAL: "Comercial geral",
        MISTO: "Misto",
    };

    const handleEditClick = () => {
        setEditMode(true); // Ativa o modo de edição
    };


    const onSubmit = async (data: any) => {

        try {
            data = await projectTypeAdapter(data)
            data = await floorPlanTypesAdapter(data)
            await updateInvestmentSchema.validate(data);


            const response = await updateProjectFicha(projectData.id, data)
            console.log(response)

            window.location.reload()

        } catch (error: any) {
            console.error(error)
            if (error instanceof ValidationError) {
                setYupError(error.message)
            }
        }
    };

    return (


        <Flex w='100%' flexDir={'column'} py={8} gap={8}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Flex gap={8} flexDir={'column'} w='100%'>

                    {/* Dates */}
                    <Flex gap={12} w='100%'>
                        <Flex w='100%'>
                            {/* Title */}
                            {editMode ?
                                <ProjectInput
                                    defaultValue={projectData.title}
                                    key={"title"}
                                    isRequired={true}
                                    type='text'
                                    placeholder={'Projeto prédio residencial na praia'}
                                    label_top='Título do projeto'
                                    register={register("title")}
                                />
                                :
                                <StaticProject type='Nome do empreendimento' data={projectData.title} />
                            }
                        </Flex>
                        <Flex w='100%'>
                            {/* Description */}
                            {editMode ?
                                <TextAreaInput
                                    key={"description"}
                                    defaultValue={projectData.description}
                                    isRequired={true}
                                    placeholder={'Ex: Terrenos espaçosos para cosntrução de chácaras, sítios e pesqueiros'}
                                    label_top='Descrição do projeto'
                                    register={register("description")}
                                />
                                :
                                <StaticProject type='Descrição do projeto' data={projectData.description} />
                            }
                        </Flex>

                        <Flex w='100%'>

                            {/* Status da construção */}
                            {editMode ?
                                <ProjectSelectInput
                                    key={"buildingStatus"}
                                    isRequired={true}
                                    options={[
                                        'Lançamento', // Para projetos ainda não iniciados
                                        'Em construção',
                                        'Pronto para morar',
                                        'Parado',
                                    ]}
                                    placeholder={'Selecione'}
                                    label_top={'Status da construção'}
                                    register={register("buildingStatus")}
                                />
                                :
                                <StaticProject type='Status da construção' data={String(projectData.buildingStatus)} />
                            }
                        </Flex>
                    </Flex>

                    {/* Dates */}
                    <Flex gap={12} w='100%'>
                        <Flex w='100%'>
                            {/* Data de início da obra */}
                            {editMode ?
                                <ProjectInput
                                    key={"constructionStartDate"}
                                    isRequired={true}
                                    type='date'
                                    placeholder={'15-12-2028'}
                                    label_top='Data de início da obra. 🏁'
                                    register={register("constructionStartDate")}
                                />
                                :
                                <StaticProject type='Data de início da obra' data={new Date(projectData.constructionStartDate).toLocaleDateString("pt-br")} />
                            }
                        </Flex>
                        <Flex w='100%'>
                            {/* Data de entrega da obra */}
                            {editMode ?
                                <ProjectInput
                                    key={"expectedDeliveryDate"}
                                    isRequired={true}
                                    type='date'
                                    placeholder={'15-12-2028'}
                                    label_top='Expectativa de finalização da obra. 🎉'
                                    register={register("expectedDeliveryDate")}
                                />
                                :
                                <StaticProject type='Previsão de entrega da obra' data={new Date(projectData.expectedDeliveryDate).toLocaleDateString("pt-br")} />
                            }
                        </Flex>

                        <Flex w='100%'>

                            {/* Data de lançamento launchDate */}
                            {editMode ?
                                < ProjectInput
                                    key={"launchDate"}
                                    isRequired={true}
                                    type='date'
                                    placeholder={'15-12-2026'}
                                    label_top='Data de lançamento (dia do anúncio). 🔊'
                                    register={register("launchDate")}
                                />
                                :
                                <StaticProject type='Previsão de lançamento' data={new Date(projectData.launchDate).toLocaleDateString("pt-br")} />
                            }
                        </Flex>
                    </Flex>

                    {/* Tipo e nome da construtora */}
                    <Flex gap={12} w='100%'>

                        <Flex w='100%'>
                            {/* Tipo de projeto */}
                            {editMode ?
                                <ProjectSelectInput
                                    key={"projectType"}
                                    isRequired={true}
                                    options={['Residencial Multifamiliar', 'Residencial vertical', 'Comercial geral', 'Misto']}
                                    placeholder={'Selecione'}
                                    label_top='Tipo de projeto'
                                    register={register("projectType")}
                                />
                                :
                                <StaticProject type='Tipo do projeto' data={projectTypesDict[projectData.projectType]} />
                            }
                        </Flex>
                        <Flex w='100%'>
                            {/* Nome da construtora */}
                            {editMode ?
                                <AuthInput
                                    key={"companyName"}
                                    defaultValue={projectData.companyName}
                                    isRequired={true}
                                    type='string'
                                    placeholder={'Ex: LH Contruções'}
                                    label_top='Nome da construtora'
                                    register={register("companyName")}
                                />
                                :
                                <StaticProject type='Nome da construtora' data={projectData.companyName} />
                            }
                        </Flex>

                        <Flex w='100%'>
                            {/* Tipologia das plantas */}
                            {editMode ?
                                <ProjectInput
                                    key={"floorPlanTypes"}
                                    defaultValue={String(projectData.floorPlanTypes)}
                                    isRequired={true}
                                    type='string'
                                    placeholder={'Ex: 40,50,100'}
                                    label_top='Tipologia das plantas'
                                    register={register("floorPlanTypes")}
                                />
                                :
                                <StaticProject type='Tipologia das plantas' data={String(projectData.floorPlanTypes)} />
                            }
                        </Flex>


                    </Flex>

                    <Flex gap={12} w='100%'>

                        <Flex w='100%'>
                            {/* Número de unidade por pavimento */}
                            {editMode ?
                                < ProjectInput
                                    key={"unitsPerFloor"}
                                    isRequired={true}
                                    type='number'
                                    placeholder={'Ex: 8'}
                                    label_top='Unidades por pavimento'
                                    register={register("unitsPerFloor")}
                                />
                                :
                                <StaticProject type='Unidades por pavimento' data={String(projectData.unitsPerFloor)} />
                            }
                        </Flex>
                        <Flex w='100%'>
                            {/* Total de unidades */}
                            {editMode ?
                                <ProjectInput
                                    key={"totalUnits"}
                                    defaultValue={projectData.totalUnits}
                                    isRequired={true}
                                    type='number'
                                    placeholder={'Ex: 120'}
                                    label_top='Total de unidades'
                                    register={register("totalUnits")}
                                />
                                :
                                <StaticProject type='Total de unidades' data={String(projectData.totalUnits)} />
                            }
                        </Flex>

                        <Flex w='100%'>
                            {/* Número de pavimentos */}
                            {editMode ?
                                <ProjectInput
                                    key={"numberOfFloors"}
                                    defaultValue={projectData.numberOfFloors}
                                    isRequired={true}
                                    type='number'
                                    placeholder={'Ex: 12'}
                                    label_top='Total de pavimentos'
                                    register={register("numberOfFloors")}
                                />
                                :
                                <StaticProject type='Número de pavimentos' data={String(projectData.numberOfFloors)} />
                            }
                        </Flex>

                    </Flex>



                    <Flex gap={12} w='100%'>

                        <Flex w='100%'>
                            {/* 'Custo da fundação'*/}
                            {editMode ?
                                <ProjectInput
                                    key={"foundation"}
                                    defaultValue={projectData.predictedCost.foundation}
                                    isRequired={true}
                                    type='number'
                                    placeholder={'Ex: 73.422,00'}
                                    label_top='Custo estimado da fundação'
                                    register={register("predictedCost.foundation")}
                                />
                                :
                                <StaticProject dataType='MONEY' type='Custo estimado da fundação' data={String(projectData.predictedCost.foundation)} />
                            }
                        </Flex>
                        <Flex w='100%'>
                            {/* 'Custo da estrutura'*/}
                            {editMode ?
                                < ProjectInput
                                    key={"structure"}
                                    defaultValue={projectData.predictedCost.structure}
                                    isRequired={true}
                                    type='number'
                                    placeholder={'R$ 1.200,00/m²'}
                                    label_top='Custo estrutural estimado por [m²]'
                                    register={register("predictedCost.structure")}
                                />
                                :
                                <StaticProject dataType='AREA' type='Custo estrutural estimado por [m²]' data={String(projectData.predictedCost.structure)} />
                            }
                        </Flex>

                        <Flex w='100%'>
                            {/* 'Custo da implantação'*/}
                            {editMode ?
                                <ProjectInput
                                    defaultValue={projectData.predictedCost.implantation}
                                    key={"implantation"}
                                    isRequired={true}
                                    type='number'
                                    placeholder={'R$ 2.300/m²'}
                                    label_top='Custo estimado da implantação [m²]'
                                    register={register("predictedCost.implantation")}
                                />
                                :
                                <StaticProject dataType='AREA' type='Custo estimado da implantação [m²]' data={String(projectData.predictedCost.implantation)} />
                            }
                        </Flex>


                    </Flex>
                    <Flex w={80}>
                        {/* 'Custo da mão de obra'*/}
                        {editMode ?
                            < ProjectInput
                                key={"workmanship"}
                                defaultValue={projectData.predictedCost.workmanship}
                                isRequired={true}
                                type='number'
                                placeholder={'R$ 80.135,00'}
                                label_top='Custo estimado da mão de obra'
                                register={register("predictedCost.workmanship")}
                            />
                            :
                            <StaticProject dataType='MONEY' type='Custo estimado da fundação' data={String(projectData.predictedCost.workmanship)} />
                        }
                    </Flex>
                    {userData.role != 'ADMINISTRATOR' ?
                        '' :
                        <>
                            {editMode ?
                                <Button type='submit' color={'lightSide'} fontWeight={'light'} bgColor={'darkSide'} mt={4} maxW={40}>
                                    Salvar dados
                                </Button>
                                :
                                <Button color='lightSide' bgColor="redSide" onClick={handleEditClick} mt={4} maxW={40}>
                                    Editar
                                </Button>
                            }
                        </>
                    }
                </Flex>
            </form>
        </Flex>
    )
}