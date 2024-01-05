import React, { useState } from 'react';
import {
    FormControl, Heading,
    FormLabel,
    Input,
    Select, ButtonGroup,
    Button,
    Stack,
    VStack, Radio, RadioGroup, Checkbox,
} from '@chakra-ui/react';

const TutorRegister = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        grade: '',
        language: '',
        subjectType: [],
    });

    const [subjectType, setSubjectType] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };


    const handleSubjectTypeChange = (selectedSubject) => {
        setSubjectType((prevSelectedSubjects) => {
            if (prevSelectedSubjects.includes(selectedSubject)) {
                // If already selected, remove it
                return prevSelectedSubjects.filter(
                    (subject) => subject !== selectedSubject
                );
            } else {
                // If not selected, add it

                let data = formData.subjectType;
                data.push(selectedSubject);

                setFormData({ ...formData, [subjectType]: data })
                return [...prevSelectedSubjects, selectedSubject];
            }
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form Data:', formData);
        // You can send the data to the server or perform any other actions
    };


    return (
        <VStack spacing={4} align="stretch" maxW={400} m={"auto"}>
            <form onSubmit={handleSubmit}>
                <FormControl isRequired>
                    <FormLabel>Name</FormLabel>
                    <Input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </FormControl>

                <FormControl isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </FormControl>

                <FormControl isRequired>
                    <FormLabel>Password</FormLabel>
                    <Input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </FormControl>

                <FormControl isRequired>
                    <FormLabel>Grade</FormLabel>
                    <Select
                        id="grade"
                        name="grade"
                        placeholder="Select grade"
                        value={formData.grade}
                        onChange={handleChange}
                    >
                        {/* Populate the grade options dynamically */}
                        {[6, 7, 8, 9, 10, 11, 12].map((grade) => (
                            <option key={grade} value={grade}>
                                {grade}
                            </option>
                        ))}
                    </Select>
                </FormControl>

                <FormControl isRequired>
                    <FormLabel>Language</FormLabel>
                    <Select
                        id="language"
                        name="language"
                        placeholder="Select language"
                        value={formData.language}
                        onChange={handleChange}
                    >
                        {/* Populate the language options dynamically */}
                        {['Hindi', 'English'].map((language) => (
                            <option key={language} value={language}>
                                {language}
                            </option>
                        ))}
                    </Select>
                </FormControl>

                <FormControl >
                    <FormLabel>Subject Type</FormLabel>
                    <Stack direction="row">
                        {['JavaScript', 'C', 'Java', 'React'].map((subject) => (
                            <Checkbox
                                key={subject}
                                value={subject}
                                isChecked={subjectType.includes(subject)}
                                onChange={() => handleSubjectTypeChange(subject)}
                            >
                                {subject}
                            </Checkbox>
                        ))}
                    </Stack>
                </FormControl>

                <Button type="submit" colorScheme="blue" mt={4}>
                    Submit
                </Button>
            </form>
        </VStack>
    )
}

export default TutorRegister
