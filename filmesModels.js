import { INTEGER, Sequelize } from "sequelize";
import db from "../db.js";
import sequelize from "../db.js";

// Tabela Filme
export default db.define("filmes", {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  distribuidora: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  diretor: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  elenco: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  genero: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  ano_lancamento: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

db.define("usuarios", {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

db.define("avaliacaos", {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  id_usuario: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
      model: 'usuarios', // Nome da tabela referenciada
      key: 'id', // Chave primária da tabela referenciada
    },
  },
  id_filme: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
      model: 'filmes', // Nome da tabela referenciada
      key: 'id', // Chave primária da tabela referenciada
    },
  },
  nota: {
    type: Sequelize.FLOAT(2, 1),
    allowNull: false,
    validate: {
      min: 0,
      max: 5,
    },
  },
  ds_comentario: {
    type: Sequelize.STRING(200),
    allowNull: true, // Comentário pode ser opcional
  }
});