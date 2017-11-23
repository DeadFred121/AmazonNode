const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Setting view engine
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: true}));

// Reference Routes file
app.use('/', require('./routes'));

// Start app
app.listen(port, console.log('Server running...'));