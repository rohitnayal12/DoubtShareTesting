import React, { useEffect, useState } from 'react'
import {
    Heading, Button, Box, Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from "@chakra-ui/react"
import { initializeSocket } from '../../Socket';
import { useNavigate } from "react-router-dom";
import TutorNavBar from '../TutorNavBar';

const TutorDashboard = () => {

    const tutorId = localStorage.getItem("tutorId");
    const token = localStorage.getItem("token");

    const [activeQuery, setActiveQuery] = useState(null);
    const [conversationId, setConversationId] = useState("");
    const navigate = useNavigate();


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

        setTimeout(() => {
            setActiveQuery(null);
        }, 60 * 1000)


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
        // query acceopt
        socket.emit("acceptQuery", activeQuery);

        // Koin the room here
        const roomName = `${activeQuery.tutorId}-${activeQuery.studentId}`;
        socket.emit("joinRoom", roomName);

        // Get ConversationId 
        socket.on("getConversationId", (data) => {
            navigate(`/tutor-chat/${roomName}/${data.conversationId}`)
            setConversationId(data.conversationId)
        })

        // Clear the active query
        setActiveQuery(null);
    };

    const handleReject = () => {
        // Handle reject logic
        console.log(`Rejected query with tutorId: ${activeQuery.tutorId}`);
        // Emit event to handle rejection on the server or handle it according to your needs

        // Clear the active query
        socket.emit("rejectQuery", activeQuery)
        setActiveQuery(null);
    };



    return (
        <div>
            <TutorNavBar />

            {activeQuery ?
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
                </Box> : <Alert status='error' mt={10}>
                    <AlertIcon />
                    <AlertTitle>No Doubt Queries !!!</AlertTitle>
                    <AlertDescription>PLease stay active.</AlertDescription>
                </Alert>
            }

        </div>
    )
}

export default TutorDashboard;





