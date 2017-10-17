const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const routes = require('./server/routes');
const middlewares = require('./server/middlewares');

const port = process.env.PORT || 3000;

const app = express();

require('ejs');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}...`);
});

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));

app.use(middlewares.setDefaultResponseLocals);

app.use(routes);
