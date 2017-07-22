//Parametros da conexão
var params = {
  client: 'mysql',
  connection: {
    host     : '127.0.0.1',
    user     : 'root',
    password : '1234',
    database : 'exemplo',
    charset  : 'utf8'
  }
}

var knex = require('knex')(params);

var bookshelf = require('bookshelf');
var connection = bookshelf(knex);


module.exports = connection;