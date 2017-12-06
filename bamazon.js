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
                // ['First value', 'Second value'], ['First value', 'Second value']
            );
        }


        console.log(table.toString());

        start();

        // console.log(res);
        // connection.end();
    });
}


// function which prompts the user for what action they should take
function start() {
    inquirer
        .prompt([{
            name: "itemID",
            type: "input",
            message: "Enter the ItemID of the item you would like to purchase:",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                console.log("Please enter a valid number.");
                return false;
            }
        }, {
            name: "quantity",
            type: "input",
            message: "How many?",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                console.log("Please enter a number.");
                return false;
            }
        }])
        .then(function(answer) {
            connection.query("SELECT * FROM products WHERE item_id=" + answer.itemID, function(err, res) {
                if (err) throw err;

                if (answer.quantity > res[0].stock_quantity) {
                    console.log("We don't have that many in stock.");
                }
                else {
                    console.log("ItemID:" + answer.itemID + ", Quantity: " + answer.quantity + ", Total: $" + (answer.quantity * res[0].price));
                    var newQuantity = res[0].stock_quantity - answer.quantity;
                    connection.query("UPDATE products SET ? WHERE ?", [{
                                stock_quantity: newQuantity
                            },
                            {
                                item_id: answer.itemID
                            }
                        ],
                        function(err, res) {
                            if (err) throw err;
                            connection.end();
                        });

                }
            });

            // based on their answer, either call the bid or the post functions
            // if (answer.postOrBid.toUpperCase() === "POST") {
            //     postAuction();
            // }
            // else {
            //     bidAuction();
            // }
        });
}
