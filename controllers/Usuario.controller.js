var UsuarioCtrl = {};
var Usuario = require('../models/Usuario.model');
var Autenticacao = require('./Autenticacao.controller');

UsuarioCtrl.getAll = function(req, res){

	Usuario.forge().fetchAll()
	.then(
		//Função executada em caso de sucesso
		function(rows){
			usuarios = rows.toJSON();
			res.status(200).json(usuarios);
		}
	).catch(
		//Função executada em caso de erro
		function(error){
			res.status(400).json({error: error});
		}
	);
}

UsuarioCtrl.login = function(req, res){
	var usuario = req.body;
	Usuario.forge()
		.query(function(q){
			q.where('email','=', usuario.email);
			q.where('senha','=', usuario.senha);
		})
		.fetch()
		.then(function(row){
			if(row==null) return res.status(401).json({msg: "E-mail ou Senha incorretos"});
			var usr = {
				id : row.attributes.id,
				email : row.attributes.email,
				nome : row.attributes.nome
			}
			console.log(usr);
			var token = Autenticacao.gerarToken(usr);
			res.status(200).json({usurario: usr,token: token,msg : "Login com sucesso"});
		})

}

UsuarioCtrl.get = function(req, res){
	Usuario.forge({id: req.params.id}).fetch()
	.then(
		//Função executada em caso de sucesso
		function(row){
			var usuario = row.toJSON();
			res.status(200).json(usuario);
		}
	).catch(
		//Função executada em caso de erro
		function(error){
			res.status(400).json({error: error});
		}
	);
}

UsuarioCtrl.criaUsuario = function(req, res){

	var novoUsuario = req.body;
	console.log(novoUsuario);
	Usuario.forge().save(novoUsuario)
	.then(
		//Função executada quando o usuário é inserido
		function(usuario){
			res.status(200).json({msg: "Inserido com sucesso"});
		}
	)
	.catch(
		//Função executada no caso de ocorrer algum erro
		function(error){
			res.status(400).json({error: error});
		}
	);
}


UsuarioCtrl.put = function(req, res){

	var usuario = req.body;

	Usuario.forge({id: req.params.id}).save(usuario)
	.then(
		//Função executada quando o usuário é atualizado
		function(usuario){
			res.status(200).json({msg: "Atualizado com sucesso"});
		}
	)
	.catch(
		//Função executada no caso de ocorrer algum erro
		function(error){
			res.status(400).json({error: error});
		}
	);
}


UsuarioCtrl.delete = function(req, res){

	Usuario.where('id', req.params.id).destroy()
    .then(
    	//Função executada quando o usuário é deletado
    	function(usuarioExcluido){
    		res.status(200).json({msg: "Excluido com sucesso"});
    	}
    )
	.catch(
		//Função executada no caso de ocorrer algum erro
		function(error){
			res.status(400).json({error: error});
		}
	);
}

module.exports = UsuarioCtrl;