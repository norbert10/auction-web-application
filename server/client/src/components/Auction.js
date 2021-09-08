import axios from 'axios';
import React, { Component } from 'react'
import '../styles/Auction.css'
import { FaCheck } from 'react-icons/fa'

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
            file: null
        }

        this.postItem = this.postItem.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.cancelItem = this.cancelItem.bind(this)
        this.displayAuction = this.displayAuction.bind(this)
    }

    postItem(e) {
        e.preventDefault();
        if (this.state.category === '' || this.state.item_name === '' || this.state.item_price === '' ||
            this.state.location === '' || this.state.phone_number === '') {
            alert('Please input item details in all the fields');
        } else {
            document.getElementsByClassName('success')[0].style.display = 'block'
            document.getElementsByClassName('item-details')[0].style.display = 'none'
            axios.post('/products', {
                category: this.state.category,
                item_name: this.state.item_name,
                item_price: this.state.item_price,
                phone_number: this.state.phone_number,
                location: this.state.location,
                item_image: this.state.file,
                item_video: this.state.item_video,
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

    handleChange(event) {
        this.setState({
            file: URL.createObjectURL(event.target.files[0])
        })
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

    render() {
        return (
            <div class="parent">
                <div class="auction-header">
                    <h1>JB AUCTION</h1>
                    <p><em>Auction your item from anywhere, anytime</em></p>
                </div>
                <form>
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
                            <input type="phone" name="phone_number" className="item-input" placeholder="Phone Number" value={this.state.phone_number} onChange={this.changeHandler}></input><br />
                            <input type="text" name="location" className="item-input" placeholder="Location" value={this.state.location} onChange={this.changeHandler}></input>
                            <br />
                            {/* <label for="" class="image-selector">Select image:</label><br /> */}
                            <input type="file" name="item_image" id="img" accept="image/*" className="item-input" onChange={this.handleChange} /><br />
                            {/* <label for="" class="video-selector">Select video:</label><br /> */}
                            {/* <input type="file" name="item_video" id="video" name="video" accept="video/*" value={this.state.item_video} onChange={this.changeHandler}></input> */}
                        </div>
                        <div class="submission-btns">
                            <input type="button" value="submit" class="send-btn" onClick={this.postItem}></input>
                            <input type="button" value="cancel" class="cancel-btn" onClick={this.cancelItem}></input>
                        </div>
                    </div>
                </form>
                <div className="success">
                    <p>Details submitted successfully <FaCheck /></p>
                    <button onClick={this.displayAuction}>Back to Auction page</button>
                </div>

            </div>
        )
    }
}


export default Auction
