    var mysql = require("mysql");
    var inquirer = require("inquirer");
    var Table = require("cli-table3");
    
    var connection =mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"130166Jett34",
        database:"bamazon_db",
        port:3306
    
    })
    connection.connect();
    
    var display = function (){
        connection.query("SELECT * FROM products",function(err, data){
            if(err) throw err;
            console.log("------------------------------------------------------------------------------------------------------" );
            console.log(                            "!!   Welcome to Bamazon   !!"                                               );
            console.log("------------------------------------------------------------------------------------------------------" );
            console.log(                             "!!  No Yordles Allowed   !!"                                               );
            console.log("------------------------------------------------------------------------------------------------------" );
        
        var table = new Table({
            head: ['Product Id', 'Product Description','Cost'],
            colWidths: [12, 50, 8],
            colAligns: ["center","left","right"],
          style: {
              head:["aqua"],
              compact: true,
              border: ["blue"], 
          }
        });
    
        for(var i = 0; i< data.length; i++){
            table.push([data[i].id,data[i].product_name,data[i].price]);
        }
        console.log(table.toString());
        console.log("");
        shopping();
    });
    
    };
    
    var shopping = function(){
        inquirer
        .prompt({
            name:"buyProduct",
            type:"input",
            message: "Enter the product Id of the item you wish to purchase."
        })
        
        .then(function(answer1) {
            var selection = answer1.buyProduct;
            connection.query("SELECT * FROM products WHERE id=?", selection,function(err,data){
                if(err) throw err;
                if (data.length === 0){
                    console.log("We don't sell this item, please enter a Product id from the list above");
                   
                    shopping();
                }else {
                    inquirer.prompt({
                        name: "quantity",
                        type: "input",
                        message:" How many items would you like to purchase?"
                    }).then(function(answer2){
                        var quantity = answer2.quantity;
                        if (quantity > data[0].stock_quantity){
                            console.log(" Only + " + data[0].stock_quantity + " items available.")
                            shopping();
                        }else{
                            console.log("");
                            console.log(data[0].product_name + " purchased ");
                            console.log(quantity + "quantity at $" + data[0].price);
    
                            var newQuantity = data[0].stock_quantity - quantity;
                            connection.query(
                                "UPDATE products1 SET stock_quantity = "+ newQuantity + "WHERE id = " + data[0].id, function(er,resUpdate){
                                   if(err) throw err;
                                   console.log(""); 
                                   console.log("Boom!");
                                   console.log("Your order has been Processed."); 
                                   console.log(" Thank You Shop at Bamazon again!"); 
                                   console.log(""); 
                                   connection.end();
                                }
                            ); 
                        }
                    });
                }
                
            });
        });
    };
    
    
                
    
    
    display();