const express = require('express');
const UsuariosControllers = require('./controllers/UsuarioControllers');
const AuthController = require('./controllers/auth.controller');
const Middlewares = require('./middlewares/validateTokens');

const UsuarioController = new UsuariosControllers();
const AuthControllers = new AuthController();

const routes = express.Router();
routes.get('/',(req, res)=>{
    return res.status(200).json("Salve");
})
routes.route('/usuarios')
  .post((req, res) => {
    return UsuarioController.createController(req, res)
  })
  
routes.use(new Middlewares().validateToken);

routes.route('/login')
.post(async(req,res)=> AuthControllers.loginController(req,res))
routes.route('/usuarios/listageral')
  .get((req,res)=>{
    return UsuarioController.getAllController(req, res)
  })
routes.route('/usuarioslista')
.get((req,res)=>{
  return UsuarioController.getOneController(req, res)
})
routes.route('/delete')
.delete(async(req,res)=> UsuarioController.deleteController(req,res))
module.exports = routes;