var jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
	console.log(req.headers.token, 'ini beken')
	jwt.verify(req.headers.token, 'haha', (err, decoded) => {
		if (decoded.role == 'admin') {
			console.log('admin bukan', decoded.role)
			req.headers.id = decoded.id
			next()
		} else {
			res.status(403).send({ msg: 'invalid token' })
		}
	})
}

module.exports = {
	auth
}