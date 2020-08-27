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
sql.connect(config)
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(bodyParser.json());

var recipes = [
	{name:"Professor",title:"Kadha",description:"1.Mushkil hai"},
	{name:"Professor",title:"Kadha",description:"1.Mushkil hai"},
	{name:"Professor",title:"Kadha",description:"1.Mushkil hai"},
	{name:"Professor",title:"Kadha",description:"1.Mushkil hai"}
	]
	
// app.use(express.static(__dirname + "/public"));
//next line is used to include stylesheets without this line express does not 
//include css files
app.use(express.static(__dirname));
app.get("/",function(req,res){
	var request = new sql.Request();
	request.query('select * from healthproblems', function (err, result) {
            if (err) console.log(err)
			res.render("home",{problems:result.recordset})
        });
	//res.render("home");
})

app.get("/problems/:problem/",function(req,res){
	var problem1=req.params.problem;
	var request = new sql.Request();
	request.query('select * from problemdetails', function (err, result) {
            
            if (err) console.log(err) 
            res.render("show",{problem:result.recordset});
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
