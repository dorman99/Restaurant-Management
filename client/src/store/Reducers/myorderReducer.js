let dishes = {
	loading: true,
	menu: []
}

export default function myorderReducer (state = dishes, action) {
	switch (action.type) {
		case 'LOADING_MY_ORDER':
			return {
				...action.payload
			}
		default:
			return state
	}
}