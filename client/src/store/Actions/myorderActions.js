import axios from 'axios'
export function myOrderedFood() {
	return (dispatch)=> {
		axios.get('http://localhost:3100/orderFood', {
			headers: {
				'Content-Type': 'application/json;charset=UTF-8',
				'token': localStorage.getItem('token')
			}}).then(response => {
				response.data.forEach(el=>{
					if(el.DishId == el.Dish.id) {
						el.price = el.Dish.price * el.amount
					}
				})
				let payload = {
					loading: false,
					menu: [
						...response.data 
					]
				}
				dispatch(myorderFetched(payload))
				// console.log(response)
			}).catch(err=>{
				console.log(err)
			})
	}
}

function myorderFetched (payload) {
	return{
		type: 'LOADING_MY_ORDER',
		payload: payload
	}
}