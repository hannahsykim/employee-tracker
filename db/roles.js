const db = require("./connection");
const inquirer  = require("inquirer");
const { viewAllDepartments } = require("./departments");


async function viewAllRoles() {
    try {
     const roles =
     await db.query('SELECT role.id, role.title, role.salary, department.name AS department FROM role LEFT JOIN department ON role.department_id = department.id')
     return roles;

    } catch (err) {
        console.log(err);
    };
};



async function addRole() {
    try {
        const departments = await viewAllDepartments();
        const { title, salary, department_id } =
        await inquirer.prompt([
            {
            type: "input",
            name: "title",
            message: "What is the title of your role?",
            },
            {
            type: "input",
            name: "salary",
            message: "What is the salary of your role?",
            },
            {
            type: "list",
            name: "department_id",
            message: "What is the department of your role?",
            choices: departments.map((department) => {
                return {
                    name: department.name,
                    value: department.id,
                }
            })
            }
        ])
        await db.query(`INSERT INTO role (title, salary, department_id) VALUES ("${ title }", "${ salary }", "${ department_id }")`)   
        const newRoles = await viewAllRoles();
        return newRoles;
        
    } catch (err) {
        console.log(err);
    };  
};


async function deleteRole() {
    try {
        const CurrentRole = await viewAllRoles();
        const { id } =
        await inquirer.prompt([
            {
                type: "list",
                name: "id",
                message: "What is the title of the role you would like to delete?",
                choices: CurrentRole.map((role) => { 
                    return {
                        name: role.title, 
                        value: role.id
                    }
                })
            }
        ])
        await db.query(`DELETE FROM role WHERE id = ${id}`);
        return await viewAllRoles();
        
    } catch (err) {
        console.log(err);
    };  
};


module.exports = { viewAllRoles, addRole, deleteRole };