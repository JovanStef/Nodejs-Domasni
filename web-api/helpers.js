const fs = require('fs');
const path = require('path');


titleCase=(str)=> {
    return str.toLowerCase().split(' ').map(word =>{
      return word.replace(word[0], word[0].toUpperCase());
    }).join(' ');
  };

  readFromJson = ()=>{
    let data = JSON.parse(fs.readFileSync(path.join(__dirname, 'users.json')))
    return data
  };

  writeToJson = (users)=>{
    fs.writeFileSync(path.join(__dirname, 'users.json'), JSON.stringify(users))

  };

  emailValidator = (email) => {

    var validEmail = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if (!validEmail.test(email)) {
        return false
    }
    else {
        return true
    }
};

ageValidator = (age) => {
    return age > 18
}

  module.exports ={
    titleCase,
    readFromJson,
    writeToJson,
    emailValidator,
    ageValidator
  }