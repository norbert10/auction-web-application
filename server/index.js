const express = require('express');
const app = express();
const mysql = require('mysql');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

//to post every object we send from the backend
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json())

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
app.post("/userlogin",(req,res)=>{
    console.log(req.body)
    const username = req.body.username
    const password = req.body.password
    db.query('INSERT INTO login (username, password) VALUES (?,?)', [username, password], (err, result)=>{
        if(err){
            console.log(err)
        }
        console.log(result);
        res.status(200).end();
    })
})

app.listen(3001, () => {
    console.log('Server running on port 3001')
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


