const db = require("./connection");
const inquirer  = require("inquirer");

async function viewAllRoles() {
    try {
     const roles =
     await db.promise().query('SELECT * FROM role')
     return roles[0]
    } catch (err) {
        console.log(err);
    }
}

async function addRole() {
    try{
        const roles = await viewAllRoles();
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
            type: "input",
            name: "department_id",
            message: "What is the department_id of your role?",
            }
        ])
        await db.query(`INSERT INTO role (title) VALUES ("${ title }", salary="${ salary }", department)`)   
        const newRoles = await viewAllRoles();
        return newRoles;
    } catch (err) {
        console.log(err);
    };  
};

async function deleteRole() {
    try {
        const role = await viewAllRoles();
        const { id } =
        await inquirer.prompt([
            {
                type: "list",
                name: "id",
                message: "What is the title of the role you would like to delete?",
                choices: role.map((role) => { 
                    return {
                        name: role.title, 
                        value: role.department_id
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