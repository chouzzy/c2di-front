import { Flex, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { ErrorInputComponent } from "@/components/ErrorInputComponent";
import { ArrowArcLeft } from "phosphor-react";
import { changePrismaProjectCapa } from "@/app/services/changeCapa";
import axios from "axios";
import { uploadFotos, uploadFotoUnica } from "@/app/services/uploadPhotosDB";



interface UsersInputProps {
    allowedTypes: string[],
    accept: string,
    projectData: Investment
    setLoadingFiles: Dispatch<SetStateAction<boolean>>
    label: PhotosGroup["category"]
    setProjectData: Dispatch<SetStateAction<Investment | null>>
}



export function CapaInput({ allowedTypes, accept, projectData, setLoadingFiles, label, setProjectData }: UsersInputProps
) {
    const [selectedFiles, setSelectedFiles] = useState<FileList | undefined>();
    const [updatingFile, setUpdatingFile] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const handleUpload = async () => {
            if (!projectData || !selectedFiles) {
                setLoadingFiles(false);
                return;
            }

            try {
                setLoadingFiles(true)
                const projectUpdated = await uploadFotoUnica(projectData, projectData.id, label, selectedFiles)
                setProjectData(projectUpdated)

            } catch (error) {
                setError('Erro ao fazer upload das fotos'); // Define uma mensagem de erro para o usuário
            } finally {
                setLoadingFiles(false);
                setUpdatingFile(false)
            }
        }
        if (selectedFiles && updatingFile) {
            handleUpload();
        }
    }, [selectedFiles, setLoadingFiles]); // Dependências do useEffect


    const handleFileChange = (event: any) => {

        setSelectedFiles(undefined)
        setError("")

        const files = event.target.files;

        if (!files) {
            return
        }

        for (let index = 0; index < files.length; index++) {

            if (files[index]) {

                const maxSize = 50 * 1024 * 1024; // 5 MB
                const selectedFilesArray = Array.from(files);

                if (!allowedTypes.includes(files[index].type)) {
                    setError('Formato de um ou mais arquivos inválidos');
                    event.target.value = null; // Limpa o valor do input
                    return;
                }

                if (files[index].size > maxSize) {
                    setError('O arquivo excede o tamanho máximo de 5MB.');
                    event.target.value = null; // Limpa o valor do input
                    return;
                }

                if (selectedFilesArray.length > 10) {
                    setError('Você pode selecionar no máximo 10 arquivos.');
                    event.target.value = null;
                    return;
                }
            };
        }
        setSelectedFiles(files);
        setUpdatingFile(true);
    }


    return (

        <FormControl w='100%'>

            <Flex pb={4}>
                <ErrorInputComponent error={error} />
            </Flex>

            <Input
                className="fotos"
                type={'file'}
                onChange={handleFileChange}
                bgColor={'white'}
                w={48}
                h={12}
                multiple={false}
                borderColor={'#00000000'}
                accept={accept}

            />

        </FormControl>
    )
}
