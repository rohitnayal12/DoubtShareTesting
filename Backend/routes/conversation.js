require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const conversationRoute = express.Router();
const { authMiddleware } = require("../helpers/authmiddleware");

const { Student } = require("../models/student.model");

const DoubtQuery = require("../models/doubt.model");
const { Tutor } = require("../models/tutor.model");
const { Conversation } = require("../models/conversation.model");

// 659913e138220519390ffbca

conversationRoute.get("/conversation/:conversationId", authMiddleware, async (req, res) => {
    try {
        const { conversationId } = req.params;


        const conversation = await Conversation.findOne({ _id: conversationId })

        const sortedMessages = conversation.messages.sort((a, b) => a.timeStamp - b.timeStamp);
        res.status(200).send(sortedMessages);

    } catch (error) {
        console.error("Error retrieving conversation:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


module.exports = { conversationRoute }; 