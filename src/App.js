import Login from './components/Login';
import './App.css';
import Main from './components/Main';
import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      IsLoggedIn: false
    }
    
    this.AllowLogin=this.AllowLogin.bind(this);
  }
  AllowLogin() {
    this.setState({ IsLoggedIn: true })
  }

  render() {
    return (
      <div>
        {(this.state.IsLoggedIn ?
          <Main />
          :
          <Login action={this.AllowLogin}/>
        )}
      </div>
    )
  }
}

export default App
