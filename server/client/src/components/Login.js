import React, { useState, Component } from 'react'
import Axios from 'axios'
import '../styles/Login.css'

export class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            showLogin: true,
            btnText: 'Register',
            usernameReg: '',
            passwordReg: '',
            message: ''


        }
        this.toggleForm = this.toggleForm.bind(this);
        this.changeHandler = this.changeHandler.bind(this)
        this.register = this.register.bind(this)

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

    // register(){
    //     Axios.post('http://localhost:3001/Login', {
    //         username: username,
    //         password: password
    //     }).then((response)=>{
    //         console.log(response)
    //     });
    // }
    changeHandler(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    //to post to the databse
    register(e) {
        e.preventDefault();
        if (this.state.usernameReg === '' || this.state.passwordReg === '') {
            alert("cannot be empty")
        } else {
            Axios.post('/userlogin', {
                username: this.usernameReg,
                password: this.passwordReg
            }).then((response) => {
                console.log(response)
            }).catch((err) => {
                alert(err.message);

            })
        }

    }

    render() {

        return (
            /*
            <div class="login-page" style={{ height: "100vh"}}>
                
                <div class="form">
                    <form action="/registration" method="POST" class="registration-form" >
                        <input type="text" name="fname" placeholder="First Name"></input><br/>
                        <input type="text" name="lname" placeholder="Last Name"></input><br/>
                        <input type="password" name="pass" placeholder="Password"></input><br/>
                        <input type="password" name="cpass" placeholder="Confirm Password"></input><br/>
                        <input type="tel" name="phone" placeholder="Phone Number"></input><br/>
                        <input type="email" name="email" placeholder="Email Address"></input><br/>
                        <button value="submit">Register</button>
                        <p class="message">Already registerd? <a href="#">Login</a></p>

                    </form>
                    <form>
                        <input type="text" name="username" placeholder="User Email"></input><br/>
                        <input type="password" name="pass" placeholder="Password"></input><br/>
                        <button value="submit">Login</button>
                        <p class="message">Not registerd? <a href="#">Register</a></p>
                    </form>
                </div>
            </div>*/
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
                        <input type="button" value="login" className="submit" onClick={this.register} />
                    </form>
                    <form id="registerform">
                        <label for="fname">FIRST NAME</label>
                        <input type="text" id="fname" required />
                        <label for="lname" >LAST NAME</label>
                        <input type="text" id="lname" required />
                        <label for="password" >PASSWORD</label>
                        <input type="password" id="pass" required />
                        <label for="cpassword">CONFIRM PASSWORD</label>
                        <input type="password" id="pass" required />
                        <label for="phone" >PHONE NUMBER</label>
                        <input type="tel" id="phone" required />
                        <label for="email">EMAIL ADDRESS</label>
                        <input type="email" id="email" required />
                        <input type="submit" value="register" className="submit" />
                    </form>

                </div>
                <div className="forgt-panel">
                    <button onClick={this.props.action}>Login</button>
                    <a href="#">Reset Password</a>
                </div>
            </div>
        );
    }
}



export default Login
