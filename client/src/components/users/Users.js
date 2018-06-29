import React, { Component } from 'react';
import './Users.css';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    }
  }

  componentDidMount() {
    fetch('/api/users')
      .then(res => res.json())
      .then(users => this.setState( { users }, () => console.log('Customers fetched...', users)));
  }

  render() {

    return (
      <div>
        <h2></h2>
        <ul>
          {this.state.users.map(user => 
            <li key={user._id}> { user.firstName } { user.lastName } </li>
          )}
        </ul>
      </div>
    );
  }
}

export default User;
