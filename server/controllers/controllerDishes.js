const Model = require('../models')
const Dishes =  Model.Dishes
var redis = require('redis')
var client = redis.createClient();

const findAll = async (req, res) => {

	try {
		let Menu = await Dishes.findAll({
			where: {
				stock: true
			}
		})
		client.set('MENU_CACHES', JSON.stringify(Menu))
			res.send(Menu)
	} catch (err) {
		res.send(err)
	}
}


const addMenu = async (req, res) => {

	try {
		let newMenu = await Dishes.create({
			id: req.params.id,
			name: req.body.name,
			cookDuration: req.body.cookDuration,
			image: req.body.image,
			desc: req.body.desc,
			price: req.body.price
		})
		client.del('MENU_CACHES',(err,reply)=>{
			if(!err) {
				res.status(200).send({msg:'new food coming!'})
			}
		})
	} catch (err) {
		res.send(err)
	}
}

const editMenu = async (req,res)=> {
	try {
		let EditDishes = await Dishes.update({
			id: req.params.id,
			name: req.body.name,
			cookDuration: req.body.cookDuration,
			image: req.body.image,
			desc: req.body.desc,
			price: req.body.price
		},{
			where: {
				id: req.params.id
			}
		})
		client.del('MENU_CACHES', (err, reply) => {
			if (!err) {
				res.status(200).send({ msg: 'new food updated' })
			}
		})
	} catch (err) {
		res.send(err)
	}
}

const destroyMenu = async (req,res) => {
	try {
		let delMenu = Dishes.destroy({
			where: {
				id: req.params.id
			}
		})
		client.del('MENU_CACHES', (err, reply) => {
			if (!err) {
				res.status(200).send({ msg: 'menu deleted' })
			}
		})
	} catch(err) {
		res.send(err)
	}
}

module.exports = {
	findAll,
	addMenu,
	editMenu,
	destroyMenu,
}