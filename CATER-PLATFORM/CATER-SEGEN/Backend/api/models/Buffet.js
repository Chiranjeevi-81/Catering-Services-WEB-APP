const mongoose = require('mongoose');
const { Schema } = mongoose;

const buffetSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
    },
    phoneNumber: {
        type: String,
        trim: true,
        required: true,
    },
    eventType: {
        type: String,
        trim: true,
        required: true,
    },
    numberOfGuests: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        trim: true,
        required: true,
    },
    packageName: [String],
    selected: [String],
    specialRequests: String,
    isVeg: Boolean
});

const Buffet = mongoose.model('Buffet', buffetSchema);

module.exports = Buffet;