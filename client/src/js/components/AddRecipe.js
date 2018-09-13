import React, { Component } from 'react';
import axios from 'axios';
import antd from 'antd';
import Dropzone from 'react-dropzone';

const { Form, Input, Upload, message, Button, Icon } = antd;
const FormItem = Form.Item;
const { TextArea } = Input;

const querystring = require('querystring');
const config = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json'
  }
};

class AddRecipe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      author: "",
      title: "",
      description: "",
      servings: 0,
      ingredients: [],
      directions: "",
      selectedFile: [],
    };

    this.onDrop = this.onDrop.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.insertNewRecipe = this.insertNewRecipe.bind(this);
    this.getUser = this.getUser.bind(this);
  }

  componentDidMount() {
    this.getUser();
  }

  onDrop(e) {
    this.setState({selectedFile: e.target.value});
    console.log(this.state.selectedFile);
  }

  getUser() {
    const username = localStorage.getItem('username');
    axios.get('http://localhost:5000/api/get-user/'+username)
      .then((response) => {
        console.log(response.data);
        this.setState({ author: response.data.user[0].tagname })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.insertNewRecipe(this);
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (err) {
        console.log(err);
      }
    });
  }

  insertNewRecipe(e) {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
   
    axios.post('http://localhost:5000/api/upload-img', this.state.selectedFile)

    axios.post('http://localhost:5000/api/insert-recipe',
      querystring.stringify(
      {
        author: e.state.author,
        title: e.state.title,
        description: e.state.description,
        servings: e.state.servings,
        ingredients: e.state.ingredients,
        directions: e.state.directions,
      }), 
      config )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
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
      const dropzoneStyle = {
       width  : "50%",
       height : "100%",
       border : "1px solid black",
       padding: "10px",
       margin: "auto"
      };
      const listStyle = {
       width  : "50%",
       height : "100%",
       padding: "10px",
       margin: "auto"
      };

      return (
        <div>
          <Form onSubmit={this.handleSubmit}>

              {localStorage.getItem('username') === null && <span>Login is required to add a recipe.<br/></span>}

              <form action="/upload" enctype="multipart/form-data" method="post">
                File <input type="file" name="img" accept="image/*" onChange={this.onDrop} />
              </form>

              <FormItem {...formItemLayout} label="Title">
                {getFieldDecorator('title', {
                  rules: [{ required: true, message: 'Please input a title.' }],
                })(
                  <Input name="title" onChange={this.handleTextChange} style={{ width: '25%'}} />
                )}
              </FormItem>

              <FormItem {...formItemLayout} label="Description">
                {getFieldDecorator('description', {
                  rules: [{ required: true, message: 'Please input a description.' }],
                })(
                  <Input name="description" onChange={this.handleTextChange} style={{ width: '40%'}} />
                )}
              </FormItem>

              <FormItem {...formItemLayout} label="Servings">
                {getFieldDecorator('servings', {
                  rules: [{ required: true, message: 'Please enter an amount.' }],
                })(
                  <Input name="servings" onChange={this.handleTextChange} style={{ width: '5%'}} />
                )}
              </FormItem>

              <FormItem {...formItemLayout} label="Ingredients">
                {getFieldDecorator('ingredients', {
                  rules: [{ required: true, message: 'Please enter ingredients to your recipe.' }],
                })(
                  <TextArea rows={4} name="ingredients" onChange={this.handleTextChange} placeholder="Enter an ingredient on every line" style={{ width: '50%'}}/>
                )}
              </FormItem>

              <FormItem {...formItemLayout} label="Directions">
                {getFieldDecorator('directions', {
                  rules: [{ required: true, message: 'Please enter some directions to your recipe.' }],
                })(
                  <TextArea rows={4} name="directions" onChange={this.handleTextChange} style={{ width: '50%'}}/>
                )}
              </FormItem>

              <FormItem {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">Add Recipe</Button>
              </FormItem>
          </Form>   
        </div>
      );
   }
}

const WrappedAddRecipeForm = Form.create()(AddRecipe);
export default WrappedAddRecipeForm;