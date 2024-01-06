import React, { useEffect, useState } from 'react'
import { Heading, Button, Box } from "@chakra-ui/react"
import { initializeSocket } from '../../Socket';

const TutorDashboard = () => {

    const tutorId = localStorage.getItem("tutorId");
    const token = localStorage.getItem("token");

    const [activeQuery, setActiveQuery] = useState(null);

    let socket = initializeSocket();


    useEffect(() => {

        // On Loading this page the socket will connect
        socket.emit("tutorConnected", { message: "Tutor Dashboard Socket", tutorId: tutorId })


        // //  Polling function To check if the Tutor Availability
        const pollingFunction = setInterval(() => {
            socket.emit("ping", { message: "Tutor is active ...", tutorId: tutorId, lastPingTime: new Date() })
        }, 3000)


        // Listening to the Requests
        socket.on("requestQuery", (data) => {
            setActiveQuery(data);
            console.log("Request Query : ", data)
        })

        if (socket.connected) {
            socket.disconnect();
        }

        return () => {
            // Disconnect the socket when the component unmounts
            clearInterval(pollingFunction)
            socket.disconnect();
            socket = null;
        };



    }, [tutorId]);


    const handleAccept = () => {
        // Handle accept logic, create a room, etc.
        console.log(`Accepted query with tutorId: ${activeQuery.tutorId}`);
        // Emit event to create a room or handle it according to your needs

        // Clear the active query
        setActiveQuery(null);
    };

    const handleReject = () => {
        // Handle reject logic
        console.log(`Rejected query with tutorId: ${activeQuery.tutorId}`);
        // Emit event to handle rejection on the server or handle it according to your needs

        // Clear the active query
        setActiveQuery(null);
    };



    return (
        <div>
            <Heading size="1xl">
                Tutor DashBoard
            </Heading>

            {activeQuery && (
                <Box p={4} borderWidth="1px" borderRadius="md" my={2}>
                    <div>
                        <strong>Student ID:</strong> {activeQuery.studentId}
                    </div>
                    <div>
                        <strong>Subject Type:</strong> {activeQuery.subjectType.join(', ')}
                    </div>
                    <div>
                        <strong>Status:</strong> {activeQuery.status}
                    </div>
                    <div>
                        <strong>Timestamp:</strong> {new Date(activeQuery.timeStamp).toLocaleString()}
                    </div>
                    <Button colorScheme="green" onClick={handleAccept}>
                        Accept
                    </Button>
                    <Button colorScheme="red" ml={2} onClick={handleReject}>
                        Reject
                    </Button>
                </Box>
            )}

        </div>
    )
}

export default TutorDashboard
