import { Flex, FormControl, FormLabel, Select } from "@chakra-ui/react";
import { register } from "module";
import { Dispatch, SetStateAction } from "react";
import { UseFormRegister, UseFormRegisterReturn } from "react-hook-form";
import { ErrorInputComponent } from "../ErrorInputComponent";


interface UsersSelectInputProps {
    options: string[]
    label_top: string,
    placeholder: string,
    register: UseFormRegisterReturn<any>;
    defaultValue: string,
    // errors: any,
    // fieldName: string,
    label_bottom?: string,
    state?: string,
    setState?: Dispatch<SetStateAction<string>>,
    city?: string,
    setCity?: Dispatch<SetStateAction<string>>,
}

export function UsersSelectInput({
    options,
    label_top,
    placeholder,
    register,
    defaultValue,
    state,
    setState,
    city,
    setCity,
    label_bottom
}: UsersSelectInputProps) {

    return (
        <FormControl>

            <FormLabel fontWeight={'semibold'} fontSize={'sm'}>
                {label_top}
            </FormLabel>


            <Select
                {...register}
                cursor={'pointer'}
                h={10}
                icon={<></>}
                onChange={(event) => {
                    setState ? setState(event.target.value) : "";
                    setCity ? setCity(event.target.value) : "";
                }}
                placeholder={placeholder}
                border='1px solid'
                borderColor={'inputBorder'}
                borderRadius={6}
                defaultValue={defaultValue}
            >

                {options.map((option, i) => {
                    return (

                        <option key={i + option} value={option}>{option}</option>
                    )
                })}

            </Select>

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