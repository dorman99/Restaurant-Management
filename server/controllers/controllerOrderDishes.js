const Model = require('../models')
const User = Model.User
var redis = require('redis')
var client = redis.createClient();

const MyOrder = async (req,res)=> {
	try {
	let myOrderList = await	Model.Order.findAll({
			where: {
				UserId: req.headers.id
			},
			include: [
				{ model: Model.Dishes },
				{ model: User }
			]
		})
		client.set('MYORDER', JSON.stringify(myOrderList))
			res.send(myOrderList)
	}
	catch(err){
		res.send(err)
	}
}

const makeOrder = async (req,res) => {
	let arrOrder = []
	// if (typeof req.body.DishId == 'object') {
		req.body.DishId.forEach((el,idx) => {
			let obj = {
				UserId: req.headers.id,
				DishId: el,
				status: false,
				cookDuration: JSON.parse(req.body.amount[idx])*req.body.cookDuration[idx],
				amount: req.body.amount[idx]
			}
			arrOrder.push(obj)
		})
		try {
		let makeOrder = await Model.Order.bulkCreate(arrOrder)
			client.del('MYORDER',(err,reply)=>{
				console.log(err,'---',reply)
				if(!err) {
					console.log('masuk ga sih?')
					res.status(200).send({msg: 'success',reply:reply})
				}
			})
		}
		catch (err) {
			res.send(err)
		}
}

module.exports = {
	MyOrder,
	makeOrder
}