const mongoose = require('mongoose');

const conexao = {
    isConnect: 0
};

const uri = process.env.MONGO_URI;

const connect = async () => {
    if(conexao.isConnect){
        return
    }
    const db = await mongoose.connect(uri);
    conexao.isConnect = db.connection[0].readyState;
}
module.exports = connect;