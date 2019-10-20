var express = require('express');
const fs = require('fs');
const path = require('path');


var routes = express.Router();

routes.get('/test',(req,res)=>{
  res.send('all good');
});

routes.get('/', (req, res) => {
  let rawdata = fs.readFileSync(path.join(__dirname, '../users.json'));
  let users = JSON.parse(rawdata);
  res.status(200).send(users);
});

routes.get('/:name', (req,res,next)=>{
  let rawdata = fs.readFileSync(path.join(__dirname, '../users.json'));
  let users = JSON.parse(rawdata);
  
  var currentUser = users.filter(user=>{
    var someuser= user.name === req.params.name
    return someuser
  });
  if(currentUser.length == 0){
    var error = new Error('no such username!');
    error.status = 404;
    next(error);
    // app.use(errors.errorHandler)
   
  }
  else{
    res.status(200).send(currentUser);
    return currentUser
    
  }
  
});

// app.use((err,req,res,next)=>{
//     var errObj = {
//         status: err.status,
//         error : {
//             message:err.message
//         }
//     }
//     res.status(err.status || 500).send(errObj);
// });
      
      module.exports = routes