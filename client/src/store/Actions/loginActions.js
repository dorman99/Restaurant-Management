import axios from 'axios'

export function handleFormInput (payload) {
	return {
		type: 'LOGIN_FORM_ONCHANGE',
		payload: payload
	}
}

function clearField () {
	return {
		type: 'FIELD_CLEAR'
	}
}

export function submitLogin(payload,pusher) {
	return (dispatch) => {
		axios.post('http://localhost:3100/login',{
			...payload
		}).then(response => {
			console.log('haha', response,'ss')
			if(response.data.msg) {
				alert('wrong password')
				dispatch(clearField())
			}
			else if(response.data.role == 'customer') {
				// pusher.push('/customers')
				// pusher('/customers')
				localStorage.setItem('token', response.data.token)
				localStorage.setItem('role', response.data.role)
				pusher('/customers')
				dispatch(clearField())
			} else if (response.data.role == 'chef') {
				// pusher('/chef')
				localStorage.setItem('token', response.data.token)
				localStorage.setItem('role', response.data.role)
				pusher('/chef')
				dispatch(clearField())
			} else if(response.data.role == 'admin') {
				// pusher('/admin')
				localStorage.setItem('token', response.data.token)
				localStorage.setItem('role', response.data.role)
				pusher('/admin')
				dispatch(clearField())
			}
		}).catch(err=> {
			console.log(err)
			alert('invalid username')
			dispatch(clearField())
		})
	}
}