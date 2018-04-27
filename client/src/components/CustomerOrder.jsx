import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchFood, foodFething, updateOrder, orderFood} from '../store/Actions/foodActions'
import { bindActionCreators } from 'redux';
import { Layout, Icon, Button, Card } from 'antd';
const { Header, Footer, Content } = Layout;
const { Meta } = Card;

class Customer extends Component {
	componentWillMount () {
		// console.log('haha', localStorage.getItem('role') == 'customer')
		if (!localStorage.getItem('token') ) {
			this.props.history.push('/')
		} else if (localStorage.getItem('role') == 'chef' || localStorage.getItem('role') == 'admin') {
			this.props.history.push('/')
		}
		this.props.fetchFood()
		// console.log(this.props)
	}

	addFoodToOrder = (total,foodId,menu) => {
		this.props.updateOrder(total,foodId,menu)
	}
	orderFood = () => {
		this.props.orderFood(this.props.foodList.menu,this.props.history)
	}
	render() {
		console.log(this.props.foodList.loading)
		if(this.props.foodList.loading) {
			console.log('ini if',)
			return (<h1>loading...</h1>)
		} else if(!this.props.foodList.loading) {
			console.log('ini else ', this.props.foodList.loading)
			return (
				<Layout> 
					<Header
					style={{background: 'grey'}}
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
									this.props.history.push('/myorder')
								}
							}
							type='dashed' ghost>My Orders</Button>
							&nbsp;
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
					style={{
						padding: '50px' 
					}}>
						<div style={styles.cards}>
							{this.props.foodList.menu.map(food=>(
							<Card
							// hoverable
								style={{ width: 240 ,padding: 10}}
							  cover={<img alt="example" src={food.image}/>}> 
								<Meta
									title= {food.name}
									description = {food.desc.substring(0,100)}
								/>
								<br/>
								<p>Price : {food.price}</p>
								<p>Waktu Masak (/pcs): {food.cookDuration} menit</p>
								<p> Waktu Penyajian (jumlah * Waktu Masak): {food.serveTime} menit </p>
								<p> Jumlah dipesan: {food.amount} </p>
								<p>
										<Icon 
										onClick={
										()=>this.addFoodToOrder(this.props.foodList.totalPrice,food.id,this.props.foodList.menu)
										}
										type="plus" />
								</p>
							</Card>
							))} 
						</div>
						<br/>
						<p>Total Price: {this.props.foodList.totalPrice} Rupiah</p>
						<Button type="primary"
						onClick = {
							()=> this.orderFood()
						}
						> ORDER NOW </Button>
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
}

let styles = {
	cards: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'center',
		
	}
}

const mapStateToProps = state => ({
	foodList: state.foodReducer
})

const mapDispatchToProps = dispatch => (bindActionCreators({
	fetchFood,
	foodFething,
	updateOrder,
	orderFood
},dispatch))

export default connect(mapStateToProps, mapDispatchToProps)(Customer)