const db = require("./db/connection");

async function viewAllDepartments() {
    try {
     const departments =
     await db.query("SELECT * FROM department").promise()

        return departments;
    } catch (err) {
        console.log(err);
    }
}

module.exports = { viewAllDepartments };