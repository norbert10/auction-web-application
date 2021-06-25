import React, { Component } from 'react'
import '../styles/Home.css'
export class Home extends Component {
    render() {
        return (
            <div style={{position: "relative"}}>
                <div id="container" class="header">
                    <nav>
                        <ul>
                            <li><a href="/"><i class="fa fa-home" aria-hidden="true"></i>Home</a></li>
                            <li><a href="/kill"><i class="fa fa-product-hunt" aria-hidden="true"></i>Product</a></li>
                            <li><a href="/auction"><i class="fa fa-gavel" aria-hidden="true"></i>Auction
                            </a></li>
                            <li><a href="/about" target="_blank"><i class="fa fa-info-circle" aria-hidden="true"></i>About</a>
                            </li>
                            <li><a href="/login" target="_blank"><i class="fa fa-user"
                                aria-hidden="true"></i>Login</a></li>
                        </ul>
                    </nav>
                </div>
                <div class="search-box">
                    <input class="search-txt" type="text" placeholder="Search here"></input>
                    <a class="search-btn" href="#"> <i class="fa fa-search" aria-hidden="true"></i></a>
                </div>
                <div id="all">
                    <div id="text">
                        <h1>JB AUCTION</h1>
                        <p>Bid from anywhere, anytime</p>
                    </div>
                </div>
                <div class="courasel-container">
                    <div class="courasel-slide visible">
                        <img class="slideImage" src="images/car.jpg"></img>
                    </div>
                    <div class="courasel-slide hidden">
                        <img class="courasel-slide slideImage hidden" src="images/phone.jpg"></img>
                    </div>
                    <div>
                        <img class="slideImage hidden" src="images/tv.jpg"></img>
                    </div>

                </div>
                <button class="btn btnprev" id="prevbtn">Prev</button>
                <button class="btn btnnxt" id="nxtbtn">Next</button>
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
                            <h3>Leave us a Message</h3>
                            <textarea name="message" id="message" cols="30" rows="5"></textarea>
                            <button class="send">SEND</button>
                        </div>
                    </div>
                    <div class="footer-bottom">
                        &copy 2021; JB Auction platform | Designed and Developed by Norbert Guda - 0713627939 - Email:norbertguda@gmail.com
                    </div>
                </div>

            </div>
        )
    }
}

export default Home
