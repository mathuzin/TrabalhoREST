import avaliacaoRepository from "../models/avaliacaoModels.js";

function findAvaliacoes(req, res) {
  avaliacaoRepository.findAll().then((result) => res.json(result));
}

function findAvaliacao(req, res) {
  avaliacaoRepository.findByPk(req.params.id).then((result) => res.json(result));
}

function addAvaliacao(req, res) {
  avaliacaoRepository.create({
    id_usuario: req.body.id_usuario,
    id_filme: req.body.id_filme,
    nota: req.body.nota,
    ds_comentario: req.body.ds_comentario,

  }).then((result) => res.json(result));
}

async function updateAvaliacao(req, res) {
  await avaliacaoRepository.update(
    {
     nota: req.body.nota,
     ds_comentario: req.body.ds_comentario,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  );

  avaliacaoRepository.findByPk(req.params.id).then((result) => res.json(result));
}

async function deleteAvaliacaos(req, res) {
  try {
    //Apaga todas as avaliações
    await avaliacaoRepository.destroy({ where: {} });

    // const avaliacaoAtualizados = await avaliacaoRepository.findAll();
    // res.json(avaliacaoAtualizados);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar os usuarios'});
  }
}

async function deleteAvaliacao(req, res) {
  try {
    //Apaga todas as avaliações
    await avaliacaoRepository.destroy({ 
            where: 
            {
                id: req.params.id,
            },
        });

    const avaliacaoAtualizados = await avaliacaoRepository.findAll();
    res.json(avaliacaoAtualizados);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar os usuarios'});
  }
}

async function findAvaliacoesByUsuario(req, res) {
  const { idUser } = req.params; // Atualiza para capturar idUser 
  // req.params contém todos os parâmetros da URL definidos após os :

  console.log("idUser:", idUser); // Verifica se o parâmetro foi capturado

  try {
    const avaliacoes = await avaliacaoRepository.findAll({
      where: {
        id_usuario: idUser, // Use o nome correto da FK no banco
      },
    });

    if (avaliacoes.length === 0) { // === verifica se são iguais e se são do mesmo tipo 
      return res.status(404).json({ message: "Nenhuma avaliação encontrada para o usuário fornecido." });
    }

    res.json(avaliacoes);
  } catch (error) {
    console.error("Erro ao buscar as avaliações do usuário:", error); // Imprime o erro
    res.status(500).json({ error: 'Erro ao buscar as avaliações do usuário.' });
  }
}

async function findAvaliacoesByFilme(req, res) {
  const { idFilme } = req.params; // Atualiza para capturar idFilme
  // req.params contém todos os parâmetros da URL definidos após os :

  console.log("idFilme:", idFilme); // Verifica se o parâmetro foi capturado

  try {
    const avaliacoes = await avaliacaoRepository.findAll({
      where: {
        id_filme: idFilme, // Use o nome correto da FK no banco
      },
    });

    if (avaliacoes.length === 0) { // === verifica se são iguais e se são do mesmo tipo
      return res.status(404).json({ message: "Nenhuma avaliação encontrada para o filme fornecido." });
    }

    res.json(avaliacoes);
  } catch (error) {
    console.error("Erro ao buscar as avaliações do filme:", error); // Imprime o erro
    res.status(500).json({ error: 'Erro ao buscar as avaliações do filme.' });
  }
}

export default {findAvaliacao, findAvaliacao, addAvaliacao, findAvaliacoes, updateAvaliacao, deleteAvaliacao, deleteAvaliacaos, findAvaliacoesByUsuario, findAvaliacoesByFilme};
