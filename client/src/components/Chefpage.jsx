import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Layout, Icon, Button, Card } from 'antd';
import { fetchedMenu, updatingMenuToCook} from '../store/Actions/chefActions'
const { Header, Footer, Content } = Layout;
const { Meta } = Card;

class Chefpage extends Component {
	componentWillMount () {
		if (!localStorage.getItem('token')) {
			this.props.history.push('/')
		} else if (localStorage.getItem('role') !== 'chef') {
			this.props.history.push('/')
		}
		this.props.fetchedMenu()
	}
	updateOrder = (menu,orderId) => {
		console.log(menu,orderId,'ini halala')
		this.props.updatingMenuToCook(menu,orderId)
	}
	render() {
		if(this.props.loading){
			return (
				<h1> loading... </h1>
			)
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
				<Content>
					<div style={{
						display: 'flex',
						flexWrap: 'wrap',
						justifyContent: 'center',
					}}> 
					{
						this.props.menu.map(el=>{
							if(el.status === false ) {
								return (
									<Card
										// hoverable
										style={{ width: 240, padding: 10 }}
										cover={<img alt="example" src={el.Dish.image} />}>
										<Meta
											title={el.Dish.name}
											description=''
										/>
										<p>Jumlah: {el.amount} porsi</p>
										<p> order num : {el.id} </p>
										<p> Order by: {el.User.name}</p>
										<Button
										type='primary'
										onClick={
											()=> this.updateOrder(this.props.menu,el.id)
										}
										> Done </Button>
									</Card>
								)
							} else {
								return (
									<h1> Next Order >> </h1>
								)
							}
					})
					}
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
};

const mapStateToProps = state =>({
	loading: state.chefReducer.loading,
	menu: state.chefReducer.menu
})

const mapDispatchToProps = dispatch=>(bindActionCreators({
	fetchedMenu,
	updatingMenuToCook
},dispatch))

export default connect(mapStateToProps,mapDispatchToProps)(Chefpage)