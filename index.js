const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
const path = require('path');
const inquirer = require('inquirer');
require("dotenv").config();


const dbName = 'workplace_db'

const questionText = {
  generic:{
    prompt:"What would you like to do?",
    newline:"\n",
    exit:"Exit",
    yesNo: ["Yes","No"],
    areYouSure: "Are you sure you want to delete this?"
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
      department:"Please enter the ID of the role\'s department: ",
    },
    choose:"Please enter the ID of the role: ",
    edit:{
      prompt:"What would you like to change?",
      choices:["Title", "Salary","Department"],
    },
    delete:"Are you sure you want to delete this role?"
  },
  employeeManagement:{
    choices:["View all employees","Add a new employee", "Edit an employee", "Delete an employee",],
    addNew:{
      firstName:"Please enter the employee\'s first name: ",
      lastName:"Please enter the employee\'s last name: ",
      role:"Please enter the ID of the employee\'s role: ",
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
    user: `root`,
    password: process.env.PASSWORD,
    database: dbName
  },
  console.log(`Connected to the ${dbName} database.`)
);


// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  mainMenu();
});

var mainMenu = function(){
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
    db.query('SELECT * FROM department', function (err, results) {
      console.table(results);
      deptManagement.menu();
    });
  },
  add: function(){
    console.clear();
    inquirer.prompt({message:questionText.deptManagement.addNew.title,
        type:'input',
        name:'title'}).then(function(response){
          db.query('INSERT INTO department (department_name) VALUES (?)', [response.title], function(err, results){
            console.clear();
            if(err) console.log(err);
            console.log(results);
            console.log('Department `'+response.title+'` added.');
            deptManagement.menu();
          })
        })
  },
  edit: function(){
    console.clear();
    inquirer.prompt({message:questionText.deptManagement.choose,
      type:'input',
      name:'id'}).then(function(response){
        var id = response.id;
        db.query('SELECT * FROM department WHERE id = ?', [id], function(err, results){
          console.clear();
          if(err) console.log(err);
          console.log('Department Selected:');
          console.log(results);
          var result = results;
          inquirer.prompt({message:questionText.deptManagement.edit.prompt,
            type:'list',
            name:'answer',
            choices:[...questionText.deptManagement.edit.choices, questionText.generic.exit]}).then(function(response){
                if(response.answer === questionText.deptManagement.edit.choices[0]){
                  inquirer.prompt({message:questionText.deptManagement.addNew.title,
                    type:'input',
                    name:'answer'}).then(function(response){
                      db.query('UPDATE department SET department_name = ? WHERE id = ?',[response.answer, id], function(err, results){
                        console.clear();
                        if(err) console.log(err);
                        console.log('Department #'+id+' updated.');
                        deptManagement.menu();
                      })
                    })
                }
                else if (response.answer === questionText.generic.exit){
                  console.clear();
                  deptManagement.menu();
                }
            })
        })
      })
  },
  delete: function(){
    console.clear();
    inquirer.prompt({message:questionText.deptManagement.choose,
      type:'input',
      name:'id'}).then(function(response){
        var id = response.id;
        db.query('SELECT * FROM department WHERE id = ?', [id], function(err, results){
          console.clear();
          if(err) console.log(err);
          console.log('Department Selected:');
          console.log(results);
          var result = results;
          inquirer.prompt({message:questionText.generic.areYouSure,
          type:'list',
          name:'answer',
          choices:[...questionText.generic.yesNo]}).then(function(response){
            if(response.answer === questionText.generic.yesNo[0]){
              db.query('DELETE FROM department WHERE id = ?',[id], function(err, results){
                console.clear();
                if(err) console.log(err);
                console.log('Element deleted.');
                deptManagement.menu();
              });
            }
            else{
              console.clear();
              deptManagement.menu();
            }
          })
        })
      })
  },
}
const roleManagement = {
  menu: function(){
    inquirer.prompt(questions.roleMenu).then(function(response){
      if(response.answer === questionText.roleManagement.choices[0]){
        console.clear();
        roleManagement.view();
      }else if(response.answer === questionText.roleManagement.choices[1]){
        console.clear();
        roleManagement.add();
      }else if(response.answer === questionText.roleManagement.choices[2]){
        console.clear();
        roleManagement.edit();
      }else if(response.answer === questionText.roleManagement.choices[3]){
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
    var sql = `SELECT roles.id, roles.title AS role, roles.salary, department.department_name AS department
    FROM roles
    LEFT JOIN department ON roles.department_id = department.id`;
    db.query(sql, function (err, results) {
      if(err) console.log(err);
      console.table(results);
      roleManagement.menu();
    });
  },
  add: function(){
    console.clear();
    inquirer.prompt([
        {message:questionText.roleManagement.addNew.title,type:'input',name:'title'},
        {message:questionText.roleManagement.addNew.salary, type:'input',name:'salary'},
        {message:questionText.roleManagement.addNew.department, type:'input',name:'department'}
      ]).then(function(response){
          db.query('INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)', [response.title, response.salary, response.department], function(err, results){
            console.clear();
            if(err) console.log(err);
            console.log(results);
            console.log('Role `'+response.title+'` added.');
            roleManagement.menu();
          })
        })
  },
  edit: function(){
    console.clear();
    inquirer.prompt({message:questionText.deptManagement.choose,
      type:'input',
      name:'id'}).then(function(response){
        var id = response.id;
        db.query('SELECT * FROM roles WHERE id = ?', [id], function(err, results){
          console.clear();
          if(err) console.log(err);
          console.log('Role Selected:');
          console.log(results);
          var result = results;
          inquirer.prompt({message:questionText.roleManagement.edit.prompt,
            type:'list',
            name:'answer',
            choices:[...questionText.roleManagement.edit.choices, questionText.generic.exit]}).then(function(response){
                if(response.answer === questionText.roleManagement.edit.choices[0]){
                  inquirer.prompt({message:questionText.roleManagement.addNew.title,
                    type:'input',
                    name:'answer'}).then(function(response){
                      db.query('UPDATE roles SET title = ? WHERE id = ?',[response.answer, id], function(err, results){
                        console.clear();
                        if(err) console.log(err);
                        console.log('Role #'+id+' updated.');
                        roleManagement.menu();
                      })
                    })
                }
                else if(response.answer === questionText.roleManagement.edit.choices[1]){
                  inquirer.prompt({message:questionText.roleManagement.addNew.salary,
                    type:'input',
                    name:'answer'}).then(function(response){
                      db.query('UPDATE roles SET salary = ? WHERE id = ?',[response.answer, id], function(err, results){
                        console.clear();
                        if(err) console.log(err);
                        console.log('Role #'+id+' updated.');
                        roleManagement.menu();
                      })
                    })
                }
                else if(response.answer === questionText.roleManagement.edit.choices[2]){
                  inquirer.prompt({message:questionText.roleManagement.addNew.department,
                    type:'input',
                    name:'answer'}).then(function(response){
                      db.query('UPDATE roles SET department_id = ? WHERE id = ?',[response.answer, id], function(err, results){
                        console.clear();
                        if(err) console.log(err);
                        console.log('Role #'+id+' updated.');
                        roleManagement.menu();
                      })
                    })
                }
                else if (response.answer === questionText.generic.exit){
                  console.clear();
                  roleManagement.menu();
                }
            })
        })
      })
  },
  delete: function(){
    console.clear();
    roleManagement.menu();
  },
}
const employeeManagement = {
  menu: function(){
    inquirer.prompt(questions.employeeMenu).then(function(response){
      if(response.answer === questionText.employeeManagement.choices[0]){
        employeeManagement.view();
      }else if(response.answer === questionText.employeeManagement.choices[1]){
        console.clear();
        employeeManagement.add();
      }else if(response.answer === questionText.employeeManagement.choices[2]){
        console.clear();
        employeeManagement.edit();
      }else if(response.answer === questionText.employeeManagement.choices[3]){
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
    sql = `SELECT employees.id, employees.first_name, employees.last_name, roles.title AS role, roles.salary, department.department_name AS department, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employees
    LEFT JOIN employees AS manager ON employees.manager_id = manager.id  
    LEFT JOIN roles ON employees.role_id = roles.id
    LEFT JOIN department ON roles.department_id = department.id;
    `
    db.query(sql, function (err, results) {
      if(err) console.log(err);
      console.table(results);
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
