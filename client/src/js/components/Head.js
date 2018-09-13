import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';

const { Header } = Layout;

class Head extends Component {

	logout = () => {
		localStorage.removeItem('jwtToken');
		localStorage.removeItem('username');
		window.location.replace("/");
	}

	render() {
		return(
			<div>
				<Layout>
				    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
				      <div className="logo" />
				      <Menu
				        theme="dark"
				        mode="horizontal"
				        defaultSelectedKeys={['0']}
				        style={{ lineHeight: '64px' }}
				      >
				        <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
				        {localStorage.getItem('username') && <Menu.Item key="2" style={{float: 'right'}}><Link to={"/add-recipe"}>Add Recipe</Link></Menu.Item> }
						{localStorage.getItem('jwtToken') === null && <Menu.Item key="3" style={{float: 'right'}}><Link to="/register">Register</Link></Menu.Item> }
		            	{localStorage.getItem('jwtToken') === null && <Menu.Item key="4" style={{float: 'right'}}><Link to="/login">Login</Link></Menu.Item> }
				        {localStorage.getItem('jwtToken') && <Menu.Item key="5" style={{float: 'right'}} onClick={this.logout}>Logout</Menu.Item> }
				        {localStorage.getItem('jwtToken') && <Menu.Item key="6" style={{float: 'right'}}><Link to={'/profile/'+this.props.user.tagname}>Profile</Link></Menu.Item> }
				      </Menu>
				    </Header>
				</Layout>
			</div>
		);
	}
}

export default Head;