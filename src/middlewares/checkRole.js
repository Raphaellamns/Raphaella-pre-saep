function permitir(...tiposPermitidos) {
     return (req, res, next) => {
    if (!tiposPermitidos.includes(req.usuario.tipo)) {
      return res.status(403).json({ mensagem: 'Sem permissão para essa ação' });
    }
    next();
  };
} 

module.exports = permitir;

//verifica se o tipo do usuário logado está dentro da lista de tipos permitidos. 
//se o tipo do usuário NÃO estiver na lista permitida, bloqueia o acesso com status 403 
// (proibido/sem permissão) 