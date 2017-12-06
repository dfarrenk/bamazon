var Table = require('cli-table');
var mysql = require("mysql");

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
      // console.log(JSON.stringify(res[i]));
      // console.log(res[i].item_id);
    }


    console.log(table.toString());

    // console.log(res);
    connection.end();
  });
}
