import React, { Component, useState } from 'react'
import '../styles/Landing.css'
import { FaSearch } from 'react-icons/fa'
import { images } from './CarouselData'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'


function Landing() {
    const [currImg, setCurrImg] = useState(0);
    return (
        <div style={{ position: "relative" }}>
            <div id="all">
                <div id="text">
                    <h1>JB AUCTION</h1>
                </div>
            </div>
            <div className="carousel">
                <div className="CarouselInner" style={{ backgroundImage: `url(${images[currImg].img})` }}
                >
                    {/* <img src={images[0].img} /> */}
                        <div className="left" onClick={()=>{
                            currImg > 0 && setCurrImg(currImg-1);
                        }}><ArrowBackIosIcon /></div>
                        <div className="center"></div>
                        <div className="right" onClick={()=>{
                            currImg < images.length-1 && setCurrImg(currImg+1);
                        }}><ArrowForwardIosIcon /></div>
                </div>
            </div>

        </div>
    );
}

export default Landing

// export class Landing extends Component {


//     render() {
//         return (
//             <div style={{position: "relative"}}>
//                 {/* <div id="container" class="header">
//                 </div> */}
//                 <div class="search-box">
//                     <input class="search-txt" type="text" placeholder="Search here"></input>
//                     <a class="search-btn" href="#"> <i class="fa fa-search" aria-hidden="true"><FaSearch /></i></a>
//                 </div>
//                 <div id="all">
//                     <div id="text">
//                         <h1>JB AUCTION</h1>
//                         <p>Bid from anywhere, anytime</p>
//                     </div>
//                 </div>
//                 {/* <div class="courasel-container">
//                     <div class="courasel-slide visible">
//                         <img class="slideImage" src="images/car.jpg"></img>
//                     </div>
//                     <div class="courasel-slide hidden">
//                         <img class="courasel-slide slideImage hidden" src="images/phone.jpg"></img>
//                     </div>
//                     <div>
//                         <img class="slideImage hidden" src="images/tv.jpg"></img>
//                     </div>

//                 </div>
//                 <button class="btn btnprev" id="prevbtn">Prev</button>
//                 <button class="btn btnnxt" id="nxtbtn">Next</button> */}
//                 <div className="carousel">
//                     <div className="CarouselInner">
//                         <img src={images[0].img} />
//                     </div>
//                 </div>
//                 <div class="footer">
//                     <div class="footer-content">
//                         <div class="footer-section about">
//                             <h3>JB Auction</h3>
//                             <p><em>JB Auction is an e-commerce which deals with auctioning. One can bid or auction any item anytime
//                                 anywhere.</em>
//                             </p>
//                             <p><em>Please you are free to reach us any time. We operate 24 hours</em></p>
//                             <p><em>+254713 627939</em></p>
//                             <p><em>info@jbauctions.co.ke</em></p>
//                         </div>
//                         <div class="footer-section links">
//                             <h3>Quick Links</h3>
//                             <ul>
//                                 <li><a href="#">Events</a></li>
//                                 <li><a href="#">Contacts</a></li>
//                                 <li><a href="">Galleries</a></li>
//                                 <li><a href="#">Help</a></li>
//                             </ul>
//                         </div>
//                         <div class="footer-section contact-forms">
//                             <h3>Leave us a Message</h3>
//                             <textarea name="message" id="message" cols="30" rows="5"></textarea>
//                             <button class="send">SEND</button>
//                         </div>
//                     </div>
//                     <div class="footer-bottom">
//                         &copy; 2021 JB Auction platform | Designed and Developed by Norbert Guda - 0713627939 - Email:norbertguda@gmail.com
//                     </div>
//                 </div>

//             </div>
//         )
//     }
// }

// export default Landing