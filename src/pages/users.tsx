import FormUsers from '@/components/users/FormUsers'
import { UsersHeader } from '@/components/users/Header'
import { ProfileUserResume } from '@/components/users/ProfileUserResume'
import { Button, Container, Flex } from '@chakra-ui/react'

export default function Users() {
  return (
    <>
      <Container maxW={'1366px'} mx='auto'>

        <Flex flexDir={'column'} w='100%' px={20} py={10} gap={16}>

          {/* HEADER */}
          <Flex
            justifyContent={'space-between'}
            alignItems={'center'}
            borderBottom={'1px solid #E5E7EB'}
            pb={8}
          >
            <UsersHeader />
          </Flex>

          {/* BODY FORMS */}
          <Flex flexDir={'column'}>

            <Flex gap={20}>
                <FormUsers />
                <ProfileUserResume />
            </Flex>

          </Flex>

        </Flex>

      </Container>
    </>
  )
}
