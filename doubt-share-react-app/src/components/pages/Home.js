import React from 'react';
import { Button, ButtonGroup, Heading } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';



const Home = () => {

    const navigate = useNavigate();
    return (
        <div style={{ marginTop: "10%" }}>
            <Heading as='h1' size='xl' noOfLines={1}>
                Continue as ...
            </Heading>

            <Button colorScheme='blue' w={200} mt={5} onClick={() => { navigate('/student'); }}>Student</Button>
            <br />

            <Button colorScheme='blue' w={200} mt={5} onClick={() => { navigate('/tutor'); }}>Tutor</Button>
        </div>
    )
}

export default Home
