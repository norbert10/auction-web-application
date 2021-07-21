import axios from 'axios'
import React, { Component } from 'react'
import '../styles/Products.css'

export class Products extends Component {
    constructor(props){
        super(props)
        this.state = {
            daata: []
        }
    }

    //code to get items through axios
    componentDidMount(){
        axios.get(`/allproducts`)
        .then((res)=>{
            this.setState({daata:res.data});
        })
        .catch((err)=>{
            alert(err.message);
        })
    }

    render() {
        return (
            <div style={{display:"flex",flexWrap:"wrap"}}>
                {
                    this.state.daata.map((item,index)=>(
                        <ProductWrapper name={item.item_name} price={item.item_price} location={item.location} phone={item.phone_number}/>
                    ))
                }
            </div>
        )
    }
}


//reusable component to display items on the page dynamically
const ProductWrapper=(props)=>{
    return(
        <div style={{maxWidth:"200px",maxHeight:"250px",border:"2px solid grey"}}>
            <div>Image here</div>
            <div>name: {props.name}</div>
            <div>price: {props.price}</div>
            <div>location: {props.location}</div>
            <div>phone: {props.phone}</div>
        </div>
    )
}

export default Products
