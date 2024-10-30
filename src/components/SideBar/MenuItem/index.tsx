import { Link, Flex, Icon, Text } from "@chakra-ui/react";
import { IconProps, SquaresFour } from "phosphor-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

interface MenuItemProps {
    href: string,
    icon: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>,
    title: string
    isActive?: boolean
}

export function MenuItem({ href, icon, title, isActive }: MenuItemProps) {

    return (
        <Link w='100%' href={`/${href}`} _hover={{ textDecoration: 'none' }}>
            <Flex
                w='100%'
                alignItems="center"
                py={2}
                mb={2}
                borderRadius="sm"
                _hover={{ bg: 'grayHoverSide' }}
                fontWeight={'normal'}
                bgColor={isActive?'grayHoverSide' : "" }
            >
                <Icon as={icon} mr={2} /> {/* Ícone do Phosphor React */}
                <Text>{title}</Text>
            </Flex>
        </Link>
    )
}