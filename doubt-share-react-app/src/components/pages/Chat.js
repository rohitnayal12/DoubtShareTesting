import React, { useState, useEffect } from 'react';
import { Input, Button, Box, VStack } from "@chakra-ui/react";
import { initializeSocket } from '../../Socket';
import { useParams } from "react-router-dom";
import NavBar from '../NavBar';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [role, setRole] = useState("student");
    const { roomName, conversationId } = useParams();

    let studentDetails = JSON.parse(localStorage.getItem("studentDetails"));
    let studentId = studentDetails._id

    let socket = initializeSocket();
    useEffect(() => {


        // Join the room
        socket.emit("registerStudent", { roomName, studentId });

        //  tutor messages
        socket.on("receiveMessage", (data) => {

            setMessages((prevMessages) => [...prevMessages, data]);
        });

        // Clean up the socket listener when the component unmounts
        return () => {
            socket.off("receiveMessage");
        };
    }, [roomName]);  // Only re-run the effect when roomName changes

    const sendMessage = () => {
        // To
        socket.emit("sendMessage", { roomName, message: newMessage, role, timeStamp: new Date(), conversationId });

        // setMessages((prevMessages) => [...prevMessages, newMessage]);ss
        setNewMessage("");

        console.log("HElo")
    };

    return (
        <>
            <NavBar />

            <Box maxW={800} m="auto" display="flex" flexDirection="column" mt={2} borderRadius='lg' height="90vh">

                <VStack spacing={4} overflowY="auto" flex="1">
                    {messages.map((msg, index) => (
                        <Box key={index} p={2} borderWidth="1px" borderRadius="md">
                            {msg.role === "student" ? "You" : "Tutor"}  :  {msg.message}
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

export default Chat;
