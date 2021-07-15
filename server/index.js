const express = require('express');
const app = express();
const mysql = require('mysql');
const path = require('path');

//creating a connection
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'auction'
});

function Auth(req, res, next) {
    let v = false;
    if (!v) {
        return  res.redirect('/login');
    } else {
        return next()
    }
}

app.use(`/`,express.static(path.join(__dirname + '/client/build')));

//To check if the database is connected
db.getConnection((err) => {
    if (err) {
        console.log(err)
    } else {
        console.log("mysql connected....")
    }
})

app.get('/login', (req, res) => {
    res.send(
        `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            <H1>Login</H1>
        </body>
        </html>`
    )
})

//for any other request they should br redirected to index.html
app.get('*',(req, res) => {
    res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
})

app.listen(5000, () => {
    console.log('Server running on port 5000')
})

