// Load .env file to have access to our environment variables
require('dotenv').config({ path: './.env' });

// Initialize express app
const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
app.use(bodyParser.json());
var cors = require('cors');
app.use(cors());

// Serve static content
app.use(express.static(__dirname + '/public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/img', express.static(__dirname + 'public/img'));
app.use('/js', express.static(__dirname + 'public/js'));

// Set Views
app.set('views', './views');
app.set('view engine', 'ejs');


/**
 * SEQUELIZE ORM
 */
const sequelize = require('./utils/database');

// Sync with database and create tables by mapping our models into database tables
sequelize
.sync()
//.sync({force: true})    // in case the database tables are already created we drop and recreate them if we changed their schema
.then((result) => {
    console.log(result);
})
.catch((err) => {
    console.log(err);
});


/**
 * NAVIGATION
 */

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/play', (req, res) => {
    res.render('play');
});

app.get('/about', (req, res) => {
    res.render('about')
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/sign-up', (req, res) => {
    res.render('sign-up');
});

app.get('/user-area', (req, res) => {
    res.render('user-area');
});

// Connect the app to the API routes endpoints
require('./routes/user.routes')(app);
require('./routes/session.routes')(app);


app.listen(port, () => console.log('Running on http://localhost:'+port));