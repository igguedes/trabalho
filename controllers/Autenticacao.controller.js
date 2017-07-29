var moment = require("moment");
var jwt = require('jwt-simple');
const SECRET = "trabalhoWe2";
var Usuario = require('../models/Usuario.model');
var AutenticacaoCtrl = {};

AutenticacaoCtrl.gerarToken = gerarToken;
AutenticacaoCtrl.encodeToken = encodeToken;
AutenticacaoCtrl.decodeToken = decodeToken;

module.exports = AutenticacaoCtrl;

function decodeToken(token){
	var decodeToken = jwt.decode(token, SECRET);
	return decodeToken;
}

function encodeToken(validadeData){
	return jwt.encode(validadeData, SECRET);
}

function gerarToken(user){
	user.validade = moment().add(2, 'days').valueOf();
	return encodeToken(user);
}

AutenticacaoCtrl.verificarCredenciais = function(req, res, next){
	var token = req.headers['authorization'];

	if(!token || token == 'null'){
		return res.status(401).json({msg: 'Sem credenciais de acesso'});
	}
	else{
		tokenDecoded = jwt.decode(token, SECRET);
		if(tokenDecoded.dataExpiracao < Date.now()){
			return res.status(401).json({msg: 'Token expirado'});
		}

		Usuario.forge()
			.query(function(q){
				q.where('id', '=', tokenDecoded.id);
				q.where('email', '=', tokenDecoded.email);
			})
			.fetch()
			.then(function(row){
				var user;
				row != null && (user = row.toJSON());
				if(row == null){
					res.status(401).json({msg: 'Token invalido'});
				}else{
					console.log('autenticado');
					next();
				}
			});
	}
}