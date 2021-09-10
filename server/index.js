const express = require('express');
const app = express();
const mysql = require('mysql');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

//to post every object we send from the backend
// app.use(express.json());
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
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
app.post("/registerrequest", (req, res) => {
    console.log(req.body)
    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const pass = req.body.pass
    const phone = req.body.phone
    const email = req.body.email
    db.query('INSERT INTO user (firstname, lastname, pass, phone, email) VALUES (?,?,?,?,?)',
        [firstname, lastname, pass, phone, email], (err, result) => {
            if (err) {
                console.log(err)
            }
            console.log(result);
            res.status(200).end();
        })
})

//login authentication
app.post(`/userlogin`, (req, res) => {
    console.log(req.body);
    const { username, password } = req.body;
    console.log(username, password);

    let q = `SELECT EXISTS(SELECT * FROM user WHERE email='${username}' AND pass='${password}') As Isavaible;`
    db.query(q, (err, result) => {
        if (err) throw err;
        var dataa = {}

        dataa.IsLoggedIn = result[0].Isavaible;


        if (dataa.IsLoggedIn) {
            let q = `SELECT id,firstname FROM user WHERE email='${username}' AND pass='${password}';`
            db.query(q, (err, result) => {
                if (err) throw err;
                dataa.usernamee = result[0].firstname;
                dataa.userId=result[0].id
                console.log(dataa.usernamee)
                console.log(dataa.userId)
                res.status(200).send(JSON.stringify(dataa));

            })
        } else {
            dataa.usernamee = 'unknown';
            res.status(200).send(JSON.stringify(dataa));

        }

    })
})

//inserting products into the database

app.post("/products", (req, res) => {
    console.log(req.body)
    const category = req.body.category
    const item_name = req.body.item_name
    const item_price = req.body.item_price
    const phone_number = req.body.phone_number
    const location = req.body.location
    const item_image = req.body.item_image
    const item_video = req.body.item_video
    db.query('INSERT INTO products (category, item_name, item_price, phone_number, location, item_image, item_video) VALUES (?,?,?,?,?,?,?)',
        [category, item_name, item_price, phone_number, location, item_image, item_video], (err, result) => {
            if (err) {
                console.log(err)
            }
            console.log(result);
            res.status(200).end();
        })
})

//retrieving data from database to display it on the product page
app.get(`/allproducts`, (req, res) => {

    let sql = 'SELECT * FROM products;'
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.status(200).end(JSON.stringify(result));
    })

    //searching productss
    app.post(`/results`, (req, res) => {
        console.log(req.body.searchkey)
        let search = `SELECT * FROM products WHERE category LIKE  "%${req.body.searchkey}%";`
        db.query(search, (err, result) => {
            if (err) throw err;
            res.status(200).end(JSON.stringify(result));
        })
    })

    //Reset User details
    app.post('/rs', (req, res) => {
        console.log(req.body)
        const { pass, phone, firstname, lastname } = req.body;
        let resetQuery = `UPDATE user SET pass='${pass}' WHERE firstname='${firstname}' AND lastname='${lastname}' AND phone='${phone}';`
        db.query(resetQuery, (err, result) => {
            if (err) throw err;
            res.status(200).end(JSON.stringify(result));
        })
    })

    //To see all bidders of an item
    app.get(`/allBids/:productId`, (req, res) => {
        let bidders = `SELECT user.firstname,user.lastname,user.phone,bids.bidder_price,bids.bidder_location,bids.bidder_time,bids.visible FROM user\
        INNER JOIN bids ON user.id=bids.bidder_Id AND product_Id =${req.params.productId};`
        db.query(bidders, (err, result) => {
            if (err) throw err;
            res.status(200).end(JSON.stringify(result))
        })
    })

    app.post("/postBids", (req, res) => {
        console.log(req.body)
        // const item_id = request.body.item_id
        // const bidder_firstname = request.body.bidder_firstname
        // const bidder_lastname = request.body.bidder_lastname
        // const bidder_email = request.body.bidder_email
        let d=new Date();
        let bidding_time =`${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}-${d.getHours()}-${d.getMinutes()}-${d.getSeconds()}`
        const{productId,bidder_phone,bidder_Id,bidder_location,bidder_price,visibility}=req.body;
        let q =`INSERT INTO bids(product_Id, bidder_Id, bidder_price, bidder_location,bidder_time, bidder_phone,visible)\
        VALUES (${productId},${bidder_Id},${bidder_price},'${bidder_location}','${bidding_time}','${bidder_phone})',${visibility});`
        db.query(q,(err, result) => {
                if (err) throw err;
                res.status(200).end(JSON.stringify(result));
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
