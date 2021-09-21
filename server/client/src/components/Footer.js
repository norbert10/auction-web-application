import React, { Component } from 'react'
import '../styles/Footer.css'
import axios from 'axios';

export class Footer extends Component {
    constructor(props){
        super(props);
        this.state={
            userId:this.props.userId,
            message:''
        }
        this.changeHandler=this.changeHandler.bind(this);
        this.userMessage = this.userMessage.bind(this)
    }
    changeHandler(e) {
        this.setState({ [e.target.name]: e.target.value })
      }
    
    userMessage(e){
        e.preventDefault()
        axios.post(`/messages`, {
            userId: this.state.userId,
            message: this.state.message
        })
        .then((res)=>{
            alert("message sent")
        })
        .catch((err)=>{
            alert(err.message)
        })
    }

    render() {
        return (
            <div>
                <div class="footer">
                <div class="footer-content">
                    <div class="footer-section about">
                        <h3>JB Auction</h3>
                        <p><em>JB Auction is an e-commerce which deals with auctioning. One can bid or auction any item anytime
                            anywhere.</em>
                        </p>
                        <p><em>Please you are free to reach us any time. We operate 24 hours</em></p>
                        <p><em>+254713 627939</em></p>
                        <p><em>info@jbauctions.co.ke</em></p>
                    </div>
                    <div class="footer-section links">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><a href="#">Events</a></li>
                            <li><a href="#">Contacts</a></li>
                            <li><a href="">Galleries</a></li>
                            <li><a href="#">Help</a></li>
                        </ul>
                    </div>
                    <div class="footer-section contact-forms">
                        <h3>Leave a Message/Report</h3>
                        <textarea type="text" name="message" id="message" cols="30" rows="5"value={this.state.message} onChange={this.changeHandler} />
                        <br />
                        <button class="send" onClick={this.userMessage}>SEND</button>
                    </div>
                </div>
                <div class="footer-bottom">
                    &copy; 2021 JB Auction platform | Designed and Developed by Norbert Guda - 0713627939 - Email:norbertguda@gmail.com
                </div>
            </div>

            </div>
        )
    }
}

export default Footer
