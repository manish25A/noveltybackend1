const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const nameSchema = new Schema(
	{
		stockName: { type: String, required: [true, 'stock name empty'] },
	},
	{
		timestamps: true,
	}
);

const Stock = mongoose.model('Stock', nameSchema);

module.exports = Stock;
