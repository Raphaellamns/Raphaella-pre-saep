const Movimentacao = require('../models/Movimentacao'); 
const Produtos = require('../models/Produtos'); 
  
async function cadastrar(req, res) { 
  try { 
    const { produtos_id, tipo, quantidade } = req.body; 
  
    const Produtos = await Produtos.findByPk(Produtos_id); 
    if (!Produtos) { 
      return res.status(404).json({ 
        mensagem: 'Produtos não encontrado', 
      }); 
    } 
  
    if (tipo === 'saida' && Produtos.quantidade_estoque < quantidade) { 
      return res.status(400).json({ 
        mensagem: 'Quantidade insuficiente em estoque', 
      }); 
    } 
  
    const novaQuantidade = tipo === 'entrada' 
      ? Produtos.quantidade_estoque + quantidade 
      : Produtos.quantidade_estoque - quantidade; 
  
    await Produtos.update({ quantidade_estoque: novaQuantidade }); 
  
    const movimentacao = await Movimentacao.create({ 
      produtos_id, 
      tipo, 
      quantidade, 
      usuario_id: req.usuario.id,
    }); 
  
    res.status(201).json(movimentacao); 
  } catch (erro) { 
    res.status(400).json({ 
      mensagem: 'Erro ao cadastrar movimentação', 
      erro: erro.message, 
    });
      } 
} 
  
module.exports = { cadastrar };