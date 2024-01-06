const mongoose = require('mongoose');
const { Schema } = mongoose;

// Student Model
const studentSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    grade: { type: String },
    language: { type: String },
    role: { type: String, default: 'student' },
    subjectType: { type: [String], required: true }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = { Student };