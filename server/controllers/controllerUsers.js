const Model =  require('../models')
const User  = Model.User

const allUser = (req, res) => {
	User.findAll({
		order:[['id','ASC']]
	}).then(resp => {
		res.status(200).send({data: resp})
	}).catch(err => {
		res.send(err)
	})
}

const newUser = (req,res) => {
	let objUser = {
		name: req.body.name,
		username: req.body.username,
		password: req.body.password,
		role: req.body.role
	}

	User.create(objUser).then(()=> {
		res.status(200).send({msg: 'user berhasil dibuat'})
	}).catch(err => {
		res.send(err)
	})
}

const editUser = (req,res) => {
	let objEdit = {
		id: req.params.id,
		name: req.body.name,
		username: req.body.username,
		// password: req.body.password,
		role: req.body.role
	}
	User.update(objEdit,{
		where: {
			id: req.params.id
		}
	}).then(()=> {
		res.status(200).send({msg: 'data berhasil diupdate'})
	}).catch( err => {
		res.send(err)
	})
}

const destroyUser = (req,res) => {
	User.destroy({
		where: {
			id: req.params.id
		}
	}).then(() => {
		res.status(200).send({msg: 'data berhasil dihapus'})
	}).catch(err => {
		res.send(err)
	})
}

module.exports = {
	allUser,
	newUser,
	editUser,
	destroyUser
}