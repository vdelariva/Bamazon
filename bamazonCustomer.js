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
    // Query the DB for all items in store inventory
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;

        var item = 0;
        displayItems(results);

        // Prompt customer to make purchase selection
        inquirer.prompt([
            {
                name: "itemNumber",
                type: "input",
                message: chalk.yellow("Which item would you like to purchase?"),
                validate: function(num){
                    // Check if item number is valid, this method returns the object if itemNumber is found
                    item = results.find(x => x.id === parseInt(num))
                    if (item) {
                        return true;
                    }
                    return false;
                }
            }
        ])
        .then(function(ans1) {
            // Split into two prompt statements. Use the item number from the first response to check if there is sufficient inventory, 
            // then proceed with purchase. Otherwise, ask customer to enter another amount.

            // Prompt user to select quantity
            inquirer.prompt([
                {
                    name: "qty",
                    type: "input",
                    message: chalk.yellow("How many would you like to purchase?"),
                    validate: function(num){
                        if (parseInt(num) < item.stock_quantity) {
                            return true;
                        }
                        console.log(chalk.red("\rInsufficient quantity in stock, please select another amount."));
                        return false;
                    }
                }
            ])
            .then(function(ans2) {
                updateInventory(item, parseInt(ans2.qty));
            })
        });
    });
}

// ____________________________________________________________________________________
// Possibly use this function to dry out the code - same function used in manager code. If not remove...

function viewProducts() {

    // Query the DB for all items in store inventory
    connection.query("SELECT * FROM products", (err, results) => {
        if (err) throw err;

        console.log(chalk.blue.bold("\nStore Inventory"));
        displayItems(results);
    });
}

// ____________________________________________________________________________________

function displayItems(list) {

    console.log(chalk.blue("\nItem #  Product                   Department      Price($)       Available Qty"));
    console.log(chalk.blue("------------------------------------------------------------------------------"));

    // Display the inventory
    for (var i =0; i < list.length; i++) {
        console.log(`${list[i].id.toString().padEnd(7)} ${list[i].product_name.padEnd(25)} ${list[i].department.padEnd(17)} ${list[i].customer_price.toString().padEnd(17)} ${list[i].stock_quantity}`);
    }
    console.log("\n");
}

// ____________________________________________________________________________________

function updateInventory(item, qty) {
    if (qty != 0) {
        connection.query(
            "UPDATE products SET ? WHERE ?",
            [{stock_quantity: (item.stock_quantity - qty)}, {id: item.id}],
            function(err, res) {
                if (err) throw err;

                console.log(chalk`\n{green.bold Thank you for your purchase!} Your total is {magenta $${item.customer_price*qty}.}\n`);
            }
        );
    }
    else {
        console.log(chalk.cyan(`\nSorry we weren't able to help you today. Come back soon!\n`));
    }
    connection.end();
}