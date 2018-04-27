const Model = require('../models')
const User  = Model.User

const signup = (req, res) => {
	console.log('ini ',req.body )
	let objSignup = {
		name: req.body.name,
		username: req.body.username.toLowerCase(),
		password: req.body.password
	}

	User.create(objSignup).then((resp) => {
		res.send({msg:'done', data: resp})
	}).catch(err => {
		console.log(err)
		res.send({msg: 'error',error: err})
	})
}

module.exports = {
	signup
}