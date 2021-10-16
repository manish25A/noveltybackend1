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
	Transcation.aggregate([
		{
			$group: {
				_id: {
					stockName: '$stockName',
					transcation_type: '$transcation_type',
				},
				quantity: {
					$sum: '$quantity',
				},
				totalAmount: {
					$sum: '$price',
				},
				count: {
					$sum: 1,
				},
			},
		},
		// $group: { _id: '$transcationType' },
	]).then((data) => {
		res.status(200).json({
			success: true,
			data: data,
		});
		console.log(data);
	});
});

router.post('/new', async function (req, res, next) {
	const transcation = await Transcation({
		stockName: req.body.stockName,
		quantity: req.body.quantity,
		price: req.body.price,
		transcation_type: req.body.transcation_type,
		total_price: req.body.price * req.body.quantity,
	});
	await transcation
		.save()
		.then((res) => {
			res.status(200).json({
				success: true,
				data: 'successfully placed',
			});
		})
		.catch((err) => {
			console.log(err);
		});
});
// });

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
