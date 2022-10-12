const inquirer = require('inquirer');
const util = require('util');
const fs = require('fs');

((choice) => {
    fs.writeFile('schema.sql', writeToFile(choice), (err) => err ? console.log(err) : console.log(JSON.stringify(choice)));
    console.log(JSON.stringify(choice, null, " "));
}).catch((err) => {

})

