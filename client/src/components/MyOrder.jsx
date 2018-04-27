import React, { Component } from 'react';
import { connect } from 'react-redux';
import {myOrderedFood} from '../store/Actions/myorderActions'
import { bindActionCreators } from 'redux';
import { Layout, Icon, Button, Card } from 'antd';
const { Header, Footer, Content } = Layout;
const { Meta } = Card;

class Myorder extends Component {
	componentDidMount () {
		this.props.myOrderedFood()
	}
	render() {
		if (this.props.loading) {
			return (
				<h1>loading...</h1>
			)
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
											// localStorage.clear()
											this.props.history.push('/customers')
										}
									}
									type='primary' ghost>Make Order</Button>
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
					<Content>
						<div style={{
							display: 'flex',
							justifyContent: 'center',
							flexWrap: 'wrap',
						}}>
							{this.props.orderedMenu.map(el=>{
								if(el.status == false ) {
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
										</Card>
									)
								}
								})}
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
	loading: state.myorderReducer.loading,
	orderedMenu: state.myorderReducer.menu
})
const mapDispatchToProps = dispatch=>(bindActionCreators({
	myOrderedFood
},dispatch))
export default connect(mapStateToProps,mapDispatchToProps)(Myorder)
