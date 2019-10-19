
var express = require('express');
var bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

var users = require('./users/routes');
var errors = require('./errors/err');


require('dotenv/config');

const app = express();

app.use('/users-route', users);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

logger = (req, res, next) => {
  console.log(`Logged ${req.url} ${req.method} --${new Date()}`)
  next()
}

app.use(logger);

app.get('/read', (req, res) => {
  let rawdata = fs.readFileSync(path.join(__dirname, 'data.json'))
  let student = JSON.parse(rawdata)
  res.status(200).send(student)
})

app.get('/write', (req, res) => {
  let newStudent = {
    name: 'Mike',
    age: 23,
    gender: 'Male',
    department: 'English',
    car: 'Honda'
  }

  let data = JSON.stringify(newStudent)
  fs.writeFileSync(path.join(__dirname, 'data.json'), data)
  res.status(201).send(newStudent)
})

// app.get('/users', (req, res) => {
//   let rawdata = fs.readFileSync(path.join(__dirname, 'users.json'))
//   let users = JSON.parse(rawdata)
//   res.status(200).send(users)
// })

app.get('/users/:id', (req, res) => {
  let rawdata = fs.readFileSync(path.join(__dirname, 'users.json'))
  let users = JSON.parse(rawdata)

  let currentUser = users.filter(x => {
    let selectedUser = x.id == req.params.id
    return selectedUser
  })

  res.status(200).send(currentUser[0].name)
})

app.post('/users', (req, res,next) => {
  let rawdata = fs.readFileSync(path.join(__dirname, 'users.json'))
  let users = JSON.parse(rawdata)
  
  var userExists = users.some(user=>{return req.body.id === user.id });

console.log(userExists)
  if(userExists){
    var error = new Error('User with ID exists!');
    error.status =  401;
    next(error);
  }
  else{
    users.push(req.body);
  }
  fs.writeFileSync(path.join(__dirname, 'users.json'), JSON.stringify(users))

  res.status(201).send('User has been created!')
});

app.put('/users/:id', (req, res) => {
  let allUsers = fs.readFileSync(path.join(__dirname, 'users.json'))
  let users = JSON.parse(allUsers)

  // let putUser = users[req.params.id - 1]
users.forEach((user)=>{
  if(user.id === parseInt(req.params.id)){
    
    user.name = req.body.name
    user.surname = req.body.surname
    user.email = req.body.email
    user.age = req.body.age
    user.isActive = req.body.isActive

  fs.writeFileSync(path.join(__dirname, 'users.json'), JSON.stringify(users))

  res.send('putUser')
  }
})
  
})

app.patch('/users/:id', (req, res) => {
  let allUsers = fs.readFileSync(path.join(__dirname, 'users.json'))
  let users = JSON.parse(allUsers)
  users.forEach((user)=>{
    if(user.id === parseInt(req.params.id)){
      
      user.name = req.body.name
      user.surname = req.body.surname
  
    fs.writeFileSync(path.join(__dirname, 'users.json'), JSON.stringify(users))
  
    res.send('patchUser')
  }
});
})

app.delete('/users/:id', (req, res) => {
  let allUsers = JSON.parse(fs.readFileSync(path.join(__dirname, 'users.json')));

  // allUsers.splice(req.params.id - 1, 1);

  let users = allUsers.filter((user)=>{
    return user.id !== parseInt(req.params.id)
      
  })
   
  fs.writeFileSync(path.join(__dirname, 'users.json'), JSON.stringify(users))
  res.send('Delete user with id = ' + req.params.id)
});

app.use((req,res,next)=>{
 var error = new Error('Route not found!');
 error.status = 404;
 next(error);
});

app.use(errors.errorHandler)

// app.use((err,req,res,next)=>{
//     var errObj = {
//         status: err.status,
//         error : {
//             message:err.message
//         }
//     }
//     res.status(err.status || 500).send(errObj);
// });

var port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`API is listenig on port ${port}!`)
});

