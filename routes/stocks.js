var express = require('express');
var router = express.Router();
const Transcation = require('../models/transcation');
const Stocks = require('../models/stockData');

/* GET users listing. */
router.get('/', async function (req, res, next) {
	const stockData = await Transcation.find({}).then((data) => {
		res.status(200).json({
			success: true,
			data: data,
		});
	});
});
router.get('/agg', async function (req, res, next) {
	const transcationData = Transcation.aggregate([
		{
			$group: {
				_id: [
					{ stockName: '$stockName' },
					{ transcation_type: '$transcation_type' },
				],
				total: {
					$sum: '$quantity',
				},
				count: {
					$sum: 1,
				},
			},
		},
	]).then((data) => {
		res.status(200).json({
			success: true,
			data: data,
		});
		console.log(data);
	});
});
router.post('/new', async function (req, res, next) {
	console.log(req.body);
	const transcation = await Transcation({
		stockName: req.body.stockName,
		quantity: req.body.quantity,
		price: req.body.price,
		transcation_type: req.body.transcation_type,
	});
	console.log(transcation);
	await transcation
		.save()
		.then((res) => {
			console.log(res);
		})
		.catch((err) => {
			console.log(err);
		});
});
//getstocks
router.get('/getstocks', async (req, res, next) => {
	const stocks = await Stocks.find({}).then((data) => {
		res.json({
			data: data,
			count: data.length,
		});
	});
});

module.exports = router;
