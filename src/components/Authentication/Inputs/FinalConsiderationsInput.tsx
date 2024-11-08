import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { UseFormRegisterReturn } from "react-hook-form";
interface UsersInputProps {
    label_top: string,
    type?: string,
    placeholder?: string,
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

export function FinalConsiderationsInput({ label_top, register }: UsersInputProps) {

    return (
        <FormControl w="100%" isRequired={true}>
            <FormLabel>{label_top}</FormLabel>

            <Input
                {...register}
                type="text"
                bgColor={'white'}
                w='100%'
                px={4}
                py={2}
                border='1px solid'
                borderColor={'inputBorder'}
                borderRadius={6}
                placeholder={'Alguma consideração final? Digite aqui...'}
                />
        </FormControl>
    );
}