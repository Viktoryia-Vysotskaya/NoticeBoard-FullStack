const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
    title: { type: String, required: true, minlength: 3, maxlength: 50 },
    localization: { type: String, required: true },
    content: { type: String, required: true, minlength: 5, maxlength: 500 },
    price: { type: Number, required: true },
    publicationDate: { type: String, required: true },
    photo: [{ type: String, required: true }],
    sellerInfo: { type: String, required: false, ref: 'User' },
});

module.exports = mongoose.model('Ad', adSchema);