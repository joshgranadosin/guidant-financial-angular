var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var db = require('./models')
var app = express();

// middleware
app.use(express.static(path.join(__dirname, 'public')));

// api routes
app.get('/user/:user', function(req,res){
	console.log(req.params);

	db.portfolio.find({where:{email:req.params.user}}).then(function(p){
		console.log(p.id);
		db.security.findAll({where:{portfolioID: p.id}}).then(function(s){
			console.log(s);
			res.json({email:p.email, securities:s});
		}).error(function(err){
			return res.status(400).json({message:"Couldn't find securities", err:err});
		});
	}).error(function(err){
		return res.status(400).json({message:"Couldn't find securities", err:err});
	})

// // fake user data
// 	var test1data = {email: "test1@email.com", securities: [
// 		{symbol:'MSFT', type:'STOCK', shares:100, price:55, value: 'auto'},
// 		{symbol:'LNKD', type:'STOCK', shares:100, price:190, value: 'auto'},
// 		{symbol:'BAC17F', type:'BOND', shares:100, price:105, value: 'auto'},
// 		{symbol:'BABFX', type:'FUND', shares:100, price:15, value: 1000000}
// 	]}

// 	var test2data = {email: "test2@email.com", securities: [
// 		{symbol:'GOOGL', type:'STOCK', shares:150, price:100, value: 'auto'},
// 		{symbol:'T', type:'STOCK', shares:120, price:100, value: 'auto'},
// 		{symbol:'AMT21A', type:'BOND', shares:180, price:100, value: 'auto'},
// 		{symbol:'FABX', type:'FUND', shares:210, price:100, value: 'auto'}
// 	]}

// 	var test3data = {email: "test1@email.com", securities: [
// 		{symbol:'AMZN', type:'STOCK', shares:50, price:740, value: 'auto'},
// 		{symbol:'AAPL', type:'STOCK', shares:100, price:100, value: 'auto'},
// 		{symbol:'DOW19', type:'BOND', shares:150, price:100, value: 'auto'},
// 		{symbol:'TAGGX', type:'FUND', shares:200, price:20, value: 'auto'}
// 	]}

// 	res.json(test1data);

});

// login main page
app.get('/*', function(req,res){
	res.sendFile(path.join(__dirname, 'public/index.html'));
});

// app listen
app.listen(process.env.PORT || 3000);