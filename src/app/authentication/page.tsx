"use client"
import { BlackCard } from "@/components/Authentication/Cards/BlackCard";
import { WelcomeCard } from "@/components/Authentication/Cards/WelcomeCard";
import { SpinnerFullScreen } from "@/components/Loading/SpinnerFullScreen";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Container, Flex } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";



export default function WelcomeBack() {

    const { register } = useForm();

    const { user, isLoading } = useUser()

    const router = useRouter()

    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const redirectSession = async () => {
            router.push('/')
        }
        if (user) {
            redirectSession()
        } else {
            setTimeout(() => {
                setLoading(false)
            }, 3000)
        }
    }, [user])

    return (

        <Container maxW={'1440px'} mx='auto' h='100vh' color='darkSide'>

            {loading?
                <SpinnerFullScreen />
                :
                <Flex h='100%'>

                    {/* DARK CARD */}
                    <BlackCard />

                    {/* BEM VINDO DE VOLTA CARD */}
                    <WelcomeCard isLoading={isLoading} register={register} user={user} />

                </Flex>
            }
        </Container>
    )
}