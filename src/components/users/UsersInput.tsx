import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { UseFormRegisterReturn } from "react-hook-form";
import { ErrorInputComponent } from "../ErrorInputComponent";

interface UsersInputProps {
    label_top: string,
    type: string,
    placeholder: string,
    defaultValue?: string,
    // errors: any
    // fieldName: string
    register: UseFormRegisterReturn<any>
    maxWidth?: string | number
    label_bottom?: string
}

export function UsersInput({ label_top, type, placeholder, defaultValue, register, maxWidth, label_bottom }: UsersInputProps
) {

    return (

        <FormControl w='100%'>


            <FormLabel fontWeight={'semibold'} fontSize={'sm'}>
                {label_top}
            </FormLabel>

            <Input {...register}
                w='100%'
                maxW={maxWidth ?? '100%'}
                px={4}
                py={2}
                border='1px solid'
                borderColor={'inputBorder'}
                borderRadius={6}
                type={type}
                placeholder={placeholder}
                defaultValue={defaultValue??undefined} />

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