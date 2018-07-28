// Required NPM modules
var mysql = require("mysql");
var inquirer = require("inquirer");
var chalk = require("chalk");

var sqlConfig = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon_DB"
};

// create the connection information for the sql database
var connection = mysql.createConnection(sqlConfig);

// connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
    
    console.log(chalk.blue.bold("\nWelcome to Bamazon Supervisor Department Management Program\n"))
    manageDepartments();
});

// ____________________________________________________________________________________
// Functions
// ____________________________________________________________________________________

function manageDepartments() {

    // Prompt user for command selection
    inquirer.prompt([
        {
            name: "command",
            type: "rawlist",
            message: "Please select a function",
            choices: ["View Product Sales by Department", "Create New Department", "Exit"]
        }
    ])
    .then(function(cmd) {
        // console.log(cmd);
        switch (cmd.command) {
            case "View Product Sales by Department":
                viewSales();
                break;
            case "Create New Department":
                addDepartment();
                break;
            case "Exit":
                exitBamazon();
                break;
        }
    });
}

// ____________________________________________________________________________________

function viewSales() {

    // Query the DB for all items in store inventory
    connection.query("SELECT department, SUM(product_sales) AS Total_Sales FROM products LEFT JOIN departments ON department = department_name GROUP BY department", 
    (err, results) => {
        if (err) throw err;

        console.log(`Results: ${JSON.stringify(results)}`);
        manageDepartments();
    });
}

// ____________________________________________________________________________________

function addDepartment() {

    inquirer.prompt ([
        {
            name: "name",
            type: "input",
            message: "Enter New Department Name"
        },
        {
            name: "costs" ,
            type: "input",
            message: "Enter Department Overhead Costs",
        }
    ])
    .then(function(response) {
        // Add new department to list
        connection.query("INSERT INTO departments SET ?", 
            [{department_name: response.name, over_head_costs: response.costs}],
            (err, results) =>  {
                if (err) throw err;

                console.log(chalk.green.bold(`\n${results.affectedRows} product added!\n`));
                manageDepartments();
        });
    });
}

// ____________________________________________________________________________________

function exitBamazon() {

    console.log(chalk.blue.bold("\nHave a great day!\n"))
    connection.end();
}