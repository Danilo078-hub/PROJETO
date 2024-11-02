const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
    amount: { type: Number, required: true },
    donor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    date: { type: Date, default: Date.now },
    iuguInvoiceId: { type: String, required: true }, // Campo para o ID da fatura da Iugu
});

module.exports = mongoose.model('Donation', DonationSchema);
