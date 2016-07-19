// npm dependencies
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

// app dependencies
var db = require('./models')
var app = express();

// middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// api routes
app.get('/user/:user', function(req,res){

	// find the portfolio ID based on the user email
	db.portfolio.find({where:{email:req.params.user}}).then(function(p){

		// in case there's an empty response
		if(!p){
			return res.status(400).json({message:"Couldn't find user"});
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
			return res.status(500).json({message:"Couldn't find admin"});
		}

		res.json({email:a.email});

	// failure cases
	}).error(function(err){
		return res.status(400).json({message:"Unauthorized", err:err});
	});
});

app.post('/admin/:admin', function(req, res){
	console.log(req.body);

	//find the ID for the admin, make sure it's not fake
	db.admin.find({where:{email:req.params.admin}}).then(function(a){

		// in case there's an empty response
		if(!a){
			return res.status(500).json({message:"Couldn't find admin"})
		}

		// find or create the security
		db.portfolio.find({where:{email:req.body.user}}).then(function(p){
			var newSecurity = {
	      symbol:req.body.symbol,
	      type:req.body.type,
	      shares:req.body.shares,
	      price:req.body.price,
	      value: req.body.value,
	      portfolioID: p.id
			}

			// create the security
			db.security.findOrCreate({where:newSecurity}).spread(function(s){

				// in case there's an empty response
				if(!s){
					return res.status(500).json({message:"Unable to save security"});
				}

				// send what was successfully saved
				return res.json({security:s});

			// error cases
			}).error(function(err){
				return res.status(400).json({message:"Couldn't create security", err:err});
			});
		}).error(function(err){
			return res.status(400).json({message:"Couldn't find portfolio", err:err});
		});
	}).error(function(err){
		return res.status(400).json({message:"Unauthorized Admin", err:err});
	});
});

app.put('/admin/:admin', function(req,res){
	//find the ID for the admin, make sure it's not fake
	db.admin.find({where:{email:req.params.admin}}).then(function(a){

		// in case there's an empty response
		if(!a){
			return res.status(500).json({message:"Couldn't find admin"})
		}

		var security = {
      symbol:req.body.symbol,
      type:req.body.type,
      shares:req.body.shares,
      price:req.body.price,
      value: req.body.value,
      portfolioID: req.body.portfolioID
		}

		db.security.find({where:{id:req.body.id}}).then(function(s){
			if(!s){
				return res.status(500).json({message:"Couldn't find security", err:err});
			}

			s.updateAttributes(security).then(function(){
				return res.status(200).json({message:'Updated'});
			})

		}).error(function(err){
			return res.status(500).json({message:"Unable to save security", err:err});
		});

	}).error(function(err){
		return res.status(400).json({message:"Unauthorized Admin", err:err});
	});
});

app.delete('/admin/:admin/sec/:secID', function(req,res){
	console.log(req.body)

	//find the ID for the admin, make sure it's not fake
	db.admin.find({where:{email:req.params.admin}}).then(function(a){

		// in case there's an empty response
		if(!a){
			return res.status(500).json({message:"Couldn't find admin"})
		}

		db.security.find({where:{id:req.params.secID}}).then(function(s){
			// in case there's an empty response
			if(!s){
				return res.status(500).json({message:"Couldn't find security"});
			}

			// delete and return
			s.destroy()
		}).then(function(err){
			return res.status(200).json({message:'deleted'});

		// error case
		}).error(function(err){
			return res.status(500).json({message:"Unable to save security", err:err});
		});
	}).error(function(err){
		return res.status(400).json({message:"Unauthorized Admin", err:err});
	});
});

// login main page
app.get('/*', function(req,res){
	res.sendFile(path.join(__dirname, 'public/index.html'));
});

// app listen
app.listen(process.env.PORT || 3000);