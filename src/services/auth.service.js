const {compare} = require('bcrypt');
const {sign} = require('jsonwebtoken');
const UsuarioSchema = require('../db/Schemas/UsuarioSchemas');
const connect = require('../db/conexao');

class AuthService{
    #_conexao;
    #_usuarios;

    constructor(){
        this.#_conexao = connect;
        this.#_usuarios = UsuarioSchema;
    }

    async #_validatePassword(senhaLogin,senhaDb){
        const validate = await compare(senhaLogin, senhaDb)
        return validate;
    }
    #_generateToken(usuario){
        return sign(usuario, process.env.KEY_MASTER_JWT, {
            expiresIn: '8h',
        })
    }
    async login(req,res){
        const{email,senha}=req.body;
        try {
            await this.#_conexao();
            const usuario = await this.#_usuarios.findOne({email});
            if(!usuario){
                return res.status(404).json({error:'usuario não encontrado'})
            }
            const  validatePass = await this.#_validatePassword(senha, usuario.senha)
            if(!validatePass){
                return res.status(404).json({error:'senha ou email inválido'})
            }
            const {senha:senhaUsuario, email: emailUsuario, ...resto} = usuario._doc;
            const token = this.#_generateToken({usuario:resto})
            return res.status(200).json({token})
        } catch (error) {
            console.log(error)
            return res.status(400).json({error})
        }
    }
};
module.exports = AuthService;