var connection = require('../connection');

/*
	Para criar a tabea usuarios:
	--------------------------------
	CREATE TABLE usuarios(
		id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
		nome VARCHAR(50),
		email VARCHAR(100),
		senha VARCHAR(50)
	);

*/

//Passando a referencia da tabela usuários para a variave Usuario
var Usuario = connection.Model.extend({
  tableName: 'usuario'
});

module.exports = Usuario;