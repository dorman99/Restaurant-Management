const Model =  require('../models')
const User  = Model.User;
var jwt = require('jsonwebtoken');

const login = (req,res) => {
	User.findOne({
		where: {
			username: req.body.username.toLowerCase()
		}
	}).then(userData => {
		// console.log('ini data ', userData)
		if(userData === null){
			res.status(300).send({ msg: 'user' })
		} else {
			userData.comparePassWord(req.body.password,(result)=> {
				console.log(result,'server nih')
				if(result) {
					let payload = {
						...userData.dataValues
					}
					token = jwt.sign(payload,'haha')
					// console.log(token,'server')
					res.status(200).send({token:token,role:userData.role})
				} else {
					console.log('mmasuk sini cuy')
					res.status(200).send({msg:'pass'})
				}
			})
		}
	}).catch(err=> {
		res.send(err)
	})
}

module.exports = {
	login
}
