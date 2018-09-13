import React, { Component } from 'react';
import axios from 'axios';
import { Route, Switch, Link } from 'react-router-dom';
import AddRecipe from './js/components/AddRecipe';
import DisplayRecipes from './js/components/DisplayRecipes';
import Login from "./js/components/Login";
import Register from "./js/components/Register";
import Profile from "./js/components/Profile";
import Head from "./js/components/Head";
import { Layout } from 'antd';

const { Content } = Layout;

class App extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	      recipes: [],
	      user: {},
	    };

	    this.getLoginStatus = this.getLoginStatus.bind(this);
	    this.LoginHelper = this.LoginHelper.bind(this);
	    this.getData = this.getData.bind(this);
	    this.Home = this.Home.bind(this);
	}

	componentDidMount() {
    	this.getData();
	}

	getLoginStatus = (u) => {
		this.setState({user: u});
		console.log(u);
	}

	getData() {
	    axios.get('http://localhost:5000/api/getAllRecipes')
	      .then((response) => {
	        console.log(response.data);
	        this.setState({ recipes: response.data.recipes })
	      })
	      .catch((error) => {
	        console.log(error);
	      });
	}

	LoginHelper = (props) => {
		return(
				<Login
					checkLogin={this.getLoginStatus}
					{...props}
				/>
			);
	}

	Home = (props) => {
	return(
			<HomePage
				recipes={this.state.recipes}
				{...props}
			/>
		);
	}


	render() {
	    return (
	      <div>
			<Head user={this.state.user} />
	        	<Content style={{ padding: '0 75px', marginTop: 100 }}>
			        <Switch>
			          <Route exact path="/" component={this.Home} />
			          <Route exact path="/login" component={this.LoginHelper}/>
			          <Route exact path="/register" component={Register}/>
			          <Route exact path="/add-recipe" component={AddRecipe}/>
					  <Route exact path="/profile/:tagname" component={Profile} />
					</Switch>
				</Content>
	      </div>
	    );
	}
}

const HomePage = (props) => {
	return(
		<div>
			<h2>Recipes</h2><br/>
			{
				props.recipes.map((recipe, i) => {
					return(
						<div key={recipe._id}>
				            <h3> { recipe.title } </h3>
				            <Link to={'/profile/'+recipe.author}> { recipe.author } </Link>
				            <p> { recipe.description } </p>
				            <p> Servings: { recipe.servings } </p>
				            <h5> Ingredients: </h5>
				            {
				                recipe.ingredients.map((ingredient) => {
									return(<ul key={ingredient}> - {ingredient} </ul>)
				                })
				            }
				            <h5> Directions: </h5>
				            <p> { recipe.directions } </p>
				        </div>
			        );
			    })
			}
		</div>
		);
	}

export default App;