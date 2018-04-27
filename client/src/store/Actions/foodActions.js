import axios from 'axios'


function foodFetched (payload) {
	console.log('iini apa cuk')
	return {
		type: 'DISHES_FETCHED',
		payload: payload
	}
}

export function foodFething (payload) {
	return {
		type: 'DISHES_FETCHING'
	}
}

function updatinFoodOrder (payload) {
	return {
		type: 'UPDATE_ORDER',
		payload :payload
	}
}

export function updateOrder (total,menuId,menu) {
	return (dispatch) => {
		menu.forEach(el => {
			if(el.id === menuId) {
				el.amount++
				el.serveTime = el.amount*el.cookDuration
				total += el.price
			}
		})
		let payload = {
			totalPrice: total,
			loading: false,
			menu : [
				...menu
			]
		}
		dispatch(updatinFoodOrder(payload))
	}
}
export function orderFood (orderMenu,history) {
	return (dispatch)=> {
		console.log(orderMenu)
		let cookDuration = []
		let amount = []
		let DishId = []
		orderMenu.forEach(el=>{
			if(el.amount !== 0 ) {
				cookDuration.push(el.serveTime)
				amount.push(el.amount)
				DishId.push(el.id)
			}
		})

		axios.post('http://localhost:3100/orderFood',{
			DishId: DishId,
			amount: amount,
			cookDuration: cookDuration
		},{
			headers: {
				'Content-Type': 'application/json;charset=UTF-8',
				'token': localStorage.getItem('token')
			}
		}).then(response=>{
			console.log(response)
			if(response.data.length !== 0) {
				history.push('/myorder')
			} else  {
				alert('order tidak boleh kosong')
			}
		}).catch(err=>{
			alert('invalid order')
		})
	}
}
export function fetchFood () {
	return (dispatch) => {
		axios.get('http://localhost:3100/dishes')
		.then(response => {
			console.log('responsna nih', response)
			if(response.data) {
				let payload = {
					totalPrice: 0,
					loading: false,
					menu:[
						...response.data
					]
				}
				payload.menu.forEach(el=>{
					el.amount = 0
					el.serveTime = 0
				})
				// console.log('ini payload', payload)
				dispatch(foodFetched(payload))
			}
		}).catch(err => {
			console.log(err)
		})
	}
}

