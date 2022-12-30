const db = require("./connection");
const inquirer  = require("inquirer");
const { viewAllRoles } = require("./roles");

async function viewAllEmployees() {
    try {
     const employees =
     await db.query('SELECT * FROM employee LEFT JOIN role ON role.id = employee.role_id')
     
     return employees;
    } catch (err) {
        console.log(err);
    }
}

async function addEmployees() {
    try{
        const roles = await viewAllRoles();
        const employees = await viewAllEmployees();
    
        const { firstName, lastName, roleId, manager } =
        await inquirer.prompt([
            {
                type: "input",
                name: "firstName",
                message: "What is the first name of the employee you would like to add?",
            },
            {
                type: "input",  
                name: "lastName",
                message: "What is the last name of the employee you would like to add?",
            },
            {
                type: "list",
                name: "roleId",
                message: "What is the employee's role in the company?",
                choices: roles.map((role) => {
                    return {
                        name: role.title,
                        value: role.id
                    }
                    })
            },
            {
                type: "list",
                name: "manager",
                message: "Who is this employee's manager?",
                choices: [ 
                    ...employees.map(employee => {
                        return {
                            value: employee.id,
                            name: `${employee.first_name} ${employee.last_name}`
                        }
                    }),
                    {name: "None", value: null}
                ]
            }
        ])
        await db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${ firstName }", "${ lastName }", ${ roleId }, ${ manager })`);

        const newEmployees = await viewAllEmployees();
        return newEmployees;         
    } catch (err) {
        console.log(err);
    };  
};

async function deleteEmployees() {
    try {
        const newEmployees = await viewAllEmployees();
        const { id } =
        await inquirer.prompt([
            {
                type: "list",
                name: "id",
                message: "What is the name of the employee you would like to delete?",
                choices: newEmployees.map((employee) => { 
                    return {
                        name: `${employee.first_name}, ${employee.last_name}`,
                        value: employee.id 
                    }
                })
            }
        ])
        await db.query(`DELETE FROM employee WHERE id = ${id}`);
        
        return await viewAllEmployees();
    } catch (err) {
        console.log(err);
    };  
};

async function updateEmployeeRole() {
    try {
        const employees = await viewAllEmployees();
        const employeeRoles = await viewAllRoles();
        const { employee, newRole } = await inquirer.prompt([
            {
                type: "list",
                name: "employee",
                message: "Which employee's role would you like to update?",
                choices: employees.map((employee) => {
                    return {
                        name: `${employee.first_name}, ${employee.last_name}`,
                        value: employee.id
                    };
                }),
            },
            {
                type: "list",
                name: "newRole",
                message: "What is the employee's new role?",
                choices: employeeRoles.map ((role) => {
                    return {
                        name: role.title,
                        value: role.id
                    };
                })
            }
        ])
        await db.query(`UPDATE employee SET role_id = ${newRole} WHERE id = ${employee}`);
        
        const updatedEmployeeRole = await viewAllEmployees();
        return await updatedEmployeeRole;
    } catch (err){
        console.log(err)
    }
}

module.exports = { viewAllEmployees, addEmployees, deleteEmployees, updateEmployeeRole };