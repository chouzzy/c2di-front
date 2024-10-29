import { Flex, FormControl, FormLabel, Select } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";


interface UsersSelectInputProps {
    options: string[]
    label_top: string,
    placeholder: string,
    label_bottom?: string
    state?: string,
    setState?: Dispatch<SetStateAction<string>>,
    city?: string,
    setCity?: Dispatch<SetStateAction<string>>,
}

export function UsersSelectInput({
    options,
    label_top,
    placeholder,
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
                cursor={'pointer'}
                h={10}
                onChange={(event) => {
                    setState ? setState(event.target.value) : ""
                    setCity ? setCity(event.target.value) : ""
                }}
                icon={<></>}
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

            <FormLabel fontSize={12}>{label_bottom}</FormLabel>
        </FormControl>
    )
}