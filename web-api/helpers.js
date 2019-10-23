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

  module.exports ={
    titleCase,
    readFromJson,
    writeToJson
  }