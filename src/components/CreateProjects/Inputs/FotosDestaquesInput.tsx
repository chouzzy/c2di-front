import { Flex, FormControl, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ErrorInputComponent } from "@/components/ErrorInputComponent";
import { changePrismaProjectFotos } from "@/app/services/changeFotos";



interface FotosInputProps {
    allowedTypes: string[],
    accept: string,
    projectData: Investment
}



export function FotosDestaquesInput({ allowedTypes, accept, projectData }: FotosInputProps
) {
    const [selectedFiles, setSelectedFiles] = useState<FileList | undefined>();
    const [updatingFile, setUpdatingFile] = useState(false);
    const [error, setError] = useState('');


    useEffect(() => {

        const uploadFotos = async (updateData: Investment) => {

            try {
                console.log('updateData')
                console.log(updateData)

                const response = await changePrismaProjectFotos(projectData.id, updateData)
                window.location.reload()

            } catch (error) {
                console.error('Erro ao fazer upload da capa')
                console.error(error)
            }

        }

        if (selectedFiles && updatingFile) {

            for (let index = 0; index < selectedFiles.length; index++) {
                projectData.images.push({
                    id: 'newimage',
                    label: 'DESTAQUES',
                    url: selectedFiles[index].name,
                    description: selectedFiles[index].name
                })
            }

            uploadFotos(projectData)
            setUpdatingFile(false)
        }

    }, [updatingFile])

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
                multiple={true}
                borderColor={'#00000000'}
                accept={accept}

            />

        </FormControl>
    )
}
