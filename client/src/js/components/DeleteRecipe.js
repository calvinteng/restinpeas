import React, { Component } from 'react';
import { Button } from 'antd';

class DeleteRecipe extends Component {
	constructor(props){
		super();
		this.onClick = this.onClick.bind(this);
	}

	onClick(e) {
		e.preventDefault();
		this.props.onDelete(this.props.id);
	}

	render() {
		return (
			<Button onClick={this.onClick}>Delete</Button>
		)
	}
}

export default DeleteRecipe;