"use client"
import { BlackCard } from "@/components/Authentication/Cards/BlackCard";
import { WelcomeCard } from "@/components/Authentication/Cards/WelcomeCard";
import { getAccessToken } from "@auth0/nextjs-auth0";
import { UserProfile, useUser } from "@auth0/nextjs-auth0/client";
import { Container, Flex } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";



export default function WelcomeBack() {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const { user, error, isLoading } = useUser()

    return (

        <Container maxW={'1366px'} mx='auto' h='100vh' color='darkSide'>

            <Flex h='100%'>

                {/* DARK CARD */}
                <BlackCard />

                {/* BEM VINDO DE VOLTA CARD */}
                <WelcomeCard isLoading={isLoading} register={register} user={user} />

            </Flex>
        </Container>
    )
}