CREATE TABLE usuario(
	id INTEGER PRIMARY KEY AUTO_INCREMENT,
	email VARCHAR(100),
	nome VARCHAR(100),
	foto VARCHAR(200),
	senha VARCHAR(30)
);

CREATE TABLE postagens(
	id INTEGER PRIMARY KEY AUTO_INCREMENT,
	texto VARCHAR(200),
	data_postagem DATETIME,
	usuario_id INTEGER NOT NULL
);

ALTER TABLE postagens ADD CONSTRAINT FOREIGN KEY (usuario_id) REFERENCES usuario(id);

CREATE TABLE amizade(
	id_seguidor INTEGER NOT NULL,
	id_seguindo INTEGER NOT NULL
);

ALTER TABLE amizade ADD CONSTRAINT FOREIGN KEY (id_seguidor) REFERENCES usuario(id);
ALTER TABLE amizade ADD CONSTRAINT FOREIGN KEY (id_seguindo) REFERENCES usuario(id);

CREATE TABLE notificacoes(
	id INTEGER PRIMARY KEY AUTO_INCREMENT,
	lida BOOLEAN DEFAULT FALSE,
	mensagem VARCHAR(200)
);

SELECT * FROM usuario;
SELECT * FROM amizade;
INSERT INTO amizade(id_seguidor, id_seguindo) VALUES (3,1);

SELECT usuario.nome seguindo FROM usuario JOIN amizade ON usuario.id = amizade.id_seguidor;