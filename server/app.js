'use strict';

const express = require('express');
require('./database/connect');

const app = express();
const port =  process.env.PORT || 3000;

// set the view engine to ejs
app.set('view engine', 'ejs');

// database 

// routes
app.use('/', require('./routes/profile')());

// start server
const server = app.listen(port);
console.log('Express started. Listening on %s', port);
