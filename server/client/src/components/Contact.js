import React, { Component } from 'react'
import '../styles/Contact.css'

export class Contact extends Component {
    render() {
        return (
            <div /*style={{backgroundColor:"teal"}} */className="Contact-main">
                <header>
                <h1>HELP DESK</h1>
                <h3>Dear user, we are at your service any time you are in need of help of any kind</h3>
                </header>
                <div>
                    <div id="contacts">
                        <h3>Contact Us Here:</h3>
                        <p>Phone: +254713627929</p>
                        <p>WhatsApp: +254713521958</p>
                        <p>Email: info@vip.co.ke</p>
                    </div>
                    <div class="icons">
                        <h3>Follow us</h3>
                        <p><i class="fa fa-facebook-square" aria-hidden="true"></i>fabecook </p>
                        <p><i class="fa fa-whatsapp" aria-hidden="true"></i> WhatsApp</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Contact
