
var express = require('express');
var bodyParser = require('body-parser');

var users = require('./users/routes');
var posts = require('./posts/routes')
var middleware = require('./middleware/common');


require('dotenv/config');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(middleware.logger);
app.use('/users-route', users);
app.use('/posts-route',posts)

app.use(middleware.errorWrongRoute);

app.use(middleware.errorHandler);

var port = process.env.PORT || 3030
app.listen(port, () => {
  console.log(`API is listenig on port ${port}!`)
});

