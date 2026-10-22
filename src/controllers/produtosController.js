const Produtos = require('../models/Produtos'); 
const { Op } = require('sequelize');

async function listar(req, res) {
  try {
    const { pagina = 1, limite = 10, nome, data } = req.query;
 
    const filtro = {};
// guarda as condições da busca em filtro 
    if (nome) {
      filtro.nome = { [Op.like]: `%${nome}%` };
    }
    if (data) {
      filtro.createdAt = { [Op.gte]: new Date(data) };
    }
 
    const Produtoss = await Produtos.findAll({
      where: filtro,
      limit: Number(limite),
      offset: (Number(pagina) - 1) * Number(limite),
    });
 
    res.json(Produtoss);
  } catch (erro) {
    res.status(400).json({
      mensagem: 'Erro ao listar Produtoss',
      erro: erro.message,
    });
  }
}

async function deletar(req, res) {
  try {
    const { id } = req.params;
 
    const Produtos = await Livro.findByPk(id);
    if (!produtos) {
      return res.status(404).json({
        mensagem: 'Produto não encontrado',
      });
    }
 
    await produtos.destroy();
 
    res.status(200).json({
      mensagem: 'Produto removido com sucesso',
    });
  } catch (erro) {
    res.status(400).json({
      mensagem: 'Erro ao remover produto',
      erro: erro.message,
    });
  }
}
 
module.exports = { cadastrar, listar, deletar };
