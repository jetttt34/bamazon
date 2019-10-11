var mysql = require('mysql');
var inquirer = require('inquire');
var Table = require('cli-table2');

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "130166Jett34",
    database: "bamazon_db",
    port: 3306
});
connection.connect();

var display = function(){
    connection.query('SELECT * FROM products', function(err, res){
        if(err) throw err;
        console.log('');
        console.log('-------------------------------------------------------------------------');
        console.log('                      !!   Welcome to Bamazon    !!    ');
        console.log('-------------------------------------------------------------------------');
        console.log('');
        console.log('                        Find your product below');
        console.log('');
    
        var table = new Table({
            head: ['Product ID', 'Product Description', 'Cost'], 
            colWidths: [12, 50, 8],
            colAligns: ['center', 'left', 'right'], 
            style: {
                head: ['aqua'],
                compact: true
            }
        });
        for (var i = 0; i < res.length; i++){
            table.push ([res[i].id, res[i].product_name, res[i].price]);
        }
        console.log(table.toString());
        console.log('');
    });
};


var shopping = function(){
    
inquirer = require("inquirer");
inquirer
 .prompt([
   {
     type: 'input',
     name: 'productToBuy',
     message: 'please enter the Product ID of the item you wish to purchase.!',
      },
 ])
 .then(answers => {
   console.info('Answer:', answers.productToBuy);
   connection.query('SELECT * FROM products WHERE Id=?', selection, function(err,res){
    if(err) throw err;
    if(res.length === 0){
    console.log('That product doesnt exist, Please enter a Product Id from the list above');
   
    shopping();
    }else{
    inquirer
        .prompt([
            {
                name: "quantity",
                type: "input",
                message: "How many items would you like to purchase?"
            },
        ])
        .then(answers1 => {
            console.info('Answer:', answers1.productToBuy);
            var quantity = answers1.
            if ()
        })
    connection.end // right here!
 };

   });
   });
};
display();
shopping();

//add this:
connection.query('SELECT * FROM products WHERE Id=?', selection, function(err,res){
    console.info('Answer:', answers.productToBuy);
    //add this
    var selection = answers.productToBuy;
     connection.query('SELECT * FROM products WHERE Id=?', selection, function(err,res){
    
    (sorry, I kept accidentally hitting enter..)
    console.info('Answer:', answers.productToBuy);
    //add this
    var selection = answers.productToBuy;
    //then this should work:
    connection.query('SELECT * FROM products WHERE Id=?', selection, function(err,res){