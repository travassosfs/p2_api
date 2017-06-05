module.exports = function(app,connection) {

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

	app.put('/sirast/login', function(req, res){
		var user = req.body;
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
};