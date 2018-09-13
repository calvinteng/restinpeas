import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class DisplayRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
    };

    this.getData = this.getData.bind(this);
    this.completeAdd = this.completeAdd.bind(this);
    this.parseJwt = this.parseJwt.bind(this);
  }

  componentDidMount() {
    this.getData();
    //this.parseJwt();
  }


  parseJwt() {
      const token = localStorage.getItem('jwtToken');
      console.log(token);
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace('-', '+').replace('_', '/');
            console.log(JSON.parse(window.atob(base64)))
            return JSON.parse(window.atob(base64));
    };

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

  completeAdd(newRecipe) {
    this.setState({
      recipes: [...this.state.recipes, newRecipe]
    });
  }

  render() {
    return (
      <div>
          <h2>Recipes</h2><br/>
          {
            this.state.recipes.map((recipe, i) => {
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
              )
            })
          }
      </div>
    );
  }
}

export default DisplayRecipe;