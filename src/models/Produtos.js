const { DataTypes } = require('sequelize'); 
const sequelize = require('../config/database'); 
  
const Produtos = sequelize.define('Produtos', { 
  nome: { 
    type: DataTypes.STRING, 
    allowNull: false, 
  }, 
  tipo: { 
    type: DataTypes.STRING, 
    allowNull: false, 
  }, 
  quantidade_estoque: { 
    type: DataTypes.INTEGER, 
    allowNull: false, 
    defaultValue: 0, 
  }, 
}); 
  
module.exports = Produtos; 