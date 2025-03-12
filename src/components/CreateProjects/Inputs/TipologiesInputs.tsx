import { ErrorInputComponent } from "@/components/ErrorInputComponent";
import { Flex, FormControl, FormLabel, Input, Text, useColorModeValue } from "@chakra-ui/react";
import { color } from "framer-motion";
import { Dispatch, HTMLInputTypeAttribute, SetStateAction, useState } from "react";
import { FieldValues, UseFormRegister, UseFormRegisterReturn } from "react-hook-form";


interface TipologiesInputProps {
    type: HTMLInputTypeAttribute
    title: string
    placeholder: string
    stateValue: string | undefined
    stateChanger: Dispatch<SetStateAction<string | undefined>>
    isRequired: boolean
    register: UseFormRegisterReturn<any>
}



export function TipologiesInput({ type, title, placeholder, stateChanger, stateValue, register, isRequired }: TipologiesInputProps) {

    const color = useColorModeValue('darkSide', 'dark.lightSide')

    return (
        <FormControl w='100%'>


            <FormLabel fontWeight={'semibold'} fontSize={'sm'}>
                {title}
            </FormLabel>
            <Input
                {...register}
                _placeholder={{ color: 'placeHolder', fontSize: 'sm' }}
                color={color}
                bgColor={'white'}
                isRequired={isRequired}
                w='100%'
                maxW={'100%'}
                border='1px solid'
                borderColor={'inputBorder'}
                borderRadius={6}
                type={type}
                placeholder={placeholder}
                onChange={(e) => { stateChanger(e.target.value) }}
            />
        </FormControl>
    )
}

interface TipologiesFileInputProps {
    label_top: string,
    allowedTypes: string[],
    accept: string,
    stateChanger: Dispatch<SetStateAction<File | null>>
    setSelectedFiles?: Dispatch<SetStateAction<FileList | undefined>>
    multiple?: boolean
    className?: string
    icon?: any,
    isRequired?: boolean,
    disabled?: boolean,
    defaultValue?: string,
    maxWidth?: string | number
    label_bottom?: string
}

export function TipologiesFileInput({ label_top, allowedTypes, accept, stateChanger, setSelectedFiles, className, multiple = true, icon, isRequired, disabled = false, maxWidth, label_bottom }: TipologiesFileInputProps
) {
    const [selectedFile, setSelectedFile] = useState(null);

    const [error, setError] = useState('');

    const handleFileChange = (event: any) => {

        setError("")

        if (setSelectedFiles) {
            setSelectedFiles(undefined)
        }

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
       
        if (stateChanger) {
            stateChanger(files[0])
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
                className={className ?? ''}
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
