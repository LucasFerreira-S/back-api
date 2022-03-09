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
    async getAllController(req,res){
        return this.services.getUsuarioServices(req,res)
    }
    async getOneController(req,res){
        const {email} = req.body;
        if(!email){
            return res.status(400).json({error:"Informe um email válido"})
        }
        return this.services.getOneUsuarioServices(req,res)
    }
    async deleteController(req,res){
        const {email} = req.body;
        if(!email){
            return res.status(400).json({error:"Informe um email válido"})
        }
        return this.services.deleteUsuarioServices(req,res)
    }
}
module.exports = UsuariosControllers