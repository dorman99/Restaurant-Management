import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { adminFetchData, deleteUser} from '../store/Actions/adminActions'
import { Layout, Table, Icon, Divider,Button, Card } from 'antd';
const { Header, Footer, Content } = Layout;
const { Meta } = Card;


class Adminpage extends Component {
	constructor(props) {
		super(props)

		this.columns = [{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
		}, {
			title: 'Username',
			dataIndex: 'username',
			key: 'username',
		}, {
			title: 'Role',
			dataIndex: 'role',
			key: 'role',
		}, {
			title: 'Action',
			key: 'action',
			render: (text, record) => (
				<span>
					<Button
						onClick={
							() => {
								// console.log(this.props,'sAs')
								this.editUser(this.props.users, record.id)
							}
						}
						type='primary'> Edit Role</Button>
					<Divider type="vertical" />
					<Button
					onClick = {
						() => {
							this.deleteUser(this.props.users, record.id)
						}
					} 
					type='danger'>Delete</Button>
					<Divider type="vertical" />
				</span>
			),
		}];
	}
	editUser = (users,userId) => {
		console.log(userId,'--',users)
		this.props.history.push({pathname:'/edituser/'+userId,state:{users:users}})
	}
	deleteUser = (users,userId) => {
		console.log('delet nih',users,'--',userId)
		this.props.deleteUser(users,userId)
	}
	componentDidMount () {
		// console.log(localStorage.getItem('token'), '---', localStorage.getItem('role'))
		if(localStorage.getItem('role') !== 'admin') {
			this.props.history.push('/')
		}
		this.props.adminFetchData()
	}
	render() {
		if(this.props.loading) {
			return (<h1> loading... </h1>)
		} else {
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
							<Button
									onClick={
										() => {
											localStorage.clear()
											this.props.history.push('/')
										}
									}
									type='danger' ghost>Logout</Button>
							</div>
						</div>
					</Header>
					<Content
					style={{display: 'flex', justifyContent: 'center',}}>
						<div> 
							<Table 
							columns={this.columns}
							dataSource={this.props.users}>
							</Table>
						</div>
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
	}
};

const mapStateToProps = state => ({
	loading: state.adminReducer.loading,
	users : state.adminReducer.users
})

const mapDispatchToProps = dispatch =>(bindActionCreators({
	adminFetchData,
	deleteUser
},dispatch))

console.log(mapStateToProps)
export default connect(mapStateToProps,mapDispatchToProps)(Adminpage)

