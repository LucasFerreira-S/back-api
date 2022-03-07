const { verify } = require('jsonwebtoken');

class Middlewares{
    validateToken(req,res, next){
        if(!req.headers.authorization){
            return res.status(401).json({erro:"token inválido"})
        }
        const token = req.headers.authorization.replace('Bearer','').trim();
        const validate = verify(token,process.env.KEY_MASTER_JWT);
        if(!validate){
            res.status(401).json({error:"token inválido"})
        }
        next();
    }
}
module.exports = Middlewares;