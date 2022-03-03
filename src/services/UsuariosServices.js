const connect = require('../db/conexao');
const UsuarioSchemas = require('../db/Schemas/UsuarioSchemas');
class UsuariosServices{
    constructor(){
        this.conexao = connect;
        this.usuarios = UsuarioSchemas;
    }
    async createService(req, res){
        const { nome, email, senha }= req.body;
        try {
            await this.conexao();
            const usuarios = await this.usuarios.create({
                nome,
                email,
                senha
            });
            
            return res.status(201).json({usuarios}) 
        } catch (error) {
            console.log(error);
            return res.status(400).json(error)
        }
    }
}
module.exports = UsuariosServices