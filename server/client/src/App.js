import './App.css';
import Main from './components/Main';
import About from './components/About';
import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Axios from 'axios';
import './styles/Login.css'
import axios from 'axios';

export class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      IsLoggedIn: false,
      showLogin: true,
      btnText: 'Register',
      usernameReg: '',
      passwordReg: '',
      message: '',
      firstname: '',
      lastname: '',
      password: '',
      phoneNo: '',
      email: '',
      show_reset: false,
      username:'Norbert'
    }

    this.requestRegistration = this.requestRegistration.bind(this);
    this.loginRequest = this.loginRequest.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.changeHandler = this.changeHandler.bind(this)
    this.toggleReset = this.toggleReset.bind(this)
    this.resetDetails = this.resetDetails.bind(this)
    // this.register = this.register.bind(this)

  }

  toggleForm() {

    if (this.state.showLogin === true) {
      this.setState({ showLogin: false, btnText: "Register" }, () => {
        document.getElementById('loginform').style.display = "block"
        document.getElementById('registerform').style.display = "none"
      })
    } else {
      this.setState({ showLogin: true, btnText: "Login" }, () => {
        document.getElementById('registerform').style.display = "block"
        document.getElementById('loginform').style.display = "none"
      })
    }
  }

  changeHandler(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  //to post to the databse  
  loginRequest(e) {
    e.preventDefault();
    if (this.state.usernameReg === '' || this.state.passwordReg === '') {
      alert("Please input login credentials")
    } else {
      Axios.post('/userlogin', {
        username: this.state.usernameReg,
        password: this.state.passwordReg
      })
        .then((res) => {
          console.log(res.data)
          // alert(res.data);
          this.setState({
            IsLoggedIn: res.data.IsLoggedIn,
            username:res.data.usernamee
          })
        })
        .catch((err) => {
          alert(err.message);
        })
    }

  }


  requestRegistration(e) {
    e.preventDefault();
    if (this.state.firstname === '' || this.state.lastname === '' || this.state.password === '' ||
      this.state.phoneNo === '' || this.state.email === '') {
      alert("Please fill in the input fields")
    } else {
      Axios.post('/registerrequest', {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        pass: this.state.password,
        phone: this.state.phoneNo,
        email: this.state.email
      })
        .then((res) => {
          this.setState({
            IsLoggedIn: res.data
          })
        })
        .catch((err) => {
          alert(err.message);
        })
    }
  }

  resetDetails(e){
    e.preventDefault();
    if(this.firstname==''|| this.lastname==''||this.phoneNo==''||this.password==''){
      alert('Fields cannot be empty')
    }else{
      axios.post('/rs', {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        phone: this.state.phoneNo,
        pass: this.state.password,

      })
      .then((res) => {
        this.setState({
          IsLoggedIn: res.data
        })
      })
      .catch((err) => {
        alert(err.message)
      })
    }
  }

  toggleReset(){
    (!this.state.show_reset) ? 
    this.setState({show_reset: true})
    :
    this.setState({show_reset: false})
  }


  render() {
    return (
      <div>
        {(this.state.IsLoggedIn ?
          <Main username={this.state.username} />
          :
          <div className="login-register-wrapper">
            <div className="nav-buttons">
              <button id="loginBtn" class="active toggle-btn" onClick={this.toggleForm}>{this.state.btnText}</button>
            </div>
            <div className="form-group">
              <form id='loginform'>
                <label for="username">USERNAME/EMAIL</label>
                <input type="text" name="usernameReg" value={this.state.usernameReg} onChange={this.changeHandler} id="username" />
                <label for="password">PASSWORD</label>
                <input type="password" name="passwordReg" value={this.state.passwordReg} onChange={this.changeHandler} id="password" required />
                <input type="button" className="submit" value="login" onClick={this.loginRequest} />
              </form>
              <form id="registerform">
                <label for="fname">FIRST NAME</label>
                <input type="text" id="fname" name="firstname" value={this.state.firstname} onChange={this.changeHandler} required />
                <label for="lname" >LAST NAME</label>
                <input type="text" id="lname" name="lastname" value={this.state.lastname} onChange={this.changeHandler} required />
                <label for="password" >PASSWORD</label>
                <input type="password" id="pass" name="password" value={this.state.password} onChange={this.changeHandler} required />
                <label for="cpassword">CONFIRM PASSWORD</label>
                <input type="password" id="pass" name="password" required />
                <label for="phone" >PHONE NUMBER</label>
                <input type="tel" id="phone" name="phoneNo" value={this.state.phone} onChange={this.changeHandler} required />
                <label for="email">EMAIL ADDRESS</label>
                <input type="email" id="email" name="email" value={this.state.email} onChange={this.changeHandler} required />
                <input type="button" value="register" className="submit" onClick={this.requestRegistration} />
              </form>

            </div>
            <div className="reset-panel">
              <button onClick={this.toggleReset}>Reset Login Details?</button>
              {
                this.state.show_reset ?
                  <>
                    <div>
                      <input type="text" name='firstname' value={this.state.firstname} onChange={this.changeHandler}placeholder="Enter Firstname" />
                      <input type="text" name='lastname' value={this.state.lastname} onChange={this.changeHandler}placeholder="Enter lastname" />
                      <input type="text" name='phoneNo' value={this.state.phoneNo} onChange={this.changeHandler}placeholder="Enter Phone-number" />
                      <input type="text" name='password' value={this.state.password} onChange={this.changeHandler}placeholder="Enter New password" />
                      <input type="text" name='password' value={this.state.password} onChange={this.changeHandler}placeholder="Confirm New password" /><br />
                    </div>
                    <button onClick={this.resetDetails}>Submit</button>
                  </>
                  :
                  null
              }
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default App