// import axios from 'axios';
// import React, { Component } from 'react'
// import '../styles/Auction.css'
// import { FaCheck } from 'react-icons/fa'
// import Car from '../Images/auction.png';
// import { FaArrowDown } from 'react-icons/fa';
// import AuctionImg from '../Images/auctionpageimage.jpg'
// import myImage from '../Images/auction_image1.jpg'

// export class Auction extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             itemsAvailable: false,
//             category: '',
//             item_name: '',
//             item_price: '',
//             phone_number: '',
//             location: '',
//             item_image: '',
//             item_video: '',
//             file: '',
//             showAuc: false
//         }

//         this.postItem = this.postItem.bind(this);
//         this.changeHandler = this.changeHandler.bind(this);
//         this.handleChange = this.handleChange.bind(this);
//         this.cancelItem = this.cancelItem.bind(this)
//         this.displayAuction = this.displayAuction.bind(this)
//         this.showAuction = this.showAuction.bind(this)
//         this.submitHandler = this.submitHandler.bind(this)
//     }

//     // 


//     postItem(e) {
//         e.preventDefault();
//         if (this.state.category === '' || this.state.item_name === '' || this.state.item_price === '' ||
//             this.state.location === '' || this.state.phone_number === '') {
//             alert('cannot be empty at all');
//         } else {
//             axios.post('/products', {
//                 category: this.state.category,
//                 item_name: this.state.item_name,
//                 item_price: this.state.item_price,
//                 phone_number: this.state.phone_number,
//                 location: this.state.location,
//                 item_image: this.state.item_image,
//                 item_video: this.state.item_video
//             })
//                 .then((res) => {
//                     this.setState({
//                         itemsAvailable: res.data

//                     })
//                 })
//                 .catch((err) => {
//                     alert(err.message)
//                 })
//         }
//     }

//     changeHandler(e) {
//         this.setState({ [e.target.name]: e.target.value })
//     }

//     handleChange(e) {
//         this.setState({ file: e.target.files[0] })
//     }


//     //to make input fields empty
//     cancelItem = () => {
//         this.setState({
//             category: '',
//             item_name: '',
//             item_price: '',
//             phone_number: '',
//             location: '',
//             item_image: null
//         });

//     }

//     displayAuction() {
//         document.getElementsByClassName('item-details')[0].style.display = 'block'
//         document.getElementsByClassName('success')[0].style.display = 'none'
//         this.setState({
//             category: '',
//             item_name: '',
//             item_price: '',
//             phone_number: '',
//             location: '',
//             item_image: null
//         });
//     }

//     submitHandler(e) {
//         e.preventDefault();
//     }

//     showAuction(e) {
//         (!this.state.showAuc ? document.getElementsByClassName('auction-header')[0].style.display = 'none'
//             :
//             document.getElementsByClassName('auction-header')[0].style.display = 'block');
//         // document.getElementsByClassName('auction-header')[0].style.display="none"
//     }



//     render() {
//         return (
//             <div class="parent">
//                 <div class="auction-header">
//                     <h1>JB AUCTION</h1>
//                     <p><em>Auction your item from anywhere, anytime</em></p>
//                 </div>
//                 <div className="item-details">
//                     <div class="item-description">
//                         <select id="category-select" name="category" value={this.state.category} onChange={this.changeHandler}>
//                             <option value="electronics">Electronics</option>
//                             <option value="motors">Motors</option>
//                             <option value="furniture">Furniture</option>
//                             <option value="household">House Hold Items</option>
//                             <option value="animals">Animals</option>
//                         </select>
//                         <br></br>
//                         <input type="text" name="item_name" placeholder="Item Name" value={this.state.item_name} onChange={this.changeHandler}></input><br />
//                         <input type="number" name="item_price" placeholder="Min Price" value={this.state.item_price} onChange={this.changeHandler}></input><br />
//                         <input type="phone" name="phone_number" placeholder="Phone Number" value={this.state.phone_number} onChange={this.changeHandler}></input><br />
//                         <input type="text" name="location" placeholder="Location" value={this.state.location} onChange={this.changeHandler}></input>
//                         <br />
//                         <label for="" class="image-selector">Select image:</label><br />
//                         <input type="file" name="item_image" id="img" accept="image/*" value={this.state.item_image} onChange={this.changeHandler}></input><br />
//                         <label for="" class="video-selector">Select video:</label><br />
//                         <input type="file" name="item_video" id="video" name="video" accept="video/*" value={this.state.item_video} onChange={this.changeHandler}></input>
//                     </div>
//                     <div class="submission-btns">
//                         <input type="button" value="submit" class="send-btn" onClick={this.postItem}></input>
//                         <input type="button" value="cancel" class="cancel-btn"></input>
//                     </div>
//                 </div>

//             </div>
//         )
//     }
// }


// export default Auction


import axios from 'axios';
import React, { Component } from 'react'
import '../styles/Auction.css'
import { FaCheck } from 'react-icons/fa'
import Car from '../Images/auction.png';
import { FaArrowDown } from 'react-icons/fa';
import AuctionImg from '../Images/auctionpageimage.jpg'
import myImage from '../Images/auction_image1.jpg'

export class Auction extends Component {
    constructor(props) {
        super(props)
        this.state = {
            itemsAvailable: false,
            category: '',
            item_name: '',
            item_price: '',
            phone_number: '',
            location: '',
            item_image: null,
            item_video: '',
            file: '',
            showAuc: false
        }

        this.postItem = this.postItem.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.cancelItem = this.cancelItem.bind(this)
        this.displayAuction = this.displayAuction.bind(this)
        this.showAuction = this.showAuction.bind(this)
        this.submitHandler = this.submitHandler.bind(this)
    }

    postItem(e) {
        e.preventDefault();
        if (this.state.category === '' || this.state.item_name === '' || this.state.item_price === '' ||
            this.state.location === '' || this.state.phone_number === '') {
            alert('cannot be empty at all');
        } else {
            axios.post('/products', {
                category: this.state.category,
                item_name: this.state.item_name,
                item_price: this.state.item_price,
                phone_number: this.state.phone_number,
                location: this.state.location,
                item_image: this.state.item_image,
                item_video: this.state.item_video
            })
                .then((res) => {
                    this.setState({
                        itemsAvailable: res.data

                    })
                })
                .catch((err) => {
                    alert(err.message)
                })
        }
    }

    changeHandler(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleChange(e) {
        this.setState({ file: e.target.files[0] })
    }

    //to make input fields empty
    cancelItem = () => {
        this.setState({
            category: '',
            item_name: '',
            item_price: '',
            phone_number: '',
            location: '',
            item_image: null
        });

    }

    displayAuction() {
        document.getElementsByClassName('item-details')[0].style.display = 'block'
        document.getElementsByClassName('success')[0].style.display = 'none'
        this.setState({
            category: '',
            item_name: '',
            item_price: '',
            phone_number: '',
            location: '',
            item_image: null
        });
    }

    submitHandler(e) {
        e.preventDefault();
    }

    showAuction(e) {
        (!this.state.showAuc ? document.getElementsByClassName('auction-header')[0].style.display = 'none'
            :
            document.getElementsByClassName('auction-header')[0].style.display = 'block');
        // document.getElementsByClassName('auction-header')[0].style.display="none"
    }

    render() {
        return (
            <div class="parent" style={{ backgroundImage: `url(${AuctionImg})` }}>
                <div class="auction-header">
                    <h1>JB AUCTION</h1>
                    <p><em>Auction your item from anywhere, anytime</em></p>
                </div>
                <div className="auction-flex">
                    {/* <div>
                        <button className="toggle-auction" onClick={this.showAuction}>
                            <h5>HEY THERE! Welcome to <FaArrowDown /></h5>
                            <img className="auction-image" src={Car} />
                        </button>
                    </div> */}
                    <div>
                        <img className="auction-image" src={myImage} />
                    </div>
                    {/* <div className="vertical"></div> */}
                    <div className="form" >
                        <form action="/products" method="POST" encType="multipart/form-data" >
                            <div className="item-details">
                                <div className="item-description">
                                    <select id="category-select" name="category" value={this.state.category} onChange={this.changeHandler}>
                                        <option value="electronics">Electronics</option>
                                        <option value="motors">Motors</option>
                                        <option value="furniture">Furniture</option>
                                        <option value="household">House Hold Items</option>
                                        <option value="animals">Animals</option>
                                    </select>
                                    <br></br>
                                    <input type="text" name="item_name" className="item-input" placeholder="Item Name" value={this.state.item_name} onChange={this.changeHandler}></input><br />
                                    <input type="number" name="item_price" className="item-input" placeholder="Min Price" value={this.state.item_price} onChange={this.changeHandler}></input><br />
                                    <select id="category-select" name="location" onChange={this.changeHandler}>
                                        <option value="nairobi">Nairobi</option>
                                        <option value="nairobi">Kisumu</option>
                                        <option value="nairobi">Eldoret</option>
                                        <option value="nairobi">Mombasa</option>
                                        <option value="nairobi">Kisii</option>
                                        <option value="nairobi">Kajiado</option>
                                    </select>
                                    <input type="phone" name="phone_number" className="item-input" placeholder="Phone Number" value={this.state.phone_number} onChange={this.changeHandler}></input><br />
                                    {/* <input type="text" name="location" className="item-input" placeholder="Location" value={this.state.location} onChange={this.changeHandler}></input> */}
                                    <br />
                                    {/* <label for="" class="image-selector">Select image:</label><br /> */}
                                    <input type="file" name="item_image" id="img" accept="image/*" value={this.state.item_image} onChange={this.changeHandler}></input><br />
                                    {/* <label for="" class="video-selector">Select video:</label><br /> */}
                                    {/* <input type="file" name="item_video" id="video" name="video" accept="video/*" value={this.state.item_video} onChange={this.changeHandler}></input> */}
                                </div>
                                <div class="submission-btns">
                                    <input type="button" value="submit" class="send-btn" onClick={this.postItem}></input>
                                    <input type="button" value="cancel" class="cancel-btn"></input>
                                </div>
                            </div>
                        </form>
                    </div>

                </div>

                <div className="success">
                    <p>Details submitted successfully <FaCheck /></p>
                    {/* <button onClick={this.displayAuction}>Back to Auction page</button> */}
                </div>
            </div>
        )
    }
}


export default Auction