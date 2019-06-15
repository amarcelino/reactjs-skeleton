const authMiddleware = require("../../middleware/auth");

class MainController {
    constructor(){
       
    }

    async index2(req, res, next){
        req.send('llllllllllllllllllllll')
    }
}

module.exports = new MainController