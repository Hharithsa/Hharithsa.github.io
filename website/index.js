const express = require('express')
const app = express();
const path = require('path');
const mongoose = require('mongoose')
const methodOverride = require('method-override');
const morgan = require('morgan');
const ejsMate = require('ejs-mate');

mongoose.connect('mongodb://localhost:27017/website')
    .then(() => {
        console.log("connected with db");
    })
    .catch(err => {
        console.log("cannot connect to db", err);
    })

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
/* app.use('/views/public', express.static('public')); */
app.use("/public", express.static(__dirname + "/views/public"));
app.use(methodOverride('_method'));
app.use(morgan('tiny'))
app.engine('ejs', ejsMate)

app.listen(3000, () => {
    console.log('connected with 3000');
})

app.get('/tic', (req, res) => {
    res.render('tic/tic');
})

app.get('/joke', (req, res) => {
    res.render('joke/joke');
})

app.get('/', (req, res) => {
    res.render('dashboard')
})

app.get('/game', (req, res) => {
    /* res.sendFile(__dirname+'/views/allah/index.html') */
    res.render('allah/index')
})
