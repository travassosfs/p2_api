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

/*Serviço que deve retornar todos os aparelhos cadastrados
para o usuário possado via url
/sirast/user/slavers?userId=id*/
app.get('/sirast/user/slavers', function(req, res){
	var user = req.query;
	var query = "select * from slavers where id_master = " + user.userId;
  	
  	console.log(query);
  	
  	connection.query(query, function(erro, result){
		res.send(result);
	});
});

app.post('/sirast/user/slavers', function(req, res){
	var slaver = req.body;
	var query = 
	"INSERT INTO slavers (numero, usuario, id_master) VALUES ('"
	+slaver.number+"','"+slaver.userName+"','"+slaver.idMaster+"');";

  	connection.query(query, function(erro, result){
		res.send(erro);
	});
});

//Cadastrar usuario recebendo json 
//{"number":"12345678990","userName":"nomeDoUsuario","pass":"senha"}
app.post('/sirast/user', function(req, res){
	var user = req.body;
	var query = 
	"INSERT INTO masters (numero, usuario, senha) VALUES ('"
	+user.number+"','"+user.userName+"','"+user.pass+"');";
  	
  	connection.query(query, function(erro, result){
		res.send(erro);
	});
});

app.get('/sirast/login', function(req, res){
	var user = req.query;
	var query = 
	"select * from masters where usuario = '" + user.userName
	+ "' AND senha = '" + user.pass + "'";
  	console.log(query);
  	connection.query(query, function(erro, result){
  		if(result==null) {
			res.send(erro);
  		}else {
			res.send(result);
  		}
	});
});

app.listen(3030, function(){
	console.log('Servidor SIRAST Rodando na porta 3030')
});