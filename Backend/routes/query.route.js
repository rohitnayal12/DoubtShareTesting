require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const queryRoute = express.Router();
const { authMiddleware } = require("../helpers/authmiddleware");

const { Student } = require("../models/student.model");

const DoubtQuery = require("../models/doubt.model");
const { Tutor } = require("../models/tutor.model");

// 659913e138220519390ffbca

queryRoute.get("/allQuery", authMiddleware, async (req, res) => {
    try {
        const { studentId } = req.user;


        const queries = await DoubtQuery.find({
            studentId,
            status: { $ne: "pending" }

        })
            .sort({ timeStamp: -1 });

        res.status(200).send({ queries });

    } catch (error) {
        console.error("Error retrieving queries:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


module.exports = { queryRoute }; 