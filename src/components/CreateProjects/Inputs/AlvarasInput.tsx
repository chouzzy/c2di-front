import { ErrorInputComponent } from "@/components/ErrorInputComponent";
import { Flex, FormControl, FormLabel, Input, InputAddonProps, Text, useColorModeValue } from "@chakra-ui/react";
import { Dispatch, HTMLInputTypeAttribute, SetStateAction, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";


interface TipologiesInputProps {
    type: HTMLInputTypeAttribute
    title: string
    placeholder: string
    isRequired: boolean
    register: UseFormRegisterReturn<any>
}



export function AlvarasInput({ type, title, placeholder, register, isRequired }: TipologiesInputProps) {

    const color = useColorModeValue('darkSide', 'dark.lightSide')

    return (
        <FormControl w='100%'>


            {/* <FormLabel pl={4} fontWeight={'semibold'} fontSize={'sm'}>
                {title}
            </FormLabel> */}
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
