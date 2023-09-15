
const inquirer = require('inquirer');

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
      message:questionText.mainMenu.prompt + questionText.generic.newline,
      name:'answer',
      choices: [questionText.mainMenu.choices, ...questionText.generic.exit]},
  deptManagement:{
    menu:{
      type:'list',
      message:questionText.generic.prompt + questionText.generic.newline,
      name:'answer',
      choices: [questionText.deptManagement.choices, ...questionText.generic.exit]},
  }
}

const Run = async function(){
  var nextQuestion = "mainMenu";
  var looping = true;
  while(looping){
    await inquirer.prompt(questions[nextQuestion]).then(function(response){
      switch (nextQuestion) {
        case "mainMenu":
          if(response.answer === questionText.mainMenu.choices[0]){

          }else if(response.answer === questionText.mainMenu.choices[1]){

          }else if (response.answer === questionText.mainMenu.choices[2]){

          }else{
            console.log("Bye bye!");
            looping = false;
          }
          break;
      
        default:
          break;
      }
    });
  }
}

await Run();