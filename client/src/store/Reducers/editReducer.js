let editUser = {
	loading:true,
	user: {
		id: '',
		name: '',
		username: '',
		password: '',
		role: ''
	}
}

export default function editReducer (state = editUser,action) {
	switch (action.type) {
		case 'FETCH_EDIT':
			return {
				...action.payload
			}
		case 'EDITING_USER':
			return {
				...action.payload
			}
		default:
			return state
	}
}