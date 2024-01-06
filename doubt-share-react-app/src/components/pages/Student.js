import React from 'react'
import { Heading } from "@chakra-ui/react";
import Register from '../Register';
import StudentLogin from '../StudentLogin';
const Student = () => {
    return (
        <div>
            <Heading size={"1xl"}>Student</Heading>
            <StudentLogin />
            {/* <Register /> */}
        </div>
    )
}

export default Student
