const mongoose = require('mongoose');

const doubtQuerySchema = new mongoose.Schema({
    studentId: { type: String, required: true },
    tutorId: { type: String, required: true },
    subjectType: { type: [String], required: true },
    status: { type: String, enum: ['pending', 'accept', 'reject'], default: 'pending' },
    timeStamp: { type: Date, required: true },
    uniqueKey: { type: String, required: true },
}, { versionKey: false });

const DoubtQuery = mongoose.model('DoubtQuery', doubtQuerySchema);

module.exports = DoubtQuery;
