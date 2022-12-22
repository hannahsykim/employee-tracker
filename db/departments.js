const { default: inquirer } = require("inquirer");
const { promise } = require("./connection");
const db = require("./connection");
const prompt = require('prompt-sync')();

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
    await prompt([
            {
            type: "input",
            name: "name",
            message: "What is the name of the department you would like to add?",
            }
        ])
    .then((res) => {
        db.promise().query('INSERT INTO department (name) VALUES (?)', {name: res.name}, (err) => 
            {
            if (err) throw err;
            console.log(`New Department added!`);
            console.table(res);
            return departments[0];
            })      
    })
}; 
    

async function deleteDepartment() {
    await prompt([
            {
            type: "input",
            name: "name",
            message: "What is the name of the department you would like to delete?",
            }
        ])
    try {
        await db.query('DELETE FROM department WHERE ?');
        return departments[0];
    } catch (err) {
        console.log(err);
    }  
};



module.exports = { viewAllDepartments, addDepartment, deleteDepartment };