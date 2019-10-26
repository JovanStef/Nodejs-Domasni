var mySql = require('mysql');
require = ('dotenv/config');

var connectDB = mySql.createConnection({
    host:'localhost',
    user:'root',
    password:'rootpasswordgiven',
    database:'code_academy'
});

connectDB.connect((error)=>{
    if(error){
        console.log('Problem with DB connection:' + error.message)
    }
    else{
        console.log('DB connected!!!!!!!!!!!!!!!')
    }
});

module.exports = connectDB;