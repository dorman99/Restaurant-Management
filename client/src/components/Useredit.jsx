import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Menu, Dropdown,Layout, Table, Icon, Divider, Button, Card,Input} from 'antd';
import { fetchedEdit, handleEdit, saveEditUser } from '../store/Actions/edituserActions'
const { Header, Footer, Content } = Layout;
const { Meta } = Card;

class Useredit extends Component {
	componentDidMount () {
		if(localStorage.getItem('role') !== 'admin') {
			this.props.history.push('/')
		}
		console.log(this.props.history.location, 'ini didmount', this.props.history.location.state == undefined)
		if(this.props.history.location.state == undefined) {
			this.props.history.push('/')
		} else {
			let id = Number(this.props.history.location.pathname.split('/').pop())
			console.log('ini id', id)
			let user =  this.props.history.location.state.users.filter(el=> el.id == id)
			console.log('ini user', user[0])
			// this.props.history.location.state
			this.props.fetchedEdit(user[0])
		}
		// this.props.fetchedEdit()
	}
	handleChangeType = e => {
		let edit = {
			...this.props.user,
			[e.target.name]: e.target.value
		}
		this.props.handleEdit(edit)
	}
	saveEdit = () => {
		console.log(this.props.user)
		this.props.saveEditUser(this.props.user,(url)=>{
			this.props.history.push(url)
		})
	}
	render() {
		if(this.props.loading) {
			return (<h1>loading...</h1>)
		}
		return (
			<Layout>
				<Header
					style={{ background: 'grey' }}
				>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between'
						}}>
						<div
						>
							<img src={require('../assets/logo.png')} width="100" height="50" />
						</div>
						<div>
							&nbsp;
								<Button
								onClick={
									() => {
										localStorage.clear()
										this.props.history.push('/')
										window.location.reload()
									}
								}
								type='danger' ghost>Logout</Button>
						</div>
					</div>
				</Header>
				<Content
				style={{
					display: 'flex',
					padding: '40px',
					justifyContent: 'center',
				}}>
					<Card title="Edit This User" extra={
						<Button
						onClick={()=>{
							this.saveEdit()
						}}>
						Save
						</Button>} style={{ width: 300 }}>
						<p>name : {this.props.user.name}</p>
						<p>username: {this.props.user.username}</p>
						<p>role : <Input
						name='role'
						onChange={
							this.handleChangeType
						}
						style={{textAlign:'center'}}
							value={this.props.user.role}></Input></p>
					</Card>
				</Content>
				<Footer style={{ background: 'grey' }}>
					<p>
						<strong>Project</strong> by <a href="https://github.com/dorman99">Dorman</a>. The source code is licensed
								<a href="http://opensource.org/licenses/mit-license.php"> MIT</a>. The website content
								is licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>.
							</p>
				</Footer>
			</Layout>
		)
	}
};
const mapStateToProps = state =>({
	loading: state.editReducer.loading,
	user: state.editReducer.user
})

const mapDispatchToProps = dispatch=>(bindActionCreators({
	fetchedEdit,
	handleEdit,
	saveEditUser
},dispatch))
export default connect(mapStateToProps,mapDispatchToProps)(Useredit)
