const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const handlebars = require('express-handlebars')
const app = express()
const urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use('/img', express.static('img'))

const sql = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    port: 3306,
    database: 'nodejs',

})

//Start server
app.listen(3000, function (req, res) {
    console.log("Server start 🔥")
})

sql.connect((err) => {
    if (err) {
        console.log(err)
    } else {
        console.log("CONNECTED!!!")
    }
})

//Template engine
app.engine("handlebars", handlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//Use static files without routes
// app.use('/css', express.static('css'));
// app.use('/js', express.static('js'));

//Routes and Templates
app.get('/', function (req, res) {
    // res.send("Minha pagina inicial")
    // res.sendFile(__dirname + '/index.html')
    res.render('index')
})

app.get("/script", function (req, res) {
    res.sendFile(__dirname + '/js/script.js');
});

app.get("/style", function (req, res) {
    res.sendFile(__dirname + '/css/style.css');
});

app.get('/insert', function (req, res) {
    res.render('insert')
})

app.get("/select/:id?", function (req, res) {
    if (!req.params.id) {
        sql.query("select * from user order by id asc", function (err, results, fields) {
            res.render('select', { data: results })
        })
    } else {
        sql.query("select * from user where id=? order by id asc", [req.params.id], function (err, results, fields) {
            res.render('select', { data: results })
        })
    }
})

app.get('/delete/:id', function (req, res) {
    sql.query("delete from user where id=?", [req.params.id])
    res.render('delete')
})

app.post('/controllerForm', urlencodedParser, function (req, res) {
    sql.query('insert into user values (?, ?, ?)', [
        req.body.id,
        req.body.name,
        req.body.age
    ])
    res.render('controllerForm', { name: req.body.name })

})

app.get("/update/:id", function (req, res) {
    sql.query("select * from user where id=?", [req.params.id], function (results) {
        res.render('update', { id: req.params.id, name: req.params.name, age:  req.params.age })
    })
})

app.post("/controllerUpdate", urlencodedParser, function (req, res) {
    sql.query("update user set name=?,age=? where id=?", [req.body.name, req.body.age, req.body.id]);
    res.render('controllerUpdate');
});

