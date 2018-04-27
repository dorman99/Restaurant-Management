const SignUp = {
	username: '',
	password: '',
	name: ''
}

const SignupReducer = (state = SignUp,action) => {
	switch (action.type) {
		case 'SIGNUP_USER':
		// console.log('haha', action.payload)
			return  {
				...action.payload
			}
		case 'CLEAR_FIELD':
			return {
				...SignUp
			}
		default:
			return state
	}
}

export default SignupReducer