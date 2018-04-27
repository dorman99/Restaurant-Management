import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { handleFormInput, submitLogin} from '../store/Actions/loginActions'
import { formOnchange, SumbitSignUp} from '../store/Actions/signupActions'
import { Layout, Form, Icon, Input, Button, Checkbox } from 'antd';
const { Header, Footer, Content } = Layout;
const FormItem = Form.Item;

class Landingpage extends Component {
	componentDidMount() {
		if(localStorage.getItem('token') && localStorage.getItem('role') == 'customer') {
			// console.log('aa', this.props.history.push('/customers'))
			this.props.history.push('/customers')
		} else if (localStorage.getItem('token') && localStorage.getItem('role') == 'chef'){
			this.props.history.push('/chef')
		} else if (localStorage.getItem('token') && localStorage.getItem('role') == 'admin') {
			this.props.history.push('/admin')
		}
	}
	render() {
		return (
			<div>
				<Layout>
					<Header style={{background: 'grey'}}>
					</Header>
					<Content className="container" style={{ display: 'flex', justifyContent: 'space-around',paddingBottom: '70px'}}>
						<div> 
							<h1> Login Form </h1>
						<Form onSubmit={this.handleSumbitLogin} className="login-form">
							<FormItem>
								<Input name='username' onChange={this.handleOnChangeLogin} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" value={this.props.loginForm.username} />
							</FormItem>
							<FormItem>
								<Input name='password' type="password" onChange={this.handleOnChangeLogin} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Password" value={this.props.loginForm.password} />
							</FormItem>
							<FormItem>
								<Button onClick={this.handleSumbitLogin} htmlType='submit' type="primary"> Login</Button>
							</FormItem>
						</Form>
						</div>

						<div style={{paddingTop: '10px'}}>
							<img src={require('../assets/logo.png')} width="100" height="50" />
						</div>

						<div>
							<h1> Signup Form </h1>
							<Form onSubmit={this.handleSubmit} className="login-form">
								<FormItem>
									<Input name="name" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Name" value={this.props.signupForm.name} onChange={this.handleOnChange}/>
								</FormItem>
								<FormItem>
									<Input name="username" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" value={this.props.signupForm.username} onChange={this.handleOnChange} />
								</FormItem>
								<FormItem>
									<Input type="password" name="password" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Password" value={this.props.signupForm.password} onChange={this.handleOnChange} />
								</FormItem>
								<FormItem>
									<Button onClick={this.handleSubmit} htmlType="submit" type="primary"> Sign-up</Button>
								</FormItem>
							</Form>
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
			</div>
		)
	}
	handleOnChangeLogin = e=> {
		let loginForm = {
			...this.props.loginForm,
			[e.target.name]: e.target.value
		}
		this.props.handleFormInput(loginForm)
	}
	handleSumbitLogin = e => {
		e.preventDefault()
		// console.log('halu lu tolol')
		this.props.submitLogin(this.props.loginForm,(url)=> {
			this.props.history.push(url)
		})
	}
	handleSubmit = e => {
		e.preventDefault()
		let uname = new RegExp('^[a-z0-9_-]{3,15}$')
		let unameCheck = uname.test(this.props.signupForm.username)
		if(unameCheck) {
			this.props.SumbitSignUp(this.props.signupForm)
		} else {
			alert('invalid username input')
		}
	}
	handleOnChange = e => {
		let newUser = {
			...this.props.signupForm,
			[e.target.name]: e.target.value
		}
		this.props.formOnchange(newUser)
	}
};

const mapStateToProps = state => ({
	signupForm: state.signupReducer,
	loginForm: state.loginReducer
})

const mapDispatchToProps = dispatch => (bindActionCreators({
	formOnchange,
	SumbitSignUp,
	handleFormInput,
	submitLogin
},dispatch))

export default connect(mapStateToProps,mapDispatchToProps)(Landingpage)