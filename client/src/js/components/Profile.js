import React, { Component } from 'react';
import axios from 'axios';
import DeleteRecipe from './DeleteRecipe';
import UpdateRecipe from './UpdateRecipe';

class Profile extends Component {
	constructor(props) {
		super(props);

		this.state = {
			fname: '',
			lname: '',
			tagname: '',
			username: '',
			recipes: []
		};

		this.getUserData = this.getUserData.bind(this);
		this.completeUpdate = this.completeUpdate.bind(this);
		this.deleteRecipe = this.deleteRecipe.bind(this);
		this.ifNoRecipes = this.ifNoRecipes.bind(this);
	}

	componentDidMount() {
		this.getUserData();
	}

	getUserData() {
		let self = this;
	    axios.get('http://localhost:5000/api/get-userinfo/'+self.props.match.params.tagname)
	      .then((response) => {
	        console.log(response.data);
	        self.setState({ 
	        	fname: response.data.user[0].fname,
	        	lname: response.data.user[0].lname,
	        	tagname: response.data.user[0].tagname,
	        	username: response.data.user[0].username,
				recipes: [...self.state.recipes, response.data.user[0].recipes[0]]
	        });
	      })
	      .catch((error) => {
	        console.log(error);
	      });
	}

	deleteRecipe(id){
	  axios.delete('http://localhost:5000/api/delete-recipe/'+id+'/'+this.state.user_id)
	    .then((response) => {
	      console.log(response.data);
	    })
	    .then((recipe) => {
	      let updatedRecipes = this.state.recipes.filter((recipe) => {
	        return id !== recipe._id;
	    });

	    this.setState({
 	      recipes: updatedRecipes
	    });
	      })
	    .catch((err) => {
	      console.error('err', err);
	    });
	}

	completeUpdate(newRecipe, id) {
	  this.setState({
	    recipes: this.state.recipes.map( recipe => {
	      return( recipe._id === id ? Object.assign({}, recipe, newRecipe) : recipe )
	    })
	  });
	}

	ifNoRecipes = () => {
		if(this.state.recipes !== null) {
			return (
						this.state.recipes.map(recipe => {
				            return(
				              <div key={recipe._id}>
				                <h3> { recipe.title } </h3>
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
				                {localStorage.getItem('username') === this.state.username &&
				                	<div>
						                <DeleteRecipe onDelete={this.deleteRecipe} id={recipe._id} />
						                <UpdateRecipe recipe={recipe} completeUpdate={this.completeUpdate} />
				            		</div>
				            	}
				              </div>
				            )
						})
				);
		} else {
			return <p> </p>
		}
	}

	render() {
		return (
			<div>
				<h2>{this.state.tagname}</h2>
				<h3>{this.state.fname} {this.state.lname}</h3>
				{this.ifNoRecipes}
	    	</div>
        );
	}
}

export default Profile;