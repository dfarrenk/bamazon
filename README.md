# Bamazon

## Customer View

The customer view only has a single path. It prints the product table, then asks for an item ID and quantity before removing that quantity from the table and displaying the total price.
Should the customer enter an invalid item ID, the program will prompt again for a correct one.

![customer view](https://i.imgur.com/kkqVfkM.png "Customer View")

Should the customer attempt to buy more than is in stock, it'll display an error instead.

![customer view](https://i.imgur.com/jfe1LZq.png "Customer View")

## Manager View

Manager view presents a list with 4 options.

![manager view](https://i.imgur.com/HOHsvHw.png "Manager View")

'View Products for Sale' prints out the table, just as in Customer View.
![View Products for Sale](https://i.imgur.com/gdpNCie.png "View Products for Sale")

'View Low Inventory' prints out the rows that have 5 or less items in stock.
![View Low Inventory](https://i.imgur.com/HlgOkZx.png "View Low Inventory")

'Add to Inventory' prompts the user to enter in an itemID and a quantity, then adds that quantity to the items stock. It verifies for valid itemIDs just as the customer view does.
![Add to Inventory](https://i.imgur.com/A1GiIXM.png "Add to Inventory")

'Add New Product' asks a series of prompts and then inserts a new row into the table with the given information.

![Add New Product](https://i.imgur.com/CrXCEGm.png "Add New Product")
