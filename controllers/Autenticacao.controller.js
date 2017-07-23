var moment = require("moment");
var jwt = require('jwt-simple');
const SECRET = "trabalhoWe2";

var AuteticacaoCtrl = {};

AuteticacaoCtrl.gerarToken = gerarToken;
AuteticacaoCtrl.encodeToken = encodeToken;
AuteticacaoCtrl.decodeToken = decodeToken;

module.exports = AuteticacaoCtrl;

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