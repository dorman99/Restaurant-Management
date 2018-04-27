import axios from 'axios'
export function formOnchange (payload) {
	return (dispach) => {
		dispach({
			type: 'SIGNUP_USER',
			payload: payload
		})
	}
}

function clearField () {
	return {
		type: 'CLEAR_FIELD'
	}
}

export function SumbitSignUp (payload){
	return (dispatch) => {
		axios.post('http://localhost:3100/signup',{
			...payload
		}).then(response => {
			if(response.data.msg === 'done') {
				dispatch(clearField())
				alert('SignUp Success')
			} else if (response.data.error.errors[0].path === 'password') {
				alert('password tidak boleh kosong')
			} else if (response.data.error.errors[0].path === 'username') {
				alert('username sudah digunakan / tidak boleh kosong')
			}
		}).catch(err => {
			console.log(err)
		})
	}
}