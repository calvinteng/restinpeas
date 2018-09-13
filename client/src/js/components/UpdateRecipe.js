import React, { Component } from 'react';
import axios from 'axios';
import { Modal, Form, Input, Button } from 'antd';

const { TextArea } = Input;
const FormItem = Form.Item;

const querystring = require('querystring');
const config = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json'
  }
};

class UpdateRecipe extends Component {
	constructor(props){
		super();
		this.state = {
			author: "",
		    title: "",
		    description: "",
		    servings: 0,
		    ingredients: [],
		    directions: "",
		    modalIsOpen: false,
		    confirmDirty: false,
    		autoCompleteResult: [],
		}

		this.update = this.update.bind(this);
		this.onClick = this.onClick.bind(this);
		this.handleTextChange = this.handleTextChange.bind(this);
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
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

  	handleWebsiteChange = (value) => {
	    let autoCompleteResult;
	    if (!value) {
	      autoCompleteResult = [];
	    } else {
	      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
	    }
	    this.setState({ autoCompleteResult });
  	}


	componentDidMount() {
		this.setState({
			id: this.props.recipe._id,
			author: this.props.recipe.author,
			title: this.props.recipe.title,
			description: this.props.recipe.description,
			servings: this.props.recipe.servings,
			ingredients: this.props.recipe.ingredients,
			directions: this.props.recipe.directions
		})
	}

	openModal() {
		this.setState({
			modalIsOpen: true
		})
	}

	closeModal() {
		this.setState({
			modalIsOpen: false,
		})
	}

	handleTextChange(e) {
	    switch(e.target.name) {
	      case "title":
	        this.setState({ title: e.target.value });
	        return;
	      case "description":
	        this.setState({ description: e.target.value });
	        return;
	      case "servings":
	        this.setState({ servings: e.target.value });
	        return;
	      case "directions":
	        this.setState({ directions: e.target.value });
	        return;
	      case "ingredients":
	        const ingredientsStrToArr = e.target.value.split('\n');
	        this.setState({ ingredients: ingredientsStrToArr });
	        return;
	      default:
	        return;
	    }
    }

    onClick(e) {
    	e.preventDefault();
    	const newRecipe = {
    		_id: this.props.recipe._id,
    		author: this.state.author,
		    title: this.state.title,
		    description: this.state.description,
		    servings: this.state.servings,
		    ingredients: this.state.ingredients,
		    directions: this.state.directions,
    	}

    	this.update(this);
    	this.props.completeUpdate(newRecipe, this.props.recipe._id);
    	this.closeModal();
    }

    update(e) {
    	axios.put('http://localhost:5000/api/update-recipe/'+e.props.recipe._id,
	      querystring.stringify(
	      {
	      	_id: e.props.recipe._id,
	      	author: e.state.author,
	        title: e.state.title,
	        description: e.state.description,
	        servings: e.state.servings,
	        ingredients: e.state.ingredients,
	        directions: e.state.directions
	      }), 
	      config )
	      .then((response) => {
	        console.log(response.data);
	      })
	      .catch((error) => {
	        console.log(error);
	      })
	}



	render() {
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

		return (
			<div key={this.props.recipe._id}>
				<Button onClick={this.openModal}>Edit Recipe</Button>
				<Modal
					title="Edit Recipe"
					visible={this.state.modalIsOpen} 
					onOk={this.onClick}
					onCancel={this.closeModal}
					centered
				>
				      <Form onSubmit={this.handleSubmit}>
				        <FormItem {...formItemLayout} label="Title">
							<Input type="text" id="title" name="title" value={this.state.title} onChange={this.handleTextChange}/>
				        </FormItem>
				        <FormItem {...formItemLayout} label="Author">
							<p type="text" id="author" name="author">{this.state.author}</p>
				        </FormItem>
				        <FormItem {...formItemLayout} label="Description">
							<Input type="text" id="description" name="description" value={this.state.description} onChange={this.handleTextChange}/>
				        </FormItem>
				        <FormItem {...formItemLayout} label="No. of Servings">
							<Input label="Servings" type="text" id="servings" name="servings" value={this.state.servings} onChange={this.handleTextChange}/>
				        </FormItem>
				        <FormItem {...formItemLayout} label="Ingredients">
							<TextArea rows={4} type="text" id="ingredients" name="ingredients" placeholder="Enter an ingredient for every line." value={this.state.ingredients.join('\n')} onChange={this.handleTextChange}/>
				        </FormItem>
				        <FormItem {...formItemLayout} label="Directions">
							<TextArea rows={4} type="text" id="directions" name="directions" value={this.state.directions} onChange={this.handleTextChange}/>
				        </FormItem>
				      </Form>

				</Modal>
			</div>
		)
	}
}

export default UpdateRecipe;