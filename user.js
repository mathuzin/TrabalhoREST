import bcrypt from "bcrypt";
import userRepository from "../models/usuarioModels.js";
import { Op } from "sequelize"; // importar o Op corretamente

function findUsers(req, res) {
  userRepository.findAll().then((result) => res.json(result));
}

function findUser(req, res) {
  userRepository.findByPk(req.params.id).then((result) => res.json(result));
}

async function registerUser(req, res) {
  
    const nome = req.body.nome;
    const email = req.body.email;
    const senha = req.body.senha;

    const existeUsuario = await userRepository.findOne({ where: {email} });
    if (existeUsuario) {
      return res.json({ error: "Email já está em uso"});
    }

    const senhaCrypt = await bcrypt.hash(senha, 5);

    const novoUsuario = await userRepository.create({
      nome,
      email,
      senha: senhaCrypt,
    });

    res.json(novoUsuario);
    
}

function addUser(req, res) {
  userRepository.create({
    nome: req.body.nome,
    email: req.body.email,
    senha: req.body.senha,
  }).then((result) => res.json(result));
}

async function updateUser(req, res) {
  await userRepository.update(
    {
      nome: req.body.nome,
      email: req.body.email,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  );

  userRepository.findByPk(req.params.id).then((result) => res.json(result));
}

async function deleteUsers(req, res) {
  try {
    await userRepository.destroy({ where: {} });

    const usuariosAtualizados = await userRepository.findAll();
    res.json(usuariosAtualizados);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar os usuarios'});
  }
}

async function findByNome(req, res) {
  try {
    const { nome } = req.params; // Obtém o nome de req.params

    if (!nome) {
      return res.status(400).json({ error: "O nome é obrigatório." });
    }

    const usuarios = await userRepository.findAll({
      where: {
        nome: {
          [Op.like]: `%${nome}%`, // Busca com LIKE
          // Encontra registros que contêm, começam ou terminam com um certo padrão
        },
      },
    });

    if (usuarios.length === 0) { // === verifica se são iguais e se são do mesmo tipo
      return res.status(404).json({ message: "Nenhum usuário encontrado com o nome fornecido." });
    }

    res.json(usuarios);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error); // Exibe detalhes do erro no console
    res.status(500).json({ error: "Erro ao buscar usuários pelo nome.", details: error.message });
  }
}

async function findByEmail(req, res) {
  try {
    const { email } = req.params;  // Pegando o email dos parâmetros da rota

    if (!email) {
      return res.status(400).json({ error: "O email é obrigatório." });
    }

    const usuario = await userRepository.findOne({
      where: { email }, // Busca apenas um email
    });

    if (!usuario) {
      return res.status(404).json({ message: "Nenhum usuário encontrado com o email fornecido." });
    }

    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuário pelo email." });
  }
}

export default {findUsers, findUser, addUser, findUser, updateUser, deleteUsers, findByNome, findByEmail};
