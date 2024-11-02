const sdk = require('api')('@iugu-dev/v1.0#cprxbcclkiqeh5n');
sdk.auth(process.env.IUGU_API_KEY);

const Donation = require('../models/Donation');

exports.createDonation = async (req, res) => {
    try {
        const { amount } = req.body;

        // Criar a fatura na Iugu
        const response = await sdk.criarFatura({
            ensure_workday_due_date: false,
            items: [
                {
                    description: "Doação",
                    quantity: 1,
                    price_cents: amount * 100, // valor em centavos
                },
            ],
        });

        // Salvar a doação no banco de dados
        const donation = new Donation({
            amount,
            donor: req.user.userId,
            iuguInvoiceId: response.data.id, // Salvando o ID da fatura da Iugu
        });
        await donation.save();

        res.status(201).json({
            message: 'Doação realizada com sucesso',
            invoice_url: response.data.secure_url, // URL da fatura para pagamento
        });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao processar doação' });
    }
};