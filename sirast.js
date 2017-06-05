var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');

var app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

var connection = mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'123465', 
	database:'sirast'
});

var rotaSlavers = require('./app/routes/slavers');
var rotaUser = require('./app/routes/masters');

rotaSlavers(app,connection);
rotaUser(app,connection);

app.listen(3030, function(){
	console.log('Servidor SIRAST Rodando na porta 3030')
});