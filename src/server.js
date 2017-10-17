const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./server/routes');
const session = require('express-session');
const middlewares = require('./server/middlewares');

const port = process.env.PORT || 3000;

const app = express();

require('ejs');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}...`);
});

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));

app.use(middlewares.setDefaultResponseLocals);

app.use(routes);
