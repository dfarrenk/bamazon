var inquirer = require("inquirer");
var mysql = require("mysql");
var Table = require('cli-table');
var maxID;

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
        });
}

//View Products for Sale
function printInventory() {
    //Print product table.
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        // instantiate
        var table = new Table({
            head: ['Item ID', 'Product Name', 'Department', 'Price: ', 'In Stock: '],
            // colWidths: [50, 50]
        });

        // table is an Array, so you can `push`, `unshift`, `splice` and friends
        for (let i in res) {
            table.push(
                [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
            );
        }
        console.log(table.toString());
    });
    connection.end();
}

//View Low Inventory
function printLow() {
    //Print product table.
    connection.query("SELECT * FROM products WHERE stock_quantity <= 5", function(err, res) {
        if (err) throw err;
        var table = new Table({
            head: ['Item ID', 'Product Name', 'Department', 'Price: ', 'In Stock: '],
        });

        for (let i in res) {
            table.push(
                [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
            );
        }
        console.log(table.toString());
    });
    connection.end();
}

//Add to Inventory
function addInventory() {
    var query = "SELECT item_id FROM products WHERE item_id=(SELECT max(item_id) FROM products);";
    //Get max ID for input validation.
    connection.query(query, function(err, res) {
        if (err) throw err;
        maxID = res[0].item_id;
    });

    inquirer
        .prompt([{
            name: "itemID",
            type: "input",
            message: "Enter ItemID: ",
            validate: function(value) {
                if (value % 1 === 0 && value >= 1 && value <= maxID) {
                    return true;
                }
                console.log("Please enter a valid number.");
                return false;
            }
        }, {
            name: "quantity",
            type: "input",
            message: "Add how many?",
            validate: function(value) {
                if (value % 1 === 0) {
                    return true;
                }
                console.log("Please enter a number.");
                return false;
            }
        }])
        .then(function(answer) {
            console.log("ItemID:" + answer.itemID + ", Quantity: " + answer.quantity);
            connection.query("UPDATE products SET stock_quantity = stock_quantity + " + answer.quantity + " WHERE ?", [{
                    item_id: answer.itemID
                }],
                function(err, res) {
                    if (err) throw err;
                });
            connection.end();
        });
}

//Add New Product
function addNew() {
    //TODO Insert
    console.log("Creating new item.");
    inquirer
        .prompt([{
            name: "productName",
            type: "input",
            message: "Product Name: ",
        }, {
            name: "departmentName",
            type: "input",
            message: "Department: ",
        }, {
            name: "price",
            type: "input",
            message: "Price: ",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                console.log("Please enter a number. (No currency symbols)");
                return false;
            }
        }, {
            name: "stockQuantity",
            type: "input",
            message: "Stock Quantity: ",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                console.log("Please enter a number.");
                return false;
            }
        }])
        .then(function(answer) {
            //INSERT INTO table_name (product_name, department_name, price, stock_quantity) VALUES (value1, value2, value3, value4);
            var query = "INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('" + answer.productName + "', '" + answer.departmentName + "', " + answer.price + ", " + answer.stockQuantity + ");";
            connection.query(query,
                function(err, res) {
                    if (err) throw err;
                    connection.end();
                });
        });
}
