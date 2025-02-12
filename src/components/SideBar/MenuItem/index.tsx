import { Link, Flex, Icon, Text, useColorModeValue } from "@chakra-ui/react";
import { IconProps, SquaresFour } from "phosphor-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { IconType } from "react-icons/lib";

interface MenuItemProps {
    href: string,
    icon: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>> | IconType,
    title: string
    isActive?: boolean
}

export function MenuItem({ href, icon, title, isActive }: MenuItemProps) {

    const menuItemColor = useColorModeValue('grayHoverSide', 'dark.grayHoverSide')

    return (
        <Link w='100%' href={`/${href}`} _hover={{ textDecor: 'none' }}>
            <Flex
                w='100%'
                alignItems="center"
                py={2}
                pl={2}
                mb={2}
                borderRadius="sm"
                _hover={{ bg: menuItemColor }}
                fontWeight={'normal'}
                bgColor={isActive ? menuItemColor : ""}
            >
                <Icon as={icon} mr={2} /> {/* Ícone do Phosphor React */}
                <Text>{title}</Text>
            </Flex>
        </Link>
    )
}