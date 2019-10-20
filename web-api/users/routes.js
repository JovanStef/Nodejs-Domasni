var express = require('express');
const fs = require('fs');
const path = require('path');
const first = require('../../console-app/first');


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
  let paramToSentCase =first.titleCase(req.params.name)
  
  var currentUser = users.filter(user=>{
    var someuser= user.name === paramToSentCase
    return someuser
  });
  if(currentUser.length == 0){
    var error = new Error('no such username!');
    error.status = 404;
    next(error);
   
  }
  else{
    res.status(200).send(currentUser);
    return currentUser
    
  }
  
});

      
      module.exports = routes