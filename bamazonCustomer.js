var mysql = require('mysql');
var inquire = require('inquire');
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
    inquirer.prompt({
        name: 'productToBuy',
        type: 'input',
        message: 'please enter the Product ID of the item you wish to purchase.!'
    }).then(function(answer1){
        var selection = answer1.inquirer.response.productToBuy;
        connection.query('SELECT * FROM products WHERE Id=?', selection, function(err,res){
            if(err) throw err;
            if(res.length === 0){
                console.log('That product doesnt exist, Please enter a Product Id from the list above')
           
            shopping()
            }else{
            console.log('All is well');
            connection.end // right here!
            }
        });
    });
};

display();