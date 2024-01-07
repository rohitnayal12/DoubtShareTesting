import { ChakraProvider, CSSReset, HStack, Box, Container, Flex, Spacer, Link, VStack } from "@chakra-ui/react";


const TutorNavBar = () => {
    return (
        <Flex p={4} bg="teal.500" color="white">
            <HStack spacing={4} align="left">
                <Link href="/tutor/dashboard" >Dashboard</Link>
                <Link href="/">Home</Link>
            </HStack>
            <Spacer />
        </Flex>
    );
};

export default TutorNavBar; 