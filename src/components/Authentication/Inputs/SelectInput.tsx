import { FormControl, FormLabel, Select } from "@chakra-ui/react";
import { CaretDown, Key } from "phosphor-react";
import { Dispatch, SetStateAction } from "react";
import { UseFormRegisterReturn } from "react-hook-form";


interface SelectInputProps {
    options: string[]
    label_top: string,
    placeholder: string,
    register: UseFormRegisterReturn<any>;
    isRequired?:boolean
    // errors: any,
    // fieldName: string,
    label_bottom?: string,
}

export function SelectInput({
    options,
    label_top,
    placeholder,
    register,
    label_bottom
}: SelectInputProps) {

    return (
        <FormControl>

            <FormLabel fontWeight={'semibold'} fontSize={'sm'}>
                {label_top}
            </FormLabel>


            <Select
                {...register}
                h={10}
                isRequired={true}
                cursor={'pointer'}
                icon={<CaretDown/> }
                placeholder={placeholder}
                border='1px solid'
                borderColor={'inputBorder'}
                borderRadius={6}
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