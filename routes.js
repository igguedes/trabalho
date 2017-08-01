var express = require('express');
//Importando o controller de usuários
var UsuarioCtrl = require('./controllers/Usuario.controller');
var AutenticacaoCtrl = require('./controllers/Autenticacao.controller');
var bodyParser = require('body-parser');
var routes = express();

routes.use(bodyParser.json());
routes.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
//Definindo as rotas

routes.get('/usuarios', AutenticacaoCtrl.verificarCredenciais, UsuarioCtrl.getAll);
routes.get('/usuario/:id', UsuarioCtrl.get);
routes.post('/usuario', UsuarioCtrl.criaUsuario);
routes.post('/seguir/seguidor/:idSeguidor/seguindo/:idSeguindo',UsuarioCtrl.addUsuario);
routes.get('/lista_seguidor/:idSeguindo', UsuarioCtrl.listaSeguidor);
routes.post('/login',UsuarioCtrl.login);
routes.put('/usuario/:id', UsuarioCtrl.put);
routes.delete('/usuario/:id', UsuarioCtrl.delete);
routes.put('/foto', UsuarioCtrl.atualizarFoto);
routes.get('/notificacoes/usuario/:id_usuario', UsuarioCtrl.notificacoes);

module.exports = routes;