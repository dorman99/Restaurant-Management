const Model = require('../models')
const Order = Model.Order

const getAllMenu = (req,res)=>{
	Order.findAll(
	{
		attributes: ['id','status','amount'],
		where:{
			status: false
		},
		include: [{
			model: Model.Dishes
		},{
			model: Model.User
		}],
		order: [['id','ASC']]
	}
).then(resp=>{
		// resp.reverse()
		console.log(resp[0].id)
		res.status(200).send({data:resp,jumlah:resp.length})
	}).catch(err=>{
		res.status(200).send({data:[]})
	})
}

const doneCook = (req,res)=> {
	console.log('masuk sini kok')
	Order.update({
		status: true
	},{
		where: {
			id: req.params.id
		}
	}).then(resp => {
		res.status(200).send({msg:'success'})
	}).catch(err=>{
		res.send(err)
	})
}

module.exports = {
	getAllMenu,
	doneCook
}