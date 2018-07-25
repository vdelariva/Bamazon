// Simple point of sale application

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
    
    purchaseItem();
  });
  
// ____________________________________________________________________________________
// Functions
// ____________________________________________________________________________________

function purchaseItem() {
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;

        displayItems(results);

        inquirer.prompt([
            {
                name: "itemNumber",
                type: "input",
                message: "Which item would you like to purchase?",
                validate: function(num){
                    if (parseInt(num) < results.length) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "qty",
                type: "input",
                message: "How many would you like to purchase?",
                // validate: function(num){
                //     if (parseInt(num) < results.length) {
                //         return true;
                //     }
                //     return false;
                // }

            }
          ])
          .then(function(answer) {
            console.log(`Answer: ${answer.itemNumber}\nQty: ${answer.qty}`);
          });

    });
    connection.end();
}

// ____________________________________________________________________________________

function displayItems(list) {

    console.log(chalk.blue("\nItem #  Product                   Department      Price($)       Available Qty"));
    console.log(chalk.blue("------------------------------------------------------------------------------"));

    // Display the inventory
    for (var i =0; i < list.length; i++) {
        console.log(`${[i].toString().padEnd(7)} ${list[i].product_name.padEnd(25)} ${list[i].department.padEnd(17)} ${list[i].customer_price.toString().padEnd(17)} ${list[i].stock_quantity}`);
    }
    console.log("\n");
}

// ____________________________________________________________________________________
