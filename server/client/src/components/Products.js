import axios from 'axios'
import React, { Component } from 'react'
import '../styles/Products.css'
import { FaSearch } from 'react-icons/fa'

export class Products extends Component {
    constructor(props) {
        super(props)
        this.state = {
            daata: [],
            itemsAvailable: false,
            category: '',
            item_name: '',
            item_price: '',
            phone_number: '',
            location: '',
            searchKey: null,
            item_image: null,
            item_video: '',
            show_categories: false,


            bidAvailabe: false,
            item_id: '',
            bidder_firstname: '',
            bidder_lastname: '',
            bidder_email: '',
            bidder_phone: '',
            bidder_price: '',
            bidder_location: '',
            // message:'message here'
        }

        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.getAllProducts = this.getAllProducts.bind(this);
        this.showCategories = this.showCategories.bind(this);
        // this.itemSearch = this.itemSearch.bind(this);
    }

    // changeHandler(e) {
    //     this.setState({ [e.target.name]: e.target.value });
    // }

    // search=(searchTerm)=>{
    //     if(searchTerm.length()>0){
    //         fetchAsync();
    //     }else{
    //         console.log("No search term provided");
    //     }
    // }
    // async fetchAsync (url) {
    //     let response = await fetch(url);
    //     let data = await response.json();
    //     console.log(data);
    //     return data;
    //   }

    bidNow = (e) => {
        console.log("successful")
    }


    //code to get items through axios
    componentDidMount() {
        this.getAllProducts();
    }

    getAllProducts() {
        axios.get(`/allproducts`)
            .then((res) => {
                this.setState({ daata: res.data });
            })
            .catch((err) => {
                alert(err.message);
            })
    }

    changeHandler(e) {
        this.setState({ searchKey: e.target.value }, () => {
            (this.state.searchKey === null ?
                this.getAllProducts()
                :
                this.onChangeSearch()
            )
        })
    }

    onChangeSearch() {
        axios.post(`/results`, { searchkey: this.state.searchKey })
            .then((res) => {
                this.setState({ daata: res.data });
            })
            .catch((err) => {
                alert(err.message);
            })
    }
    //to toggle show categories
    showCategories() {
        (!this.state.show_categories ?
            this.setState({ show_categories: true })
            :
            this.setState({ show_categories: false })
        )

    }



    render() {
        return (
            <div>
                <div>
                    <div class="search-box">
                        <input class="search-txt" name="item_name" value={this.state.searchKey} onChange={this.changeHandler} type="text" placeholder="Search by category"></input>
                        <a class="search-btn" href="#"> <i class="fa fa-search" aria-hidden="true" onClick={this.onChangeSearch}><FaSearch /></i></a>
                        <button className="categoryButton" onClick={this.showCategories}>see categories</button>
                        {
                            this.state.show_categories ?
                                <>
                                    <div>Electronics</div>
                                    <div>Motors</div>
                                    <div>Furniture</div>
                                    <div>Household</div>
                                    <div>Animals</div>
                                </>
                                :
                                null
                        }

                    </div>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap" }} className="products">
                    {this.state.message}
                    {
                        this.state.daata.map((item, index) => (
                            <ProductWrapper bidder_Id={this.props.userId} productId={item.item_no} name={item.item_name} price={item.item_price} location={item.location} phone={item.phone_number} image={item.item_image} />
                        ))
                    }
                </div>
                <div className="search_noresult">No search result</div>
            </div>

        )
    }
}


//reusable component to display items on the page dynamically
class ProductWrapper extends Component {
    constructor(props) {
        super(props)

        this.state = {
            show: false,
            showBids: false,
            bidAvailabe: [],
            productId: this.props.productId,
            bidder_Id: this.props.bidder_Id,
            bidder_firstname: '',
            bidder_lastname: '',
            bidder_email: '',
            bidder_phone: '',
            bidder_price: '',
            bidder_location: '',
            Ischecked: 0
        }
        this.toggleBid = this.toggleBid.bind(this);
        this.toggleShowBids = this.toggleShowBids.bind(this);
        this.openChat = this.openChat.bind(this);
        this.postBids = this.postBids.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.seeBidders = this.seeBidders.bind(this);
        this.radioHandler = this.radioHandler.bind(this);
    }

    toggleBid() {
        (!this.state.show ?
            this.setState({ show: true })
            :
            this.setState({ show: false })
        )
    }
    toggleShowBids() {
        if (!this.state.showBids) {
            this.setState({ showBids: true })
            this.seeBidders();
        } else {
            this.setState({ showBids: false })
        }
    }

    openChat(e) {
        window.location.href = `https://wa.me/${e.target.value}`
    }

    //post bidds to the database
    postBids(e) {
        e.preventDefault();
        if (this.state.bidder_price == '' || this.state.bidder_phone == '' || this.state.bidder_location == '') {
            alert("Fill the required fields")
        } else {
            document.getElementsByClassName("bid_toggle")[0].style.display = "none"
            axios.post('/postBids', {
                bidder_phone: this.state.bidder_phone,
                bidder_price: this.state.bidder_price,
                bidder_location: this.state.bidder_location,
                bidder_visibility: this.state.Ischecked,
                productId: this.state.productId,
                visibility: this.state.Ischecked,
                bidder_Id: this.state.bidder_Id
            })
                .then((res) => {
                    alert("Bid sent")
                })
                .catch((err) => {
                    alert(err.message)
                })
        }

    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }


    //code to see bidders of an item
    seeBidders() {
        axios.get(`/allBids/${this.state.productId}`)
            .then((res) => {
                this.setState({ bidAvailabe: res.data })
            }).catch((err) => {
                alert(err.message)
            })
    }
    //
    radioHandler() {
        (this.state.Ischecked ?
            this.setState({ Ischecked: 0 })
            :
            this.setState({ Ischecked: 1 })
        )
    }

    render() {
        let baton = <button>pay</button>
        return (
            <div style={{ maxWidth: "60%", Height: "auto", border: "2px solid grey", margin: "10px auto", padding: "20px" }} className="mappedItems">
                <div className="item_info">
                    <div>Image here</div>
                    <div>image: {this.props.image}</div>
                    <img src={this.props.image} />
                    <div>name: {this.props.name}</div>
                    <div>price: {this.props.price}</div>
                    <div>location: {this.props.location}</div>
                    <div>phone: {this.props.phone}</div>
                    <div>product_Id: {this.props.productId}</div>

                    <div className="btn-product">
                        <div><button onClick={this.openChat} value={this.props.phone}>chat</button></div>
                        <div>
                            <button onClick={this.toggleBid}>bid</button>
                            {
                                this.state.show ?
                                    <>
                                        <div className="bid_toggle">
                                            <div><input name="bidder_phone" placeholder="bidderPhone" value={this.state.bidder_phone} onChange={this.handleChange} /></div>
                                            <div><input name="bidder_price" placeholder="bidderPrice" value={this.state.bidder_price} onChange={this.handleChange} /></div>
                                            <div><input name="bidder_location" placeholder="bidderLocation" value={this.state.bidder_location} onChange={this.handleChange} /></div>
                                            <div>
                                                <label for="publicBidder">Public</label>
                                                <input type="radio" id="anonymousBidder" name="bidder-identity" checked={this.state.Ischecked} onChange={this.radioHandler} />
                                            </div>
                                            <div><button onClick={this.postBids}> PLACE BID</button></div>
                                        </div>

                                    </>
                                    :
                                    null
                            }
                        </div>
                        <div>
                            <button onClick={this.toggleShowBids}>show bids</button>
                            <thead>
                                <tr>
                                    <td>Name</td>
                                    <td>Phone</td>
                                    <td>Location</td>
                                    <td>Price</td>
                                    <td>Date</td>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.showBids ?
                                    this.state.bidAvailabe.map((b, i) => (
                                        <tr>
                                            <td>{(b.visible ? `${b.firstname} ${b.lastname}` : "Anonymous")}</td>
                                            <td>{b.firstname}-{b.lastname}</td>
                                            <td>{(b.visible ? b.bidder_location : "Anonymous")}</td>
                                            <td>{b.bidder_price}</td>
                                            <td>{b.bidder_time.split('.')[0]}</td>
                                            <td>{(b.visible ? baton: "low")}</td>
                                        </tr>
                                    ))
                                    :
                                    null
                                }
                            </tbody>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}



export default Products
