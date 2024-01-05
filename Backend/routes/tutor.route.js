require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const tutorRoute = express.Router();


// Register route for tutors
tutorRoute.post('/register/tutor', async (req, res) => {
    try {
        const { name, email, password, grade, language, subjectType } = req.body;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new tutor instance
        const newTutor = new Tutor({
            name,
            email,
            password: hashedPassword,
            grade,
            language,
            subjectType,
        });

        // Save the tutor to the database
        const savedTutor = await newTutor.save();

        res.status(201).json(savedTutor);
    } catch (error) {
        console.error('Error registering tutor:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

// Login route for tutors
tutorRoute.post('/login/tutor', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the tutor by email
        const tutor = await Tutor.findOne({ email });

        if (!tutor) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compare the provided password with the hashed password
        const passwordMatch = await bcrypt.compare(password, tutor.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { userId: tutor._id, role: 'tutor' },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token, role: 'tutor', tutorId: tutor._id });

    } catch (error) {
        console.error('Error logging in tutor:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});



module.exports = { tutorRoute };