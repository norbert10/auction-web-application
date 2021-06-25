import React, { Component } from 'react'
import '../styles/Auction.css'

export class Auction extends Component {
    render() {
        return (
            <div class="parent">
                <div class="auction-header">
                    <h1>JB AUCTION</h1>
                    <p><em>Auction your item from anywhere, anytime</em></p>
                </div>
                <div>
                    <select id="category-select">
                        <option value="electronics">Electronics</option>
                        <option value="motors">Motors</option>
                        <option value="furniture">Furniture</option>
                        <option value="household">House Hold Items</option>
                        <option value="animals">Animals</option>
                    </select>
                    <br></br>
                    <input type="text" placeholder="Item Name"></input><br />
                    <input type="number" placeholder="Min Price"></input>
                    <br />
                    <label for="img">Select image:</label>
                    <input type="file" id="img" name="img" accept="image/*"></input><br/>
                    <label for="img">Select video:</label>
                    <input type="file" id="video" name="video" accept="video/*"></input>
                </div>
                <div class="submission-btns">
                    <input type="submit" value="submit" class="send-btn"></input>
                    <input type="submit" value="cancel" class="cancel-btn"></input>
                </div>
            </div>
        )
    }
}


export default Auction
