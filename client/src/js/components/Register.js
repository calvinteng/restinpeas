import React, { Component } from 'react';
import axios from 'axios';
import { Form, Input, Tooltip, Icon, Row, Col, Checkbox, Button } from 'antd';

const FormItem = Form.Item;

const querystring = require('querystring');
const config = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json'
  }
};

class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fname: '',
			lname: '',
			tagname: '',
			email: '',
			username: '',
			password: '',
			confirmDirty: false,
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleTextChange = this.handleTextChange.bind(this);
		this.addNewUser = this.addNewUser.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();
		this.addNewUser(this);
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				console.log('Registration complete.');
			}
		});
	}

	handleConfirmBlur = (e) => {
    	const value = e.target.value;
    	this.setState({ confirmDirty: this.state.confirmDirty || !!value });
	}

	compareToFirstPassword = (rule, value, callback) => {
    	const form = this.props.form;
    	if (value && value !== form.getFieldValue('password')) {
      		callback('Two passwords that you enter is inconsistent!');
    	} else {
      		callback();
    	}
	}

	validateToNextPassword = (rule, value, callback) => {
    	const form = this.props.form;
    	if (value && this.state.confirmDirty) {
			form.validateFields(['confirm'], { force: true });
    	}
		callback();
	}

	addNewUser(e) {
		axios.post('http://localhost:5000/api/register',
			querystring.stringify(
				{
					fname: e.state.fname,
					lname: e.state.lname, 
					tagname: e.state.tagname,
					email: e.state.email, 
					username: e.state.username,
					password: e.state.password
				}),
			config )
			.then((response) => {
				console.log(response.data);
				this.props.history.push('/login')
			})
			.catch((error) => {
				console.log(error);
			})
	}

	handleTextChange(e) {
		switch(e.target.name) {
			case "fname":
				this.setState({ fname: e.target.value });
				return;
			case "lname":
				this.setState({ lname: e.target.value });
				return;
			case "tagname":
				this.setState({ tagname: e.target.value });
				return;
			case "email":
				this.setState({ email: e.target.value });
				return;
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

	render() {
		const { getFieldDecorator } = this.props.form;

		const formItemLayout = {
			labelCol: {
	        	xs: { span: 24 },
	        	sm: { span: 8 },
      		},
	      	wrapperCol: {
	        	xs: { span: 24 },
	        	sm: { span: 16 },
	      	},
    	};
    	const tailFormItemLayout = {
	      	wrapperCol: {
	        	xs: {
	          		span: 24,
	          		offset: 0,
	        	},
	        	sm: {
	          		span: 16,
	          		offset: 8,
	        	},
	      	},
    	};

		return (
			<div>
				<Form onSubmit={this.handleSubmit}>
					<FormItem {...formItemLayout} label="First Name">
			          {getFieldDecorator('fname', {
			            rules: [{ required: true, message: 'Please input your first name!' }],
			          })(
			            <Input name="fname" onChange={this.handleTextChange} style={{ width: '25%'}} />
			          )}
			        </FormItem>

			        <FormItem {...formItemLayout} label="Last Name">
			          {getFieldDecorator('lname', {
			            rules: [{ required: true, message: 'Please input your last name!' }],
			          })(
			            <Input name="lname" onChange={this.handleTextChange} style={{ width: '25%'}} />
			          )}
			        </FormItem>

					<FormItem {...formItemLayout}
			          label={(
			            <span>
			              Tagname&nbsp;
			              <Tooltip title="The name that others will view.">
			                <Icon type="question-circle-o" />
			              </Tooltip>
			            </span>
			          )}
			        >
			          {getFieldDecorator('nickname', {
			            rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
			          })(
			            <Input name="tagname" onChange={this.handleTextChange} style={{ width: '25%'}} />
			          )}
			        </FormItem>

			        <FormItem {...formItemLayout} label="E-mail">
			          {getFieldDecorator('email', {
			            rules: [{
			              type: 'email', message: 'The input is not valid E-mail!',
			            }, {
			              required: true, message: 'Please input your E-mail!',
			            }],
			          })(
			            <Input name="email" onChange={this.handleTextChange} style={{ width: '25%'}} />
			          )}
			        </FormItem>

					<FormItem {...formItemLayout} label="Username">
			          {getFieldDecorator('username', {
			            rules: [{
			              required: true, message: 'Please input your username!',
			            }],
			          })(
			            <Input name="username" onChange={this.handleTextChange} style={{ width: '25%'}} />
			          )}
			        </FormItem>


			        <FormItem {...formItemLayout} label="Password">
			          {getFieldDecorator('password', {
			            rules: [{
			              required: true, message: 'Please input your password!',
			            }, {
			              validator: this.validateToNextPassword,
			            }],
			          })(
			            <Input name="password" type="password" onChange={this.handleTextChange} style={{ width: '25%'}} />
			          )}
			        </FormItem>

			        <FormItem {...formItemLayout} label="Confirm Password">
			          {getFieldDecorator('confirm', {
			            rules: [{
			              required: true, message: 'Please confirm your password!',
			            }, {
			              validator: this.compareToFirstPassword,
			            }],
			          })(
			            <Input type="password" onBlur={this.handleConfirmBlur} style={{ width: '25%'}} />
			          )}
			        </FormItem>
{/*
			        <FormItem {...formItemLayout} label="Captcha" extra="We must make sure that your are a human.">
			          <Row gutter={20}>
			            <Col span={5}>
			              {getFieldDecorator('captcha', {
			                rules: [{ required: true, message: 'Please input the captcha you got!' }],
			              })(
			                <Input style={{ width: '100%'}} />
			              )}
			            </Col>
			            <Col span={5}>
			              <Button>Get captcha</Button>
			            </Col>
			          </Row>
			        </FormItem>*/}

{/*			        <FormItem {...tailFormItemLayout}>
			          {getFieldDecorator('agreement', {
			            valuePropName: 'checked',
			          })(
			            <Checkbox>I have read the <a href="">Terms of Service</a></Checkbox>
			          )}
			        </FormItem>
*/}
			        <FormItem {...tailFormItemLayout}>
			          <Button type="primary" htmlType="submit">Register</Button>
			        </FormItem>
				</Form>

			</div>
		);
	}
}

const WrappedRegistrationForm = Form.create()(Register);
export default WrappedRegistrationForm;