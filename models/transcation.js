const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transcationSchema = new Schema(
	{
		stockName: {
			type: String,
			required: [true, 'valid stock name'],
		},
		quantity: { type: Number, required: [true, 'enter valid quantity'] },
		price: { type: Number, required: [true, 'enter valid price'] },
		transcation_type: { type: String, required: [true, 'enter valid type'] },
		total_price: { type: String, required: [true, 'enter valid total price'] },
	},
	{
		timestamps: true,
	}
);

const Transcation = mongoose.model('Transcation', transcationSchema);

module.exports = Transcation;
