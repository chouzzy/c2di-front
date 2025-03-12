
import { Badge, Button, Flex, Tag, TagCloseButton, TagLabel, Text, useColorModeValue } from "@chakra-ui/react";
import { FieldValues, useForm, UseFormRegister } from "react-hook-form";
import { FaCameraRetro } from "react-icons/fa";
import { Dispatch, SetStateAction, useState } from "react";
import { v4 as uuidv4 } from 'uuid'
import { ErrorInputComponent } from "@/components/ErrorInputComponent";
import { ValidationError } from "yup";
import { TipologiesState } from "@/components/CreateProjects/CreateProjectForm.";
import { TipologiesFileInput, TipologiesInput } from "@/components/CreateProjects/Inputs/TipologiesInputs";
import { tipologiesSchema } from "@/components/CreateProjects/CreateProjectPages/validations";

interface PersonalDataAndGoalsProps {
    tipologies: Tipologies[]
    newTipologies: TipologiesState[]
    setNewTipologies: Dispatch<SetStateAction<TipologiesState[]>>
    projectData:Investment
    setProjectData: Dispatch<SetStateAction<Investment | null>>
}

interface AddTipologyAttributeProps {
    name?: string
    image?: File | null
    description?: string
    rooms?: string
    suits?: string
    bathrooms?: string
    parkingSpaces?: string
    area?: string
    tags?: string
}

export function TipologiasForm({ tipologies, newTipologies, setNewTipologies, projectData, setProjectData }: PersonalDataAndGoalsProps) {

    const { register: registerOnPageFour, handleSubmit, formState: { errors }, reset:tipoReset } = useForm({});

    const bgButtonColor = useColorModeValue('darkSide', 'dark.lightSide')

    const [yupError, setYupError] = useState<string>("")

    const [name, setName] = useState<string | undefined>()
    const [image, setImage] = useState<File | null>(null)
    const [description, setDescription] = useState<string | undefined>()
    const [rooms, setRooms] = useState<string | undefined>()
    const [suits, setSuits] = useState<string | undefined>()
    const [bathrooms, setBathrooms] = useState<string | undefined>()
    const [parkingSpaces, setParkingSpaces] = useState<string | undefined>()
    const [area, setArea] = useState<string | undefined>()
    const [tags, setTags] = useState<string | undefined>()

    const addTipologyAttributes = async (data: AddTipologyAttributeProps) => {

        if (!image || !name) {
            setYupError('Título e imagem necessários');
            return
        }

        const tagsArray = tags?.split(";")

        let tipology: TipologiesState = {
            id: uuidv4(),
            name: name,
            image: image,
            description: description,
            rooms: rooms ? Number(rooms) : undefined,
            suits: suits ? Number(suits) : undefined,
            bathrooms: bathrooms ? Number(bathrooms) : undefined,
            parkingSpaces: parkingSpaces ? Number(parkingSpaces) : undefined,
            area: area ? Number(area) : undefined,
            tags: tagsArray ?? []

        }

        setName("");
        setImage(null);
        setDescription("");
        setRooms("");
        setSuits("");
        setBathrooms("");
        setParkingSpaces("");
        setArea("");
        setTags("");

        try {
            await tipologiesSchema.validate(tipology)

            setNewTipologies(prevTipologies => [...(prevTipologies || []), tipology]);
            tipoReset()
            setYupError("")

        } catch (error) {
            // Se a validação falhar (chega aqui)
            if (error instanceof ValidationError) {
                setYupError(error.message); // Define as mensagens de erro
            } else {
                // Outro tipo de erro
                setYupError("Ocorreu um erro inesperado.");
            }
        }
    };


    const handleRemoveNewTipology = (id: string) => {
        setNewTipologies(newTipologies.filter((tipology) => tipology.id !== id));
    }
    const handleRemoveTipology = (id: string) => {
        const tip = projectData.tipologies.filter((tipology) => tipology.id !== id);
        setProjectData({...projectData, tipologies:tip})
    }



    return (
        <Flex flexDir={'column'} gap={2}>
            <Flex w='100%' justifyContent={'center'} mb={8}>
                <Text fontSize={18} fontWeight={'medium'} borderBottom='1px' borderColor={'darkSide'} textTransform={'uppercase'} >
                    Tipologias
                </Text>
            </Flex>

            <ErrorInputComponent error={yupError} />


            <Flex w='100%' flexDir={['column']}>
                <Flex flexDir={'column'} gap={4}>

                    <TipologiesInput
                        register={registerOnPageFour("name")}
                        isRequired={tipologies.length > 0 ? false : true}
                        type="text"
                        title="Nome da tipologia"
                        placeholder="Ex: Apartamento 100m² - 3 Quartos (2 Suítes)" stateValue={name} stateChanger={setName} />

                    <TipologiesInput
                        register={registerOnPageFour("description")}
                        isRequired={false}
                        type="text"
                        title="Descrição da tipologia"
                        placeholder="Ex: Apartamento espaçoso de 100m² com 3 quartos, sendo 2 suítes, ideal para famílias que buscam conforto e privacidade."
                        stateValue={description} stateChanger={setDescription} />

                    <Flex gap={2}>
                        <TipologiesInput
                            register={registerOnPageFour("rooms")}
                            isRequired={false}
                            type="number"
                            title="Quartos"
                            placeholder="Ex: 4" stateValue={rooms} stateChanger={setRooms} />
                        <TipologiesInput
                            register={registerOnPageFour("suits")}
                            isRequired={false}
                            type="number"
                            title="Suítes"
                            placeholder="Ex: 2" stateValue={suits} stateChanger={setSuits} />
                        <TipologiesInput
                            register={registerOnPageFour("bathrooms")}
                            isRequired={false}
                            type="number"
                            title="Banheiros"
                            placeholder="Ex: 3" stateValue={bathrooms} stateChanger={setBathrooms} />
                        <TipologiesInput
                            register={registerOnPageFour("parkingSpaces")}
                            isRequired={false}
                            type="number"
                            title="Vagas"
                            placeholder="Ex: 1" stateValue={parkingSpaces} stateChanger={setParkingSpaces} />
                        <TipologiesInput
                            register={registerOnPageFour("area")}
                            isRequired={tipologies.length > 0 ? false : true}
                            type="number"
                            title="Metragem (m²)"
                            placeholder="Ex: 42" stateValue={area} stateChanger={setArea} />
                    </Flex>

                    <TipologiesInput
                        register={registerOnPageFour("tags")}
                        isRequired={false}
                        type="text"
                        title="Tags"
                        placeholder="Ex: VARANDA; CHURRASQUEIRA; VAGA LIVRE DE GARAGEM; BANHEIRA" stateValue={tags} stateChanger={setTags} />


                    <TipologiesFileInput
                        key={"DESTAQUES"}
                        isRequired={tipologies.length > 0 ? false : true}
                        allowedTypes={['image/png', 'image/jpeg', 'image/jpg']}
                        accept="image/*"
                        label_top='Imagem da tipologia'
                        icon={<FaCameraRetro color={'black'} size={20} />}
                        multiple={false}
                        stateChanger={setImage}
                    />

                    <Flex gap={2}>
                        <Button
                            bgColor={bgButtonColor}
                            color={'lightSide'}
                            size='sm'
                            onClick={() => { addTipologyAttributes({ name, area, bathrooms, description, parkingSpaces, rooms, suits, tags, image }) }}
                        > Adicionar tipologia </Button>
                        {newTipologies.map((tip) => {

                            return (

                                <Tag
                                    key={tip.id}
                                    size={'sm'}
                                    borderRadius='full'
                                    variant='solid'
                                    colorScheme='blue'
                                >
                                    <TagLabel px={2}>{tip.name}</TagLabel>
                                    <TagCloseButton onClick={() => handleRemoveNewTipology(tip.id)} />
                                </Tag>
                            )
                        })}

                    </Flex>
                    <Flex gap={2} flexDir={'column'}>
                        <Flex>
                            <Text fontWeight={'semibold'} fontSize={'sm'}>Tipologias já cadastradas:</Text>
                        </Flex>
                        <Flex gap={2}>
                            {projectData.tipologies.map((tip) => {

                                return (

                                    <Tag
                                        key={tip.id}
                                        size={'md'}
                                        py={2}
                                        borderRadius='full'
                                        variant='solid'
                                        colorScheme='gray'
                                    >
                                        <TagLabel px={2}>{tip.name}</TagLabel>
                                        <TagCloseButton onClick={() => handleRemoveTipology(tip.id)} />
                                    </Tag>
                                )
                            })}
                        </Flex>

                    </Flex>
                </Flex>

            </Flex>
            {/* Documentos */}
            {/* <Flex mt={4} alignItems={'center'} gap={8} w='100%' flexDir={['column']}>

                <Flex w='100%'>
                    <ProjectFileInput
                        key={"documents"}
                        isRequired={false}
                        allowedTypes={['application/pdf']}
                        accept="application/pdf"
                        label_top='Documentos (PDF)'
                        register={register("document")}
                    />
                </Flex>

            </Flex> */}
        </Flex>
    )

}