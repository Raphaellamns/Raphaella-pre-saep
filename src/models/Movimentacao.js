const { DataTypes } = require('sequelize'); 
const sequelize = require('../config/database'); 
const Produtos = require('./Produtos'); 
 const Usuario = require('./Usuario');

const Movimentacao = sequelize.define('Movimentacao', { 
  tipo: { 
    type: DataTypes.ENUM('entrada', 'saida'), 
    allowNull: false, 
  }, 
  quantidade: { 
    type: DataTypes.INTEGER, 
    allowNull: false, 
  }, 
  data: { 
    type: DataTypes.DATE, 
    defaultValue: DataTypes.NOW, 
  }, 
}); 
  
Produtos.hasMany(Movimentacao, { foreignKey: 'produtos_id' }); 
Movimentacao.belongsTo(Livro, { foreignKey: 'produtos_id' });
Usuario.hasMany(Movimentacao, { foreignKey: 'usuario_id' });
Movimentacao.belongsTo(Usuario, { foreignKey: 'usuario_id' });
  
module.exports = Movimentacao; 