const connect = require('../db/conexao');
const {hash} = require('bcrypt');
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
            const senhaHash = await hash(senha,12);
            const usuarios = await this.usuarios.create({
                nome,
                email,
                senha: senhaHash
            });
            const {senha:senhaUsuariosCriado, ...resto}= usuarios._doc;
            return res.status(201).json({usuarios: resto}) 

        } catch (error) {
            console.log(error);
            return res.status(400).json(error)
        }
    }
   async getUsuarioServices(req,res){
        try {
            await this.conexao();
            const usuarios = await this.usuarios.find();
            const usuariosSemSenha = usuarios.map((value)=>{
                const {senha, ...usuariosSemSenha} = value._doc;
                return usuariosSemSenha;
            });
            return res.status(200).json({usuarios:usuariosSemSenha});
        } catch (error) {
            return res.status(400).json(error);
        }
    }
    async getOneUsuarioServices(req,res){
        const {email} = req.body;
        try {
            await this.conexao();
            const usuarios = await this.usuarios.find({
                email
            });
            const usuariosSemSenha = usuarios.map((value)=>{
                const {senha, ...usuariosSemSenha} = value._doc;
                return usuariosSemSenha;
            });
            return res.status(200).json({usuarios:usuariosSemSenha});
        } catch (error) {
            return res.status(400).json(error);
        }
    }
    async deleteUsuarioServices(req,res){
        const {email} = req.body;
        try {
            await this.conexao();
            const usuario = await this.usuarios.findOne({email})
            if(!usuario){
                return res.status(404).json({error: "not found"});
            }
            const usuarios = await this.usuarios.deleteOne({
                email
            });
            return res.status(200).json("usuario deletado com sucesso")
        } catch (error) {
            return res.status(400).json(error);
        }
    }
}
module.exports = UsuariosServices