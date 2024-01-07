import React, { useState, useEffect } from 'react';
import { Input, Button, Box, VStack } from "@chakra-ui/react";
import { initializeSocket } from '../../Socket';
import { useParams } from "react-router-dom";
import TutorNavBar from '../TutorNavBar';

const TutorChat = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [role, setRole] = useState("tutor");
    const { roomName, conversationId } = useParams();
    let tutorId = localStorage.getItem("tutorId");


    let socket = initializeSocket();
    useEffect(() => {

        // Join the room
        socket.emit("joinRoom", roomName);


        // Listen for incoming messages
        socket.on("receiveMessage", (data) => {

            setMessages((prevMessages) => [...prevMessages, data]);
        });

        // Clean up the socket listener when the component unmounts
        return () => {
            socket.off("receiveMessage");
        };
    }, [roomName, socket]);  // Only re-run the effect when roomName changes

    const sendMessage = () => {

        socket.emit("sendMessage", { roomName, message: newMessage, role, timeStamp: new Date(), conversationId });

        let message = { roomName, message: newMessage, role }

        // Optionally, update the local state immediately
        setMessages((prevMessages) => [...prevMessages, message]);
        setNewMessage("");
    };

    return (
        <>
            <TutorNavBar />

            <Box maxW={800} m="auto" display="flex" flexDirection="column" mt={2} borderRadius='lg' height="90vh">
                <VStack spacing={4} overflowY="auto" flex="1">
                    {messages.map((msg, index) => (
                        <Box key={index} p={2} borderWidth="1px" borderRadius="md">
                            {console.log(msg)}
                            {msg.role === "tutor" ? "You" : "student"}:  {msg.message}
                        </Box>
                    ))}
                </VStack>

                <Box p={4} borderTop="1px solid #e0e0e0" bg="white">
                    <Input
                        placeholder="Type your message"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />

                    <Button onClick={sendMessage} colorScheme="teal" mt={4}>
                        Send Message
                    </Button>
                </Box>
            </Box>
        </>
    );
};

export default TutorChat;
