const express = require('express');
const app = express();
const mysql = require('mysql');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

//to post every object we send from the backend
// app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

// app.use(cors());

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
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/Login.js')
});

// app.get("/", (req,res)=>{
//     const sqlInsert = 'INSERT INTO login (username, password) VALUES ("Evans", "Odhiambo");'
//     db.query(sqlInsert, (err, result)=>{
//         res.send("Hello world");  
//     })

    	                            
// })

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

// app.post(`/requestlogin`,(req,res)=>{
//     console.log(req.body);
//     const{email,pass}=req.body;
//     let q =`SELECT EXISTS(SELECT * FROM user WHERE email='${email}' AND pass='${pass}') As Isavaible;`
//     connection.query(q,(err,result)=>{
//         if(err)throw err;
//         console.log(result);
//         res.status(200).send(JSON.stringify(result[0].Isavaible));
//     })
// })

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

app.listen(5000, () => {
    console.log('Server running on port 5000')
})


// function Auth(req, res, next) {
//     let v = false;
//     if (!v) {
//         return  res.redirect('/login');
//     } else {
//         return next()
//     }
// }

// app.use(`/`,express.static(path.join(__dirname + '/client/build')));

// //To check if the database is connected

// app.get('/login', (req, res) => {
//     res.send(
//         `<!DOCTYPE html>
//         <html lang="en">
//         <head>
//             <meta charset="UTF-8">
//             <meta http-equiv="X-UA-Compatible" content="IE=edge">
//             <meta name="viewport" content="width=device-width, initial-scale=1.0">
//             <title>Document</title>
//         </head>
//         <body>
//             <H1>Login</H1>
//         </body>
//         </html>`
//     )
// })

// //for any other request they should br redirected to index.html
// app.get('*',(req, res) => {
//     res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
// })


