const {Schema, model, models } = require('mongoose');

const UsuarioSchemas = new Schema({
    nome:{
        type: String,
        require: true,
    },
    email:{
        type: String,
        require: true,
        unique: true
    },
    senha:{
        type: String,
        require: true
    }
},{
    timestamps: true
});

module.exports = models.Usuarios || model('Usuarios', UsuarioSchemas);