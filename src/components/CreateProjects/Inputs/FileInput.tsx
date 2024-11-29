import { Flex, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { ErrorInputComponent } from "@/components/ErrorInputComponent";
import { ArrowArcLeft } from "phosphor-react";



interface UsersInputProps {
    label_top: string,
    allowedTypes: string[],
    accept: string,
    multiple?: boolean
    className?: string
    icon?: any,
    isRequired?: boolean,
    disabled?: boolean,
    defaultValue?: string,
    register: UseFormRegisterReturn<any>
    maxWidth?: string | number
    label_bottom?: string
}



export function ProjectFileInput({ label_top, allowedTypes, accept, className, multiple=true, icon, isRequired, disabled = false, register, maxWidth, label_bottom }: UsersInputProps
) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [error, setError] = useState('');

    const handleFileChange = (event: any) => {

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
                    setSelectedFile(files[index]);
                    // Enviar o arquivo para o servidor
                }
            };

        }
    }

    return (

        <FormControl w='100%'>

            <Flex pb={4}>
                <ErrorInputComponent error={error} />
            </Flex>

            <FormLabel fontWeight={'semibold'} fontSize={'sm'}>
                <Flex ml={4} gap={2} alignItems={'center'}>
                    <Text>{label_top}</Text>
                    <Flex> {icon}</Flex>

                </Flex>
            </FormLabel>

            <Input
                {...register}
                className={className?? ''}
                type={'file'}
                onChange={handleFileChange}
                bgColor={'white'}
                isRequired={isRequired}
                disabled={disabled}
                w='100%'
                maxW={maxWidth ?? '100%'}
                px={4}
                h={16}
                border='1px solid'
                borderRadius={6}
                multiple={multiple}
                borderColor={'#00000000'}
                accept={accept}

            />

            {label_bottom ?
                <FormLabel fontSize={12}>
                    {label_bottom}
                </FormLabel>
                :
                ""
            }

        </FormControl>
    )
}










{/* <div  {...register} {...getRootProps()}>
                <input  {...register} {...getInputProps()} />
                {
                    isDragActive ?
                        <p>Drop the files here ...</p> :
                        <p>Drag 'n' drop some files here, or click to select files</p>
                }
            </div> */}