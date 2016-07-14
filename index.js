var express = require('express');
var path = require('path');
var app = express();

// middleware
app.use(express.static(path.join(__dirname, 'public')));

// api routes
app.get('/user/:user', function(req,res){

// fake user data
	var test1data = {email: "test1@email.com", securities: [
		{symbol:'MSFT', type:'STOCK', shares:100, price:55},
		{symbol:'LNKD', type:'STOCK', shares:100, price:190},
		{symbol:'BAC17F', type:'BOND', shares:100, price:105},
		{symbol:'BABFX', type:'FUND', shares:100, price:15}
	]}

	var test2data = {email: "test2@email.com", securities: [
		{symbol:'GOOGL', type:'STOCK', shares:150, price:100},
		{symbol:'T', type:'STOCK', shares:120, price:100},
		{symbol:'AMT21A', type:'BOND', shares:180, price:100},
		{symbol:'FABX', type:'FUND', shares:210, price:100}
	]}

	var test3data = {email: "test1@email.com", securities: [
		{symbol:'AMZN', type:'STOCK', shares:50, price:740},
		{symbol:'AAPL', type:'STOCK', shares:100, price:100},
		{symbol:'DOW19', type:'BOND', shares:150, price:100},
		{symbol:'TAGGX', type:'FUND', shares:200, price:20}
	]}

	res.json(test1data);

});

// login main page
app.get('/*', function(req,res){
	res.sendFile(path.join(__dirname, 'public/index.html'));
});

// app listen
app.listen(process.env.PORT || 3000);