
var express = require('express');
var bodyParser = require('body-parser');

var mainRouter = require('./router');

var middleware = require('./middleware/common');

var jwt = require('express-jwt');

var unless = require('express-unless')


require('dotenv/config');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(jwt({ secret: 'trt'}).unless({path: ['/login','/users']}));
app.use(middleware.logger);

app.use(mainRouter)


app.use(middleware.errorWrongRoute);

app.use(middleware.errorHandler);

var port = process.env.PORT || 3030
app.listen(port, () => {
  console.log(`API is listenig on port ${port}!`)
});

