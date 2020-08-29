var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var sql = require("mssql");
// config for your database
var config = {
    user: 'utsav',
    password: 'utsav123',
    server: 'localhost', 
    database: 'recipes' ,
    "options": {
    "encrypt": false,
    "enableArithAbort": true
    }
};
app.use(express.static(__dirname));
sql.connect(config)
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(bodyParser.json());

// app.use(express.static(__dirname + "/public"));
//next line is used to include stylesheets without this line express does not 
//include css files


app.get("/",function(req,res){
	var request = new sql.Request();
	request.query('select * from healthproblems', function (err, result) {
            if (err) console.log(err)
			res.render("home",{problems:result.recordset})
        });
	//res.render("home");
})
app.get("/ingredients",function(req,res){
	//console.log("inside ingredients");
	var request = new sql.Request();
	request.query('select * from ingredients', function (err, result) {
            if (err) console.log(err)
			res.render("ingredient/ingredients",{ingredients:result.recordset})
        });
	//res.render("home");
})

app.get("/ingredients/:Id",function(req,res){
	var id = req.params.Id;
	var request = new sql.Request();
	//console.log("id route");
	request.query('select * from ingredients where id='+id, function (err, result) {
            
            if (err) console.log(err) 
            res.render("ingredient/showingredients",{ingredient:result.recordset});
        });
});
app.get("/coughRecipe",function(req,res){
	res.render("recipes",{recipes:recipes});
})

app.post("/coughRecipe",function(req,res){
	var name = req.body.name;
	var title = req.body.title;
	var description = req.body.description;
	var newRecipe = {name:name,title:title,description:description}
	recipes.push(newRecipe);
	res.redirect("/coughRecipe");
})

app.get("coughRecipe/new",function(req,res){
	res.render("new.ejs");
})

var server = app.listen(5000, function () {
    console.log('Server is running..');
});
