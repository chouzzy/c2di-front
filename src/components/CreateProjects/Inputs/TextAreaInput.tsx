import { FormControl, FormLabel, Input, Textarea, useColorModeValue } from "@chakra-ui/react";
import { UseFormRegisterReturn } from "react-hook-form";
interface UsersInputProps {
    label_top: string,
    placeholder: string,
    value?: string | number
    isRequired?: boolean,
    disabled?: boolean,
    defaultValue?: string,
    // errors: any
    // fieldName: string
    register: UseFormRegisterReturn<any>
    maxWidth?: string | number
    label_bottom?: string
}

export function TextAreaInput({ label_top, placeholder, value, isRequired, disabled = false, defaultValue, register, maxWidth, label_bottom }: UsersInputProps
) {

    const color = useColorModeValue('darkSide', 'dark.lightSide')
    return (

        <FormControl w='100%'>


            <FormLabel fontWeight={'semibold'} fontSize={'sm'}>
                {label_top}
            </FormLabel>

            <Textarea {...register}
                _placeholder={{ color: color }}
                bgColor={'white'}
                color={color}
                value={value ?? undefined}
                isRequired={isRequired}
                disabled={disabled}
                w='100%'
                maxW={maxWidth ?? '100%'}
                px={4}
                py={2}
                border='1px solid'
                borderColor={'inputBorder'}
                borderRadius={6}
                placeholder={placeholder}
                defaultValue={defaultValue ?? undefined} />

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