import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Form, Icon, Input, Button, Checkbox } from 'antd';

const FormItem = Form.Item;

const querystring = require('querystring');
const config = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json'
  }
};

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: '',
			password: '',
			message: ''
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleTextChange = this.handleTextChange.bind(this);
		this.login = this.login.bind(this);
		this.renderLoginErrorMessage = this.renderLoginErrorMessage.bind(this);
	}

	handleTextChange(e) {
		switch(e.target.name) {
			case "username":
				this.setState({ username: e.target.value });
				return;
			case "password":
				this.setState({ password: e.target.value });
				return;
			default:
				return;
		}
	}

	handleSubmit(e) {
		e.preventDefault();
		this.login(this);
		this.props.form.validateFields((err, values) => {
			if(!err) {
				console.log('Successful login.');
			}
		})
	}

	login(e) {
		axios.post('http://localhost:5000/api/login',
			querystring.stringify(
				{
					username: e.state.username,
					password: e.state.password
				}),
			config )
			.then((response) => {
				localStorage.setItem('username', this.state.username);
				localStorage.setItem('jwtToken', response.data.token);
				this.setState({message: ''});
				this.props.checkLogin(response.data.user);
				this.props.history.push('/');
				console.log(response.data);
			})
			.catch((error) => {
				this.setState({message: 'Login failed. Username or password do not match.'});
				console.log(error);
			})
	}

	renderLoginErrorMessage() {
		if(this.state.message !== '') {
			return (
				<span>
					<h4>{this.state.message}</h4>
				</span>
			);
		}
	}

	render() {
	    const { getFieldDecorator } = this.props.form;
	    return (
	      <Form onSubmit={this.handleSubmit} className="login-form" align="middle">
			{this.renderLoginErrorMessage()}
	        <FormItem>
	          {getFieldDecorator('userName', {
	            rules: [{ required: true, message: 'Please input your username!' }],
	          })(
	            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} name="username" onChange={this.handleTextChange} required style={{width: '20%'}} placeholder="Username" />
	          )}
	        </FormItem>
	        <FormItem>
	          {getFieldDecorator('password', {
	            rules: [{ required: true, message: 'Please input your Password!' }],
	          })(
	            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} name="password" onChange={this.handleTextChange} required style={{width: '20%'}} type="password" placeholder="Password" />
	          )}
	        </FormItem>
	        <FormItem>
	          {getFieldDecorator('remember', {
	            valuePropName: 'checked',
	            initialValue: true,
	          })(
	            <Checkbox>Remember me</Checkbox>
	          )}
	          {/*<a className="login-form-forgot" href="">Forgot password</a>*/} <br/>
	          <Button type="primary" htmlType="submit" className="login-form-button">Log in</Button> <br/>
	          Or <Link to="/register">register now!</Link>
	        </FormItem>
	      </Form>
	    );
	}
}

const WrappedNormalLoginForm = Form.create()(Login);
export default WrappedNormalLoginForm;