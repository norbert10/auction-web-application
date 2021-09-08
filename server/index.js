const express = require('express');
const app = express();
const mysql = require('mysql');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

//to post every object we send from the backend
// app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//creating a connection
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'auction'
});
db.getConnection((err) => {
    if (err) {
        console.log(err)
    } else {
        console.log("mysql connected....")
    }
});

//query to insert new user to the database
app.post("/registerrequest",(req,res)=>{
    console.log(req.body)
    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const pass = req.body.pass
    const phone = req.body.phone
    const email = req.body.email
    db.query('INSERT INTO user (firstname, lastname, pass, phone, email) VALUES (?,?,?,?,?)', 
    [firstname, lastname, pass, phone, email], (err, result)=>{
        if(err){
            console.log(err)
        }
        console.log(result);
        res.status(200).end();
    })
})

//login authentication
app.post(`/userlogin`,(req,res)=>{
    console.log(req.body);
    const{username,password} = req.body;
    console.log(username,password);
    let q =`SELECT EXISTS(SELECT * FROM user WHERE email='${username}' AND pass='${password}') As Isavaible;`
    db.query(q,(err,result)=>{
        if(err)throw err;
        console.log(result);
        res.status(200).send(JSON.stringify(result[0].Isavaible));
    })
})

//inserting products into the database

app.post("/products",(req,res)=>{
    console.log(req.body)
    const category = req.body.category
    const item_name = req.body.item_name
    const item_price = req.body.item_price
    const phone_number = req.body.phone_number
    const location = req.body.location
    const item_image = req.body.item_image
    const item_video = req.body.item_video
    db.query('INSERT INTO products (category, item_name, item_price, phone_number, location, item_image, item_video) VALUES (?,?,?,?,?,?,?)', 
    [category, item_name, item_price, phone_number, location, item_image, item_video], (err, result)=>{
        if(err){
            console.log(err)
        }
        console.log(result);
        res.status(200).end();
    })
})

//retrieving data from database to display it on the product page
app.get(`/allproducts`,(req,res)=>{
    
    let sql ='SELECT * FROM products;'
    db.query(sql,(err,result)=>{
        if(err) throw err;
        res.status(200).end(JSON.stringify(result));
    })

//searching productss
app.post(`/results`, (req, res)=>{
    console.log(req.params.searchkey)
    let search = `SELECT * FROM products WHERE category LIKE  "%${req.body.searchkey}%";`
    db.query(search, (err, result)=>{
        if(err) throw err;
        res.status(200).end(JSON.stringify(result));
    })
})

//Reset User details
app.post('/resetDetails', (req, res)=>{
    let resetQuery = `UPDATE user SET pass = REPLACE(pass, ${pass}, (?);`
    db.query(resetQuery, (err, result)=>{
        if(err) throw err;
        res.status(200).end(JSON.stringify(result));
    })
})

//To see all bidders of an item
app.get('/allBidders', (req, res)=>{
    let bidders = 'SELECT * FROM bidders;'
    db.query(bidders, (err, result)=>{
        if(err) throw err;
        res.status(200).end(JSON.stringify(result))
    })
})

app.post("/postBids",(request, response)=>{
    console.log(request.body)
    // const item_id = request.body.item_id
    // const bidder_firstname = request.body.bidder_firstname
    // const bidder_lastname = request.body.bidder_lastname
    // const bidder_email = request.body.bidder_email
    const bidder_phone = request.body.bidder_phone
    const bidder_price = request.body. bidder_price
    const bidder_location = request.body.bidder_location
    db.query(
    'INSERT INTO bidders (bidder_phone, bidder_price, bidder_location) VALUES (?,?,?)',
     [bidder_phone, bidder_price, bidder_location], (err, result)=>{
        if(err){
            console.log(err)
        }
        console.log(result);
        res.status(200).end();
     })

})



    // let data=[
    //     {item_name:"unga",item_price:80,location:'umoja',phone_number:3879370},
    //     {item_name:"unga",item_price:80,location:'umoja',phone_number:3879370},
    //     {item_name:"unga",item_price:80,location:'umoja',phone_number:3879370},
    //     {item_name:"unga",item_price:80,location:'umoja',phone_number:3879370},
    //     {item_name:"unga",item_price:80,location:'umoja',phone_number:3879370},
    //     {item_name:"unga",item_price:80,location:'umoja',phone_number:3879370},
    //     {item_name:"unga",item_price:80,location:'umoja',phone_number:3879370}
    // ]
})


app.listen(5000, () => {
    console.log('Server running on port 5000')
})
