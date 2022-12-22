
const { prompt } = require("inquirer");
const db = require("./db/connection");
const { viewAllDepartments, addDepartment, deleteDepartment } = require("./db/departments");
const { viewAllEmployees } = require("./db/employees");
const { viewAllRoles } = require("./db/roles");

const start = async () => {
    console.log("Welcome to the Employee Manager!");
    const { choice } = await prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Delete a department',
                'Add a role',
                'Delete a role',
                'Add an employee',
                'Delete an employee',
                'Update an employee role',
                'Exit'
            ]
        }
    ])

    switch (choice) {
        case 'View all departments': 
            const ViewDepartments = await viewAllDepartments()
            console.table(ViewDepartments)
            break;
        case 'Add a department':
            const AddDepartment = await addDepartment()
            console.table(AddDepartment)
            break;
        case 'Delete a department':
            const DeleteDepartment = await deleteDepartment()
            console.table(DeleteDepartment)
            break;
            
        case 'View all roles':
            const ViewRoles = await viewAllRoles()
            console.table(ViewRoles)
            break;         
        case 'Add a role':
            const AddRole = await addRole()
            console.table(AddRole)
            break;
        case 'Delete a role':
            const DeleteRole = await deleteRole()
            console.table(DeleteRole)
            break;

        case 'View all employees':
            const ViewEmployees = await viewAllEmployees()
            console.table(ViewEmployees)
            break;
        case 'Add an employee':
            const AddEmployee = await addEmployee()
            console.table(AddEmployee)
            break;
        case 'Update an employee role':
            const UpdateEmployee = await updateEmployee()
            console.table(UpdateEmployee)
            break;
        case 'Delete an employee':
            const DeleteEmployee = await deleteEmployee()
            console.table(DeleteEmployee)
            break;

        case 'Exit':
            console.log("Goodbye!")
            process.exit()

    }
}

start();
