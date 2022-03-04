const {compare} = require('bcrypt');
const { sing } = require('jsonwebtoken');
const UsuarioSchemas = require('../db/Schemas/UsuarioSchemas');
const connect = require('../db/conexao');

class AuthService{
    #_conexao;
    #_usuario;

    constructor(){
        this.#_conexao = connect;
        this.#_usuario = UsuarioSchemas;
    }
    async #_validatePassword(senhaLogin, senhaDb){
        const validate = await compare(senhaLogin,senhaDb)
        return validate;
    }
    #_generateToken(usuario){
        return sign({usuario}, process.env.KEY_MASTER_JWT,{
            expiresIn: '8hr'
        })
    }
    async login(req,res){
        const {email, senha} = req.body;
        try {
            await this.#_conexao();
            const usuario = await this.#_usuario.findOne({email});
            if(!usuario){
                return res.status(404).json({error: "deu erro ai man"})
            }
            const validatePass = await this.#_validatePassword(senha, usuario.senha)
            if(!validatePass){
                return res.status(401).json({error:"Senha ou email inválido"})
            }
            const {senha,email, ...resto}=  usuario._doc;
            const token = this.#_generateToken({usuario: resto})
            return res.status(200).json({token});
        } catch (error) {
            return res.status(400).json({error});
        }
    }
};
module.exports = AuthService