var express = require('express');
var path = require('path');
var app = express();

// middleware
app.use(express.static(path.join(__dirname, 'public')));

// login main page
app.get('/*', function(req,res){
	res.sendFile(path.join(__dirname, 'public/index.html'));
});

// app listen
app.listen(process.env.PORT || 3000);