
var express = require('express');
var bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

var users = require('./users/routes');
var middleware = require('./middleware/common');


require('dotenv/config');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(middleware.logger);
app.use('/users-route', users);

app.use(middleware.errorWrongRoute);

app.use(middleware.errorHandler);

var port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`API is listenig on port ${port}!`)
});

