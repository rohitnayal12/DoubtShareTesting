import React from 'react';
import { Button, ButtonGroup, Heading } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';



const Home = () => {

    const navigate = useNavigate();
    return (
        <div>
            <Heading as='h1' size='1xl' noOfLines={1}>
                Continue as ...
            </Heading>

            <Button colorScheme='blue' w={100} onClick={() => { navigate('/student'); }}>Student</Button>
            <br />

            <Button colorScheme='blue' w={100} mt={2} onClick={() => { navigate('/tutor'); }}>Tutor</Button>
        </div>
    )
}

export default Home
