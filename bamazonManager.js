var inquirer = require("inquirer");
var mysql = require("mysql");
var Table = require('cli-table');

//Database connection
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    afterConnection();
});

function afterConnection() {
    start();
}


// function which prompts the user for what action they should take
function start() {
    //Which item?
    inquirer
        .prompt([{
            name: "menu",
            type: "list",
            message: "Select an option: ",
            choices: [
                { name: "View Products for Sale", value: "PRINT_INVENTORY" },
                { name: "View Low Inventory", value: "PRINT_LOW" },
                { name: "Add to Inventory", value: "ADD_INVENTORY" },
                { name: "Add New Product", value: "ADD_NEW" }
            ]
        }])
        .then(function(answer) {
            switch (answer.menu) {
                case "PRINT_INVENTORY":
                    printInventory();
                    break;
                case "PRINT_LOW":
                    printLow();
                    break;
                case "ADD_INVENTORY":
                    addInventory();
                    break;
                case "ADD_NEW":
                    addNew();
                    break;
            }

            // //Print product table.
            // connection.query("SELECT * FROM products", function(err, res) {
            //     if (err) throw err;
            //     // instantiate
            //     var table = new Table({
            //         head: ['Item ID', 'Product Name', 'Department', 'Price: ', 'In Stock: '],
            //         // colWidths: [50, 50]
            //     });

            //     // table is an Array, so you can `push`, `unshift`, `splice` and friends
            //     for (let i in res) {
            //         table.push(
            //             [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
            //         );
            //     }
            //     console.log(table.toString());
            // });



            //How many?
            // connection.query("SELECT * FROM products WHERE item_id=" + answer.itemID, function(err, res) {
            //     if (err) throw err;

            //     if (answer.quantity > res[0].stock_quantity) {
            //         console.log("We don't have that many in stock.");
            //     }
            //     else {
            //         console.log("ItemID:" + answer.itemID + ", Quantity: " + answer.quantity + ", Total: $" + (answer.quantity * res[0].price));
            //         var newQuantity = res[0].stock_quantity - answer.quantity;
            //         connection.query("UPDATE products SET ? WHERE ?", [{
            //                     stock_quantity: newQuantity
            //                 },
            //                 {
            //                     item_id: answer.itemID
            //                 }
            //             ],
            //             function(err, res) {
            //                 if (err) throw err;
            //                 connection.end();
            //             });
            //     }
            // });
        });
}

//View Products for Sale
function printInventory() {
    console.log("printInventory");
    connection.end();
}

//View Low Inventory
function printLow() {
    console.log("printLow");
    connection.end();
}

//Add to Inventory
function addInventory() {
    console.log("addInventory");
    connection.end();
}

//Add New Product
function addNew() {
    console.log("addNew");
    connection.end();
}
