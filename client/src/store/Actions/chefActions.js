import axios from 'axios'

function fetchingMenu (payload) {
	return {
		type: 'FETCH_MENU_TO_COOK',
		payload: payload
	}
}
function donemenu (payload) {
	return {
		type: 'UPDATE_ORDER',
		payload: payload
	}
}

export function updatingMenuToCook (menu,orderId) {
	return (dispatch)=>{
		axios.post('http://localhost:3100/chef/'+orderId)
		.then(response => {
			console.log(response,'hhuhu')
			if(response.data.msg == 'success') {
				menu.forEach(el=>{
					if(el.id == orderId) {
						el.status = true
					}
				})
				let payload = {
					loading: false,
					menu: [
						...menu
					]
				}
				console.log('hahaasas', payload)
				dispatch(donemenu(payload))
			}
		}).catch(err=>{
			console.log(err)
		})
	}
}

export function fetchedMenu () {
	return (dispatch)=>{
		axios.get('http://localhost:3100/chef')
		.then(resp=>{
			let payload = {
				loading: false,
				menu: [
					...resp.data.data
				]
			}
			console.log(resp)
			dispatch(fetchingMenu(payload))
		}).catch(err=>{
			console.log(err)
			alert(err)
		})
	}
}