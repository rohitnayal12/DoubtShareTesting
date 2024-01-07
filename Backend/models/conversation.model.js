const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
    messages: [{
        message: {
            type: String, required: true,
        },
        role: {
            type: String, enum: ['tutor', 'student'], required: true,
        },
        timeStamp: {
            type: Date,
        },
    },
    ],
});

const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = { Conversation };
