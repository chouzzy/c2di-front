import { FormControl, FormLabel, Input } from "@chakra-ui/react";

interface UsersInputProps {
    label_top: string,
    type: string,
    placeholder: string,
    maxWidth?: string | number
    label_bottom?: string
}

export function UsersInput({ label_top, type, placeholder, maxWidth, label_bottom }: UsersInputProps
) {

    return (

        <FormControl w='100%'>

            <FormLabel fontWeight={'semibold'} fontSize={'sm'}>
                {label_top}
            </FormLabel>

            <Input w='100%' maxW={maxWidth ?? '100%'} px={4} py={2} border='1px solid' borderColor={'inputBorder'} borderRadius={6} type={type} placeholder={placeholder} />

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