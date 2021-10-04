import React, { Component, useState, useEffect, useRef } from 'react'
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
                    <div className="left" onClick={() => {
                        currImg > 0 && setCurrImg(currImg - 1);
                    }}><ArrowBackIosIcon /></div>
                    <div className="center"></div>
                    <div className="right" onClick={() => {
                        currImg < images.length - 1 && setCurrImg(currImg + 1);
                    }}><ArrowForwardIosIcon /></div>
                </div>
            </div>
            <div>
                <h4>Rate us</h4>
                <div className="ratings">
                    <div>
                        <label for="publicBidder">Excellent</label>
                        <input type="radio" name="rate"/>
                    </div>
                    <div>
                    <label for="publicBidder">Good</label>
                        <input type="radio" name="rate"/>
                    </div>
                    <div>
                    <label for="publicBidder">Fair</label>
                        <input type="radio" name="rate" />
                    </div>
                    <div>
                    <label for="publicBidder">Poor</label>
                        <input type="radio" name="rate"/>
                    </div>
                </div>
                <button>Rate</button>

            </div>

        </div>
    );
}

export default Landing



// import Slider from "react-slick";


// export class Landing extends Component {
//     constructor(props){
//         super(props);
//         this.play=this.play.bind(this)
//         this.pause=this.pause.bind(this)
//     }

//     play(){
//         this.slider.slickPlay()
//     }
//     pause(){
//         this.slider.slickPause()
//     }


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

//             </div>
//         )
//     }
// }

// export default Landing