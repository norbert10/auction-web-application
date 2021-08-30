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

    render() {
        return (
            <div class="parent">
                <div class="auction-header">
                    <h1>JB AUCTION</h1>
                    <p><em>Auction your item from anywhere, anytime</em></p>
                </div>
                <form>
                    <div className="item-details">
                        <div class="item-description">
                            <select id="category-select" name="category" value={this.state.category} onChange={this.changeHandler}>
                                <option value="electronics">Electronics</option>
                                <option value="motors">Motors</option>
                                <option value="furniture">Furniture</option>
                                <option value="household">House Hold Items</option>
                                <option value="animals">Animals</option>
                            </select>
                            <br></br>
                            <input type="text" name="item_name" placeholder="Item Name" value={this.state.item_name} onChange={this.changeHandler}></input><br />
                            <input type="number" name="item_price" placeholder="Min Price" value={this.state.item_price} onChange={this.changeHandler}></input><br />
                            <input type="phone" name="phone_number" placeholder="Phone Number" value={this.state.phone_number} onChange={this.changeHandler}></input><br />
                            <input type="text" name="location" placeholder="Location" value={this.state.location} onChange={this.changeHandler}></input>
                            <br />
                            {/* <label for="" class="image-selector">Select image:</label><br /> */}
                            <input type="file" name="item_image" id="img" accept="image/*" onChange={this.handleChange}/><br />
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
        )
    }
}


export default Auction
