let dishes = {
	loading: true,
	menu: []
}

export default function foodReducer (state = dishes, action) {
	switch (action.type) {
		case 'DISHES_FETCHED':
			return {
				...action.payload
			}
		case 'UPDATE_ORDER':
			return {
				...action.payload
			}
		case 'DISHES_FETCHING' :
			return {
				loading:true
			}
		default:
			return state
	}
}