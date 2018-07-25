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

        displayItems(results);

        // Prompt customer to make purchase selection
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
            }
        ])
        .then(function(ans1) {
            // Split into two prompt statements. Use the item number of the first response to check if there is sufficient inventory, 
            // then proceed with purchase. Otherwise, ask customer to enter another amount.

            let item = results[parseInt(ans1.itemNumber)].id;

            // Prompt user to select quantity
            inquirer.prompt([
                {
                    name: "qty",
                    type: "input",
                    message: "How many would you like to purchase?",
                    validate: function(num){
                        if (parseInt(num) < results[item].stock_quantity) {
                            return true;
                        }
                        console.log(chalk.red(" Insufficient quantity in stock, please select another amount."));
                        return false;
                    }
                }
            ])
            .then(function(ans2) {
            // console.log(`Answer: ${ans1.itemNumber}\nQty: ${ans2.qty}`);
                let qty = results[item].stock_quantity - parseInt(ans2.qty);
                console.log (`Qty: ${qty}`);
                updateInventory(item, qty);
            })
            
          });

    });
    // connection.end();
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

function updateInventory(itemNum, remaining_qty) {
    var query = connection.query(
        "UPDATE products SET ? WHERE ?",
        [
          {
            stock_quantity: remaining_qty
          },
          {
            id: itemNum
          }
        ],
        function(err, res) {
            if (err) throw err;

            console.log(res.affectedRows + " products updated!\n");
        }
    );
    
    connection.end();

}