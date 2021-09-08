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
            bidder_location: ''
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
                // if (res.data.length > 0) {
                //     this.setState({ daata: res.data })

                // }
                this.setState({ daata: res.data })

                // if(res.data.length < 1){
                //     document.getElementsByClassName('search_noresult')[0].style.display = 'block'
                //     document.getElementsByClassName('products')[0].style.display = 'none'
                //     if(this.state.searchKey===null){
                //         this.getAllProducts()
                //     }
                // } 

                // else {
                //     document.getElementsByClassName('search_noresult')[0].style.display = 'block'
                //     document.getElementsByClassName('products')[0].style.display = 'none'
                //     if(this.state.searchKey.length<1){
                //         this.getAllProducts()
                //     }
                // }
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
                    {
                        this.state.daata.map((item, index) => (
                            <ProductWrapper name={item.item_name} price={item.item_price} location={item.location} phone={item.phone_number} image={item.item_image} />
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
            // bids: [
            //     { productId: 2, bidderPhone: "0799623291", bidPrice: 250000, bidderLocation: "Nairobi" },
            //     { productId: 2, bidderPhone: "0799623291", bidPrice: 250000, bidderLocation: "Nairobi" },
            //     { productId: 2, bidderPhone: "0799623291", bidPrice: 250000, bidderLocation: "Nairobi" },
            //     { productId: 2, bidderPhone: "0799623291", bidPrice: 250000, bidderLocation: "Nairobi" },
            //     { productId: 2, bidderPhone: "0799623291", bidPrice: 250000, bidderLocation: "Nairobi" },
            //     { productId: 2, bidderPhone: "0799623291", bidPrice: 250000, bidderLocation: "Nairobi" },
            //     { productId: 2, bidderPhone: "0799623291", bidPrice: 250000, bidderLocation: "Nairobi" },
            // ],
            bidAvailabe: [],
            item_id: '',
            bidder_firstname: '',
            bidder_lastname: '',
            bidder_email: '',
            bidder_phone: '',
            bidder_price: '',
            bidder_location: ''
        }
        this.toggleBid = this.toggleBid.bind(this);
        this.toggleShowBids = this.toggleShowBids.bind(this);
        this.openChat = this.openChat.bind(this);
        this.postBids = this.postBids.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.seeBidders = this.seeBidders.bind(this)
    }

    toggleBid() {
        (!this.state.show ?
            this.setState({ show: true })
            :
            this.setState({ show: false })
        )
    }
    toggleShowBids() {
        (!this.state.showBids ?
            this.setState({ showBids: true })
            :
            this.setState({ showBids: false })
        )
    }

    openChat(e) {
        window.location.href = `https://wa.me/${e.target.value}`
    }

    //post bidds to the database
    postBids(e) {
        e.preventDefault();
        if(this.state.bidder_price==''||this.state.bidder_phone==''||this.state.bidder_location==''){
            alert("Fill the required fields")
        }else{
            document.getElementsByClassName("bid_toggle")[0].style.display="none"
        axios.post('/postBids', {
            // item_id: this.state.item_id,
            // bidder_firstname: this.state.bidder_firstname,
            // bidder_lastname: this.state.bidder_lastname,
            // bidder_email: this.state.bidder_email,
            bidder_phone: this.state.bidder_phone,
            bidder_price: this.state.bidder_price,
            bidder_location: this.state.bidder_location

        })
            .then((res) => {
                this.setState({
                    bidAvailabe: res.data
                })
            })
            .catch((err) => {
                alert(err.message)
            })
        }
        
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    componentDidMount() {
        this.seeBidders();
    }

    //code to see bidders of an item
    seeBidders() {
        axios.get('/allBidders').then((res) => {
            this.setState({ bidAvailabe: res.data })
        }).catch((err) => {
            alert(err.message)
        })
    }

    render() {
        return (
            <div style={{ maxWidth: "900px", Height: "auto", border: "2px solid grey", margin: "10px auto", padding: "20px" }} className="mappedItems">
                <div className="item_info">
                    <div>Image here</div>
                    <div>image: {this.props.image}</div>
                    <img src={this.props.image} />
                    <div>name: {this.props.name}</div>
                    <div>price: {this.props.price}</div>
                    <div>location: {this.props.location}</div>
                    <div>phone: {this.props.phone}</div>

                    <div className="btn-product">
                        <div><button onClick={this.openChat} value={this.props.phone}>chat</button></div>
                        <div>
                            <button onClick={this.toggleBid}>bid</button>
                            {
                                this.state.show ?
                                    <>
                                        <div className="bid_toggle">
                                            <div><input name="bidder_phone" placeholder="bidderPhone" value={this.state.bidderPhone} onChange={this.handleChange} /></div>
                                            <div><input name="bidder_price" placeholder="bidderPrice" value={this.state.bidder_price} onChange={this.handleChange} /></div>
                                            <div><input name="bidder_location" placeholder="bidderLocation" value={this.state.bidderLocation} onChange={this.handleChange} /></div>
                                            <div><button onClick={this.postBids}> PLACE BID</button></div>
                                        </div>

                                    </>
                                    :
                                    null
                            }
                        </div>
                        <div>
                            <button onClick={this.toggleShowBids}>show bids</button>
                            {this.state.showBids ?
                                // this.state.bids.map((b, i) => (
                                //     // <div>ProductId: {b.productId} BidPrice: {b.bidPrice} bidderPhone: {b.bidderPhone} bidderLocation: {b.bidderLocation}</div>
                                //     <div>ProductId: {this.props.bidder_phone} BidPrice: {this.props.bidder_price} bidderPhone: {this.props.bidder_location} </div>
                                // ))
                                this.state.bidAvailabe.map((b, i) => (
                                    <div>ProductId: {b.bidder_phone} BidPrice: {b.bidder_price} bidderPhone: {b.bidder_location}</div>
                                ))
                                :
                                null
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}



export default Products
