import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from '@chakra-ui/react'


import React from 'react'

const NoTutorAlert = () => {
    return (
        <Alert status='error' mt={10}>
            <AlertIcon />
            <AlertTitle>No Tutor Available !!!</AlertTitle>
            <AlertDescription>PLease try after some time.</AlertDescription>
        </Alert>
    )
}

export default NoTutorAlert
