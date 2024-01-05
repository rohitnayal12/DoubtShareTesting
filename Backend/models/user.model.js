const mongoose = require('mongoose');
const { Schema } = mongoose;

const tutorSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    grade: { type: String, requird: true },
    language: { type: String, requird: true },
    subjectType: { type: [String], requird: true },
    role: { type: String, default: 'tutor' },
});


const tutorAvailabilitySchema = new mongoose.Schema({
    tutorId: { type: String, required: true },
    lastPingTime: { type: Date, default: new Date() },
});

const TutorAvailablity = mongoose.model("TutorAvailablity", tutorAvailabilitySchema);

const Tutor = mongoose.model('Tutor', tutorSchema);

module.exports = { Tutor, TutorAvailablity };