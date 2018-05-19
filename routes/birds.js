var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var qs = require('querystring');
var url = require('url');
var connection = mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'root',
	database:'android'
});
connection.connect();
router.use(function timeLog(req,res,next){
	console.log('Time:',Date.now());
	next();
});

router.get('/',function(req,res){
	console.log(req.url);
	var arg1 = url.parse(req.url,true).query;
	console.log(arg1);
	var name = arg1['names'];
	var selectSql = "select * from contacts where name='"+name+"'" ;
	connection.query(selectSql,function(err,rows){
		if(err){
			console.log("error");
		}
		console.log(rows[0]['number']);
		var number = rows[0]['number'];	
		console.log("number is"+number);
		var json = JSON.stringify({
			SomeWords:number});
	return res.send(json);
	});
});


router.delete('/',function(req,res){
	console.log(req.url);
	var arg1 = url.parse(req.url,true).query;
	console.log(arg1);
	var name = arg1['names'];
	console.log(name);
	var deleteSql = "delete from contacts where name='"+name+"'" ;
	connection.query(deleteSql,function(err,rows){
		if(err){
                        var json = JSON.stringfy({
				SomeWords:"Wrong Name"});
			console.log("error");
			return res.send(json);
		}
		else{
		var json = JSON.stringify({
			SomeWords:"deleteSuccessfully"});
	return res.send(json);
	}
	});
});

router.post('/',function(req,res){
	console.log(req.body);
	console.log(req.param('names'));
	var name = req.param('names');
	var number = req.param('number');
	var insertSql = "insert into contacts(name,number) values(?,?)" ;
	var insertSqlParams = [name,number];
	connection.query(insertSql,insertSqlParams,function(err,rows){
		if(err){
			console.log("error");
		}
		var json = JSON.stringify({
			SomeWords:"insertSuccessfully"});
		res.send(json);
	});
});

router.patch('/',function(req,res){
	console.log(req.body);
	console.log(req.param('names'));
	var name = req.param('names');
	var number = req.param('number');
	var updateSql = "update contacts set number = ? where name = ?" ;
	var updateSqlParams = [number,name];
	connection.query(updateSql,updateSqlParams,function(err,rows){
		if(err){
			console.log("error");
		}
		var json = JSON.stringify({
			SomeWords:"updateSuccessfully"});
		res.send(json);
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
