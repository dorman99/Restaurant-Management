let chef={
	loading: true,
	menu: []
}

export default function chefReducer (state=chef, action) {
	switch (action.type) {
		case 'FETCH_MENU_TO_COOK':
			return {
				...action.payload
			}
		case 'UPDATE_ORDER':
			return {
				...action.payload
			}
		default:
			return state
	}
}