import { ChakraProvider, CSSReset, HStack, Box, Container, Flex, Spacer, Link, VStack } from "@chakra-ui/react";


const NavBar = () => {
    return (
        <Flex p={4} bg="teal.500" color="white">
            <HStack spacing={4} align="left">
                <Link href="/student">Student</Link>
                <Link href="/student/dashboard" >Ask Query </Link>
                <Link href="/allQueries">All Queries</Link>
                <Link href="/">Home</Link>
            </HStack>
            <Spacer />
        </Flex>
    );
};

export default NavBar; 