import axios from 'axios'

function adminloaded (payload) {
	return {
		type: 'ADMIN_LOADED',
		payload: payload
	}
}

function userDeleted (payload){
	return {
		type: 'DELETED_USER',
		payload:payload
	}
}

export function deleteUser (users,userId) {
	return (dispatch) => {
		axios.delete('http://localhost:3100/users/'+userId)
			.then(response=>{
				console.log(response,'ini apa ya?')
				if(response.status === 200) {
					let newUserlist = users.filter(el=> el.id !== userId)
					console.log(newUserlist)
					let payload = {
						loading: false,
						users: [
							...newUserlist
						]
					}
					dispatch(userDeleted(payload))
				}
			}).catch(err => {
				console.log(err)
			})
	}
}

export function adminFetchData () {
	return (dispatch)=> {
		axios.get('http://localhost:3100/users')
		.then(response=> {
			console.log(response.data.data)
			if(response.status === 200) {
				let payload = {
					loading: false,
					users: [
						...response.data.data
					]
					
				}
				console.log(payload,'aaa')
				dispatch(adminloaded(payload))
			}
		}).catch(err=>{
			console.log(err)
		})
	}
}