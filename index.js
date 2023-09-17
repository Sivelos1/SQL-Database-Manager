const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
const path = require('path');
const inquirer = require('inquirer');


const dbName = 'inventory_db'

const questionText = {
  generic:{
    prompt:"What would you like to do?",
    newline:"\n",
    exit:"Exit",
    yesNo: ["Yes","No"],
  },
  mainMenu:{
    prompt:"Please select an action.",
    choices:["Department Management","Role Management","Employee Management"]
  },
  deptManagement:{
    choices:["View all departments","Add a new department", "Edit a department", "Delete a department",],
    addNew:{
      title:"Please enter a title: ",
    },
    choose:"Please enter the ID of the department: ",
    edit:{
      prompt:"What would you like to change?",
      choices:["Title"],
    },
    delete:"Are you sure you want to delete this department?"
  },
  roleManagement:{
    choices:["View all roles","Add a new role", "Edit a role", "Delete a role",],
    addNew:{
      title:"Please enter a title: ",
      salary:"Please enter an annual salary: $",
      department:"Please enter the role\'s department. You can enter the department\'s name or ID: ",
    },
    choose:"Please enter the ID of the role: ",
    edit:{
      prompt:"What would you like to change?",
      choices:["Title", "Salary"],
    },
    delete:"Are you sure you want to delete this role?"
  },
  employeeManagement:{
    choices:["View all employees","Add a new employee", "Edit an employee", "Delete an employee",],
    addNew:{
      firstName:"Please enter the employee\'s first name: ",
      lastName:"Please enter the employee\'s last name: ",
      role:"Please enter the employee\'s role. You can enter the role\'s name or ID: ",
      manager:"Please enter the ID of the employee\'s manager: "
    },
    choose:"Please enter the ID of the employee: ",
    edit:{
      prompt:"What would you like to change?",
      choices:["First Name", "Last Name", "Role", "Manager"],
    },
    delete:"Are you sure you want to delete this employee?"
  }
}

const questions = {
  mainMenu: {
      type:'list',
      message:questionText.mainMenu.prompt,
      name:'answer',
      choices: [...questionText.mainMenu.choices, questionText.generic.exit]},
  deptMenu:{
    type:'list',
    message:questionText.generic.prompt,
    name:'answer',
    choices: [...questionText.deptManagement.choices, questionText.generic.exit]},
  roleMenu:{
    type:'list',
    message:questionText.generic.prompt,
    name:'answer',
    choices: [...questionText.roleManagement.choices, questionText.generic.exit]},
  employeeMenu:{
    type:'list',
    message:questionText.generic.prompt,
    name:'answer',
    choices: [...questionText.employeeManagement.choices, questionText.generic.exit]},
}


const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'Gunmetalgray1!',
    database: dbName
  },
  console.log(`Connected to the ${dbName} database.`)
).connect();

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const mainMenu = function(){
  inquirer.prompt(questions.mainMenu).then(function(response){
    if(response.answer === questionText.mainMenu.choices[0]){
      console.clear();
      deptManagement.menu();
    }else if(response.answer === questionText.mainMenu.choices[1]){
      console.clear();
      roleManagement.menu();
    }else if(response.answer === questionText.mainMenu.choices[2]){
      console.clear();
      employeeManagement.menu();
    }else{
      console.log("Bye bye!");
      process.exit(0);
    }
  });
}

const deptManagement = {
  menu: function(){
    inquirer.prompt(questions.deptMenu).then(function(response){
      if(response.answer === questionText.deptManagement.choices[0]){
        deptManagement.view();
      }else if(response.answer === questionText.deptManagement.choices[1]){
        console.clear();
        deptManagement.add();
      }else if(response.answer === questionText.deptManagement.choices[2]){
        console.clear();
        deptManagement.edit();
      }else if(response.answer === questionText.deptManagement.choices[3]){
        console.clear();
        deptManagement.delete();
      }else{
        console.clear();
        mainMenu();
      }
    });
  },
  view: function(){
    console.clear();
    db.query('SELECT * FROM '+dbName, function (err, results) {
      console.log(results);
      deptManagement.menu();
    });
  },
  add: function(){
    console.clear();
    inquirer.prompt({message:questionText.deptManagement.addNew.title,
        type:'input',
        name:'title'}).then(function(response){
          db.query('INSERT INTO '+dbName+' department VALUES (\''+response.title+'\')', function(err, results){
            console.clear();
            console.log('Department `'+response.title+'` added.');
            deptManagement.menu();
          })
        })
  },
  edit: function(){
    console.clear();
    deptManagement.menu();
  },
  delete: function(){
    console.clear();
    deptManagement.menu();
  },
}
const roleManagement = {
  menu: function(){
    inquirer.prompt(questions.deptMenu).then(function(response){
      if(response.answer === questionText.deptManagement.choices[0]){
        roleManagement.view();
      }else if(response.answer === questionText.deptManagement.choices[1]){
        console.clear();
        roleManagement.add();
      }else if(response.answer === questionText.deptManagement.choices[2]){
        console.clear();
        roleManagement.edit();
      }else if(response.answer === questionText.deptManagement.choices[3]){
        console.clear();
        roleManagement.delete();
      }else{
        console.clear();
        mainMenu();
      }
    });
  },
  view: function(){
    console.clear();
    db.query('SELECT * FROM '+dbName, function (err, results) {
      console.log(results);
      roleManagement.menu();
    });
  },
  add: function(){
    console.clear();
    inquirer.prompt({message:questionText.deptManagement.addNew.title,
        type:'input',
        name:'title'}).then(function(response){
          db.query('INSERT INTO '+dbName+' role VALUES (\''+response.title+'\')', function(err, results){
            console.clear();
            console.log('Role `'+response.title+'` added.');
            roleManagement.menu();
          })
        })
  },
  edit: function(){
    console.clear();
    roleManagement.menu();
  },
  delete: function(){
    console.clear();
    roleManagement.menu();
  },
}
const employeeManagement = {
  menu: function(){
    inquirer.prompt(questions.deptMenu).then(function(response){
      if(response.answer === questionText.deptManagement.choices[0]){
        employeeManagement.view();
      }else if(response.answer === questionText.deptManagement.choices[1]){
        console.clear();
        employeeManagement.add();
      }else if(response.answer === questionText.deptManagement.choices[2]){
        console.clear();
        employeeManagement.edit();
      }else if(response.answer === questionText.deptManagement.choices[3]){
        console.clear();
        employeeManagement.delete();
      }else{
        console.clear();
        mainMenu();
      }
    });
  },
  view: function(){
    console.clear();
    db.query('SELECT * FROM '+dbName, function (err, results) {
      console.log(results);
      employeeManagement.menu();
    });
  },
  add: function(){
    console.clear();
    inquirer.prompt({message:questionText.deptManagement.addNew.title,
        type:'input',
        name:'title'}).then(function(response){
          db.query('INSERT INTO '+dbName+' role VALUES (\''+response.title+'\')', function(err, results){
            console.clear();
            console.log('Role `'+response.title+'` added.');
            employeeManagement.menu();
          })
        })
  },
  edit: function(){
    console.clear();
    employeeManagement.menu();
  },
  delete: function(){
    console.clear();
    employeeManagement.menu();
  },

}

mainMenu();