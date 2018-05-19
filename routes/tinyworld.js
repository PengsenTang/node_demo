var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var qs = require('querystring');
var url = require('url');
var connection = mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'root',
	database:'tinyworld'
});
connection.connect();
router.use(function timeLog(req,res,next){
	console.log('Time:',Date.now());
	next();
});


router.post('/login',function(req,res){
	console.log(req.body);
	console.log(req.param('name'));
	var name = req.param('name');
	var password = req.param('password');
	var selectSql = "select authentication.password from authentication,user_info where user_info.phone_number = ?" ;
	var selectSqlParams = [name];
	connection.query(selectSql,selectSqlParams,function(err,rows){
		if(err){
			console.log("error");
		}
		if(rows[0]['password']==password)
			{
			var json = JSON.stringify({
				SomeWords:"matched"});
			res.send(json);
		}
		else{
			var json = JSON.stringify({
				Somwords:"NOT matched"});
			res.send(json);
		}
	});
});



router.get('/about',function(req,res){
	res.send('About birds');
});


router.get('/all',function(req,res){
	var selectSql = "select* from contacts" ;
	var que = connection.query(selectSql,function(err,rows){
		if(err){
			console.log("error");
		}
		console.log(rows);
		return res.send(rows);
	});
        
});
module.exports = router;
