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
            item_video: ''
        }

        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.getAllProducts = this.getAllProducts.bind(this);
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
                this.setState({ daata: res.data })
            })
            .catch((err) => {
                alert(err.message);
            })
    }

    render() {
        return (
            <div>
                <div>
                    <div class="search-box">
                        <input class="search-txt" name="item_name" value={this.state.searchKey} onChange={this.changeHandler} type="text" placeholder="Search here"></input>
                        <a class="search-btn" href="#"> <i class="fa fa-search" aria-hidden="true" onClick={this.onChangeSearch}><FaSearch /></i></a>
                    </div>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap" }} className="products">
                    {
                        this.state.daata.map((item, index) => (
                            <ProductWrapper name={item.item_name} price={item.item_price} location={item.location} phone={item.phone_number} image={item.item_image} />
                        ))
                    }
                </div>
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
            bids: [
                { productId: 2, bidderPhone: "0799623291", bidPrice: 250000 },
                { productId: 2, bidderPhone: "0799623291", bidPrice: 250000 },
                { productId: 2, bidderPhone: "0799623291", bidPrice: 250000 },
                { productId: 2, bidderPhone: "0799623291", bidPrice: 250000 },
                { productId: 2, bidderPhone: "0799623291", bidPrice: 250000 },
                { productId: 2, bidderPhone: "0799623291", bidPrice: 250000 },
                { productId: 2, bidderPhone: "0799623291", bidPrice: 250000 },
            ]
        }
        this.toggleBid = this.toggleBid.bind(this);
        this.toggleShowBids= this.toggleShowBids.bind(this);
        this.openChat = this.openChat.bind(this);
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

    render() {
        return (
            <div style={{ maxWidth: "900px", maxHeight: "900px", border: "2px solid grey", margin: "10px auto",padding:"20px"}} className="mappedItems">
                <div>Image here</div>
                <div>image: {this.props.image}</div>
                <img src={this.props.image} />
                <div>name: {this.props.name}</div>
                <div>price: {this.props.price}</div>
                <div>location: {this.props.location}</div>
                <div>phone: {this.props.phone}</div>


                <button onClick={this.openChat} value={this.props.phone}>chat</button>

                <div>
                    <div>
                        <button onClick={this.toggleBid}>bid</button>
                        {
                            this.state.show ?
                                <>
                                    <div><input name="bidderPhone" placeholder="bidderPhone" /></div>
                                    <div><input name="bidderPrice" placeholder="bidderPrice" /></div>
                                    <div><button onClick={this.toggleBid}> PLACE BID</button></div>
                                </>
                                :
                                null
                        }
                    </div>
                </div>
                <div>
                    <button onClick={this.toggleShowBids}>show bids</button>
                    {this.state.showBids ?
                        this.state.bids.map((b, i) => (
                            <div>ProductId: {b.productId} BidPrice: {b.bidPrice} bidderPhone: {b.bidderPhone}</div>
                        ))
                        :
                        null
                    }
                </div>
            </div>
        )
    }
}



export default Products
