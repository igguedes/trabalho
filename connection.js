//Parametros da conexão
var params = {
  client: 'mysql',
  connection: {
    host     : 'topplusdev.cml1pthi0vvx.us-east-2.rds.amazonaws.com',
    user     : 'topplus',
    password : 'topplus2017',
    database : 'web2',
    charset  : 'utf8'
  }
}

var knex = require('knex')(params);

var bookshelf = require('bookshelf');
var connection = bookshelf(knex);


module.exports = connection;