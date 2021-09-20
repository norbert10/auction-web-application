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

    //searching
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
                            <ProductWrapper bidder_Id={this.props.userId} productId={item.item_no} name={item.item_name} price={item.item_price} location={item.location} phone={item.phone_number} image={item.item_image} category={item.category} />
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
            category: '',
            bidder_firstname: '',
            bidder_lastname: '',
            bidder_email: '',
            bidder_phone: '',
            bidder_price: '',
            bidder_location: '',
            Ischecked: 0,
            highest: 0,
            source: null,

            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        }
        this.toggleBid = this.toggleBid.bind(this);
        this.toggleShowBids = this.toggleShowBids.bind(this);
        this.openChat = this.openChat.bind(this);
        this.postBids = this.postBids.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.seeBidders = this.seeBidders.bind(this);
        this.radioHandler = this.radioHandler.bind(this);
        this.getImage = this.getImage.bind(this)
        this.highest = this.highest.bind(this)
        this.countDown = this.countDown.bind(this)
        // this.intervals = this.intervals.bind(this);
    }

    getImage(endPointUrl, name, stateVariable) {
        axios.get(`${endPointUrl}/${name}`, { responseType: 'arraybuffer' })
            .then(response => {
                const base64 = btoa(new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), ''),);
                this.setState({ [stateVariable]: "data:;base64," + base64 });
            });
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

    //method for the highest bidder
    highest() {
        axios.get(`/highestBid/${this.state.productId}`)
            .then((res) => {

                this.setState({ highest: res.data[0].highestBid })
            }).catch((err) => {
                alert(err.message)
            })
    }


    //radio button handler
    radioHandler() {
        (this.state.Ischecked ?
            this.setState({ Ischecked: 0 })
            :
            this.setState({ Ischecked: 1 })
        )
    }

    componentDidMount() {
        this.getImage('/image', `${this.props.image}`, 'source');
        this.highest();
        // this.intervals();
        this.myTimer = setInterval(this.countDown, 1000)      
    }   

    // clearInterval=()=>{
    //     clearInterval(this.myTime);
    // };

    countDown() {
        const endDate = new Date("December 20, 2021 18:10:00").getTime()
        const toDay = new Date().getTime()
        const timeDiff = endDate - toDay
        let seconds = 1000;
        const minutes = seconds * 60;
        const hours = minutes * 60
        let days = hours * 24
        console.log(timeDiff)

        let timeDays = Math.floor(timeDiff / days)
        let timeHours = Math.floor((timeDiff % days) / hours)
        let timeMinutes = Math.floor((timeDiff % hours) / minutes)
        let timeSeconds = Math.floor((timeDiff % minutes) / seconds);

        this.setState({
            days: timeDays,
            hours: timeHours,
            minutes: timeMinutes,
            seconds: timeSeconds,
        });


    }

    // intervals() {
    //     setInterval(this.countDown, 1000)
    // }
    clearInterval = ()=>{
        if(this.timeDiff < 0)
        clearInterval(this.myTimer)
        console.log(this.myTimer);
    };

    

    

    render() {
        let baton = <button>HIGHEST</button>
        const { digit, date, time, seconds, distance } = this.state
        return (
            <div style={{ maxWidth: "60%", Height: "auto", border: "2px solid grey", margin: "10px auto", padding: "20px" }} className="mappedItems">
                <div className="item_info">
                    <div>image: {this.props.image}</div>
                    <img src={this.state.source} />
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Price</td>
                            <td>Location</td>
                            <td>Phone</td>
                            <td>Product_Id</td>
                            <td>category</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{this.props.name}</td>
                            <td>{this.props.price}</td>
                            <td>{this.props.location}</td>
                            <td>{this.props.phone}</td>
                            <td>{this.props.productId}</td>
                            <td>{this.props.category}</td>
                        </tr>

                    </tbody>
                    <div className="timer_header">TIME LEFT</div>
                    <div className="timer">
                        <article>
                            <p>
                                {this.state.days < 10 ? "0" + this.state.days : this.state.days}
                            </p>
                            <h3>Days</h3>
                        </article>
                        <article>
                            <p>
                                {this.state.hours < 10 ? "0" + this.state.hours : this.state.hours}
                            </p>
                            <h3>Hours</h3>
                        </article>
                        <article>
                            <p>
                                {this.state.minutes < 10 ? "0" + this.state.minutes : this.state.minutes}
                            </p>
                            <h3>Minutes</h3>
                        </article>
                        <article>
                            <p>
                                {this.state.seconds < 10 ? "0" + this.state.seconds : this.state.seconds}
                            </p>
                            <h3>Seconds</h3>
                        </article>
                    </div>


                    <div className="btn-product">
                        <div><button onClick={this.openChat} value={this.props.phone}>chat</button></div>
                        <div>
                            <button onClick={this.toggleBid}>bid</button>
                            {
                                this.state.show ?
                                    <>
                                        <div className="bid_toggle">
                                            <div><input name="bidder_phone" placeholder="bidder Phone" value={this.state.bidder_phone} onChange={this.handleChange} /></div>
                                            <div><input name="bidder_price" placeholder="bidder Price" value={this.state.bidder_price} onChange={this.handleChange} /></div>
                                            <div><input name="bidder_location" placeholder="bidder Location" value={this.state.bidder_location} onChange={this.handleChange} /></div>
                                            <div className="radio-div">
                                                <div><label for="publicBidder">Public</label></div>
                                                <div className="radioo"><input type="radio" id="anonymousBidder" name="bidder-identity" checked={this.state.Ischecked} onChange={this.radioHandler} /></div>
                                            </div>
                                            <div className="visibility-Explanation">
                                                If checked, all your details will be visible <br />
                                                If unchecked, your details won't be visible
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
                                    <td>Expiry</td>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.showBids ?
                                    this.state.bidAvailabe.map((b, i) => (
                                        <tr>
                                            <td>{(b.visible ? `${b.firstname} ${b.lastname}` : "Anonymous")}</td>
                                            <td>{(b.visible ? `${b.phone}` : "Anonymous")}</td>
                                            {/* <td>`{b.firstname}-{b.lastname}`</td> */}
                                            <td>{(b.visible ? b.bidder_location : "Anonymous")}</td>
                                            <td>{b.bidder_price}</td>
                                            <td>{b.bidder_time.split('.')[0]}</td>
                                            <td>{(b.bidder_price === this.state.highest ? baton : "low")}</td>
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
