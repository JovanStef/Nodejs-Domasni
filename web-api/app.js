var express = require('express')
var bodyParser = require('body-parser')
const fs = require('fs')
const path = require('path')
const { applyOperation } = require('fast-json-patch')
// const applyOperation = require('fast-json-patch').applyOperation;
require('dotenv/config')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

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

app.get('/users', (req, res) => {
  let rawdata = fs.readFileSync(path.join(__dirname, 'users.json'))
  let users = JSON.parse(rawdata)
  res.status(200).send(users)
})

app.get('/users/:id', (req, res) => {
  let rawdata = fs.readFileSync(path.join(__dirname, 'users.json'))
  let users = JSON.parse(rawdata)

  let currentUser = users.filter(x => {
    let selectedUser = x.id == req.params.id
    return selectedUser
  })

  res.status(200).send(currentUser[0].name)
})

app.post('/users', (req, res) => {
  let rawdata = fs.readFileSync(path.join(__dirname, 'users.json'))
  let users = JSON.parse(rawdata)

  users.push(req.body)

  let data = JSON.stringify(users)
  fs.writeFileSync(path.join(__dirname, 'users.json'), data)

  res.status(201).send('User has been created!')
})

app.put('/users/:id', (req, res) => {
  let allUsers = fs.readFileSync(path.join(__dirname, 'users.json'))
  let users = JSON.parse(allUsers)

  let putUser = users[req.params.id - 1]

  putUser.id = parseInt(req.params.id)
  putUser.name = req.body.name
  putUser.surname = req.body.surname
  putUser.email = req.body.email
  putUser.age = req.body.age
  putUser.isActive = req.body.isActive

  fs.writeFileSync(path.join(__dirname, 'users.json'), JSON.stringify(users))

  res.send('putUser')
})

app.patch('/users/:id', (req, res) => {
  let allUsers = fs.readFileSync(path.join(__dirname, 'users.json'))
  let users = JSON.parse(allUsers)
  let putUser = users[req.params.id - 1]
  putUser.name = req.body.name
  putUser.email = req.body.email

  fs.writeFileSync(path.join(__dirname, 'users.json'), JSON.stringify(users))
  res.send('patchUser')
});

app.delete('/users/:id', (req, res) => {
  let allUsers = JSON.parse(fs.readFileSync(path.join(__dirname, 'users.json')))
  allUsers.splice(req.params.id - 1, 1)
  fs.writeFileSync(path.join(__dirname, 'users.json'), JSON.stringify(allUsers))
  res.send('Delete user with id = ' + req.params.id)
});

app.use((req,res,next)=>{
 var error = new Error('Route not found!');
//  error.status = 404;
 next(error);
});

app.use((err,req,res,next)=>{
    var errObj = {
        status: err.status,
        error : {
            message:err.message
        }
    }
    res.status(err.status || 500).send(errObj);
});

var port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`API is listenig on port ${port}!`)
})
