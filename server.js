const inquirer = require('inquirer');
const mysql = require('mysql');
const cTable = require('console.table');

const connection = mysql.createConnection({
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: 'rtt01DanLobsterBisque',
  database: 'employee_db'
});

connection.connect(function(err){
  if(err) throw err;
  console.log('mySQL connected');
  start();
});

function start(){
  inquirer.prompt([
    {
        type: 'list',
        message: 'What would you like to do? Select from the following list using the arrow keys.',
        name: 'initialStart',
        choices: 
        [
            'View',
            'Add',
            'Update',
            'Exit',
        ]
    },
])
.then(function(res){
  switch(res.initialStart){
    case 'View':
      view();
      break;
    case 'Add':
      add();
      break;
    case 'Update':
      updateEmployee();
      break;
    case 'Exit':
      console.log('Successfully exited.');
      break;
    default:
      console.log('default')
  }
})
};

function view(){
  inquirer.prompt([
    {
    type: 'list',
    name: 'view',
    message: 'Select something to view',
    choices: [
      'All Employees',
      'By Department',
      'By Role'
    ]
    }
]).then(function(res){
  switch(res.view){
    case 'All Employees':
      viewAllEmployees();
      break;
    case 'By Department':
      viewByDepartment();
      break;
    case 'By Role':
      viewByRole();
      break;
    default:
      console.log('default')
  }
})
};

function viewAllEmployees(){
  connection.query("SELECT e.id AS id, e.first_name AS First, e.last_name AS Last, e.role_id AS Role, r.salary AS Salary, d.name AS Department FROM employee LEFT JOIN employee m ON e.manager_id = m.id LEFT JOIN role r ON e.role_id = r.title LEFT JOIN department d ON r.department_id = d.id", function(err, results){
    if(err) throw err;
    console.table(results);
    start();
  })
};

function viewByDepartment(){
  connection.query('SELECT * FROM department', function(err, results) {
    if(err) throw err;
    inquirer.prompt([
      {
        name: 'choice',
        type: 'rawlist',
        choices: function() {
          let choiceArray = [];
          for(i=0; i < results.length; i++){
            choiceArray.push(results[i].name);
          }
          return choiceArray;
        },
        message: 'Select department'
      }
    ]).then(function(answer){
      connection.query(
        "SELECT e.id AS id, e.first_name AS First, e.last_name AS Last, e.role_id AS Role, r.salary AS Salary, d.name AS Department FROM employee LEFT JOIN employee m ON e.manager_id = m.id LEFT JOIN role r ON e.role_id = r.title LEFT JOIN department d ON r.department_id = d.id WHERE d.name=?", [answer.choice], function(err, results){
        if(err) throw err;
        console.table(results);
        start();
        }
      )
    })
  })  
}

function viewByRole(){
  connection.query('SELECT * FROM department', function(err, results) {
    if(err) throw err;
    inquirer.prompt([
      {
        name: 'choice',
        type: 'rawlist',
        choices: function() {
          let choiceArray = [];
          for(i=0; i < results.length; i++){
            choiceArray.push(results[i].title);
          }
          return choiceArray;
        },
        message: 'Select role'
      }
    ]).then(function(answer){
      connection.query(
        "SELECT e.id AS id, e.first_name AS First, e.last_name AS Last, e.role_id AS Role, r.salary AS Salary, d.name AS Department FROM employee LEFT JOIN employee m ON e.manager_id = m.id LEFT JOIN role r ON e.role_id = r.title LEFT JOIN department d ON r.department_id = d.id WHERE d.name=?", [answer.choice], function(err, results){
        if(err) throw err;
        console.table(results);
        start();
        }
      )
    })
  })  
}