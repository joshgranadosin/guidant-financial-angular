// npm dependencies
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

// app dependencies
var db = require('./models')
var app = express();

// middleware
app.use(express.static(path.join(__dirname, 'public')));

// api routes
app.get('/user/:user', function(req,res){

	// find the portfolio ID based on the user email
	db.portfolio.find({where:{email:req.params.user}}).then(function(p){

		// in case there's an empty response
		if(!p){
			return res.status(400).json({message:"Couldn't find user", err:err});
		}

		// find all securities with that portfolio ID
		db.security.findAll({where:{portfolioID: p.id}}).then(function(s){

			// send the email and securities back
			return res.json({email:p.email, securities:s});

		// failure cases
		}).error(function(err){
			return res.status(400).json({message:"Couldn't find securities", err:err});
		});
	}).error(function(err){
		return res.status(400).json({message:"Couldn't find user", err:err});
	});
});

app.get('/admin/:admin', function(req, res){

	//find the ID for the admin
	db.admin.find({where:{email:req.params.admin}}).then(function(a){

		// in case there's an empty response
		if(!a){
			return res.status(400).json({message:"Couldn't find admin", err:err});
		}

		res.json({email:a.email});

	// failure cases
	}).error(function(err){
		return res.status(400).json({message:"Unauthorized", err:err});
	});
});

// login main page
app.get('/*', function(req,res){
	res.sendFile(path.join(__dirname, 'public/index.html'));
});

// app listen
app.listen(process.env.PORT || 3000);