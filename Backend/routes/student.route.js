require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const studentRoute = express.Router();
const { authMiddleware } = require("../helpers/authmiddleware");

const { Student } = require("../models/student.model");



studentRoute.post('/register/student', async (req, res) => {
    try {
        const { name, email, password, grade, language } = req.body;

        let isStudent = await Student.findOne({ email });

        // Check already registered student
        if (isStudent) {
            return res.status(400).json({ message: 'Student already registered with this email' });
        }


        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new student instance
        const newStudent = new Student({
            name,
            email,
            password: hashedPassword,
            grade,
            language,
        });

        // Save the student to the database
        const savedStudent = await newStudent.save();
        res.status(201).send({ message: "Registered Successfully" });
    } catch (error) {
        console.error('Error registering student:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

// Login route for students
studentRoute.post('/login/student', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the student by email
        const student = await Student.findOne({ email });

        if (!student) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compare the provided password with the hashed password
        const passwordMatch = await bcrypt.compare(password, student.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { userId: student._id, role: 'student' },
            process.env.JWT_SECRET,

        );


        const { name, subjectType, _id, language } = student.toObject();
        let studentDetails = { name, subjectType, _id, language }

        res.json({ message: "Login Success", token, role: 'student', studentId: student._id, studentDetails });
    } catch (error) {
        console.error('Error logging in student:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});


studentRoute.get("/student/:studentId", authMiddleware, async (req, res) => {

    try {
        const student = await Student.findById(req.params.studentId);


        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Remove the password from the user data before sending it
        const { password, ...userDataWithoutPassword } = student.toObject();

        res.status(200).send({ studentDetails: userDataWithoutPassword });

    } catch (error) {
        console.error('Error finding student:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})






module.exports = { studentRoute };