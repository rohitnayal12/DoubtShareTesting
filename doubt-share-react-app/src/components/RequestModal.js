// RequestModal.js

import React, { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Select } from '@chakra-ui/react';

const RequestModal = ({ isOpen, onRequestClose, onSubmit, tutorSubjectTypes }) => {
    const [selectedSubject, setSelectedSubject] = useState('');

    const handleSubjectChange = (e) => {
        setSelectedSubject(e.target.value);
    };

    const handleSubmit = () => {
        onSubmit(selectedSubject);
    };

    return (
        <Modal isOpen={isOpen} onClose={onRequestClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Request Form</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <label htmlFor="subjectType">Subject Type:</label>
                    <Select id="subjectType" value={selectedSubject} onChange={handleSubjectChange}>
                        <option value="">Select...</option>
                        <option value="Java">Java</option>
                        <option value="JavaScript">JavaScript</option>
                        <option value="C++">C++</option>
                        <option value="C">C</option>
                        <option value="React">React</option>
                        {tutorSubjectTypes?.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </Select>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="teal" mr={3} onClick={handleSubmit}>
                        Submit Request
                    </Button>
                    <Button onClick={onRequestClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default RequestModal;
