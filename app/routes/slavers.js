module.exports = function(app,connection) {

	app.put('/sirast/user/slavers/location', function(req, res){
		var slaver = req.body;

		connection.query('select * from slavers where id = ' + slaver.id + ";", function(erro, row){
			console.log(row);
			var query = "update slavers set" +
			" location1 = '" + slaver.location + "'," +
			" location2 = '" + row[0].location1 + "'," +
			" location3 = '" + row[0].location2 + "'," +
			" location4 = '" + row[0].location3 + "'," + 
			" location5 = '" + row[0].location4 + "'" + 
			" where id = "+slaver.id+";";

			connection.query(query, function(erro, result){
				res.send(erro);
			});
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

	app.get('/sirast/user/slaver', function(req, res){
		var user = req.query;
		var query = "select * from slavers where id_master = " + user.masterId + " AND id = " + user.id;
	  	console.log(query);
	  	connection.query(query, function(erro, result){
			res.send(result);
		});
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
};