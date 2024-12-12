import { Flex, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { ErrorInputComponent } from "@/components/ErrorInputComponent";
import { ArrowArcLeft } from "phosphor-react";
import { changePrismaProjectCapa } from "@/app/services/changeCapa";
import axios from "axios";



interface UsersInputProps {
    allowedTypes: string[],
    accept: string,
    projectData: Investment
}



export function CapaInput({ allowedTypes, accept, projectData }: UsersInputProps
) {
    const [selectedFile, setSelectedFile] = useState<File>();
    const [updatingFile, setUpdatingFile] = useState(false);
    const [error, setError] = useState('');


    useEffect(() => {

        const updateCapa = async (updateData: Investment, selectedFile: File) => {

            try {

                const formData = new FormData();

                formData.append('file', selectedFile);

                formData.append('projectId', projectData.id);

                // Faz a requisição POST usando Axios
                const responseFiles = await axios.post('/api/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data', // Define o Content-Type para upload de arquivos
                    },
                });

                const imageToDelete = projectData.images[0]

                if (!imageToDelete) {
                    console.warn(`Imagem de capa não encontrada no array destaques`);
                    return;
                }

                const responseImgDeleted = await axios.post('/api/delete-image', { 
                    imageUrl: imageToDelete.url 
                  });
                const imageUrls = responseFiles.data.imageUrls;

                projectData.images[0].label = 'DESTAQUES'
                projectData.images[0].url = imageUrls[0]
                projectData.images[0].description = selectedFile.name

                const response = await changePrismaProjectCapa(projectData.id, updateData)

                window.location.reload()
            } catch (error) {
                console.error('Erro ao fazer upload da capa')
                console.error(error)
            }

        }

        if (selectedFile && updatingFile) {


            updateCapa(projectData, selectedFile)
            setUpdatingFile(false)
        }

    }, [updatingFile])

    const handleFileChange = (event: any) => {

        setError("")

        const files = event.target.files;


        if (!files) {
            return
        }

        if (files[0]) {

            const maxSize = 50 * 1024 * 1024; // 5 MB
            const selectedFilesArray = Array.from(files);

            if (!allowedTypes.includes(files[0].type)) {
                setError('Formato de um ou mais arquivos inválidos');
                event.target.value = null; // Limpa o valor do input
                return;
            }

            if (files[0].size > maxSize) {
                setError('O arquivo excede o tamanho máximo de 5MB.');
                event.target.value = null; // Limpa o valor do input
                return;
            }

            if (selectedFilesArray.length > 10) {
                setError('Você pode selecionar no máximo 10 arquivos.');
                event.target.value = null;
                // Enviar o arquivo para o servidor
            }

            setSelectedFile(files[0]);
            setUpdatingFile(true)

        }
    }

    return (

        <FormControl w='100%'>

            <Flex pb={4}>
                <ErrorInputComponent error={error} />
            </Flex>

            <Input
                className="classer"
                type={'file'}
                onChange={handleFileChange}
                bgColor={'white'}
                w={36}
                h={8}
                multiple={false}
                borderColor={'#00000000'}
                accept={accept}

            />

        </FormControl>
    )
}
