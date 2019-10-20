var sayHi = function (user) {
    console.log(`Hello, ${user}!`);
}
  
function sayBye(user) {
    // exho();
    return `Bye, ${user}!`;
}

function echo() {
    return 'Echo!';
}
titleCase=(str)=> {
    return str.toLowerCase().split(' ').map(word =>{
      return word.replace(word[0], word[0].toUpperCase());
    }).join(' ');
  }
  
//module.exports = sayHi;
module.exports = {
    titleCase,
    sayHi,
    sayBye
}
