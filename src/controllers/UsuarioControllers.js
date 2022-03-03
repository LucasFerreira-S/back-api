const UsuariosServices = require('../services/UsuariosServices')

class UsuariosControllers{
    constructor(){
        this.services = new UsuariosServices();
    }
    async createController(req, res){
        const { nome, email, senha} = req.body
        if(!nome || !email || !senha){
            return res.status(400).json({error: "Falta dados"})
        }
        return this.services.createService(req,res)
    }
}
module.exports = UsuariosControllers