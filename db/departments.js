const db = require("./connection");
const inquirer  = require("inquirer");


async function viewAllDepartments() {
    try {
        const departments =
        await db.promise().query('SELECT * FROM department');
        return departments[0];
    } catch (err) {
        console.log(err);
    }
};

async function addDepartment() {
    try{
        const departments = await viewAllDepartments();
        const { name } =
        await inquirer.prompt([
            {
            type: "input",
            name: "name",
            message: "What is the name of the department you would like to add?",
            }
        ])
        await db.query(`INSERT INTO department (name) VALUES ("${ name }")`)   
        const newDepartments = await viewAllDepartments();
        return newDepartments;
    } catch (err) {
        console.log(err);
    };  
};

async function deleteDepartment() {
    try {
        const departments = await viewAllDepartments();
        const { id } =
        await inquirer.prompt([
            {
                type: "list",
                name: "id",
                message: "What is the name of the department you would like to delete?",
                choices: departments.map((department) => { 
                    return {
                        name: department.name, 
                        value: department.id 
                    }
                })
            }
        ])
        await db.query(`DELETE FROM department WHERE id = ${id}`);
        return await viewAllDepartments();
    } catch (err) {
        console.log(err);
    };  
};



module.exports = { viewAllDepartments, addDepartment, deleteDepartment };