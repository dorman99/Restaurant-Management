import axios from 'axios'

function fetchinUser (payload) {
	return {
		type: 'FETCH_EDIT',
		payload: payload
	}
}

function userEditing (payload) {
	// console.log('ini??', payload)
	return {
		type: 'EDITING_USER',
		payload: payload
	}
}
export function saveEditUser (savedUser,pusher) {
	return (dispatch)=>{
		axios.put('http://localhost:3100/users/'+savedUser.id,{
			...savedUser
		}).then(resp=>{
			console.log(resp)
			if(resp.data.msg == 'data berhasil diupdate') {
				pusher('/admin')
			}
		}).catch(err=>{
			console.log(err)
		})
	}
}

export function handleEdit (newUser) {
	return (dispatch)=> {
		let payload = {
			loading: false,
			user: {
				...newUser
			}
		}
		dispatch(userEditing(payload))
	}
}

export function fetchedEdit(user) {
	return (dispatch)=>{
		let payload = {
			loading: false,
			user:{
				...user
			}
		}
		dispatch(fetchinUser(payload))
	}
}