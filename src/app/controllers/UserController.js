const { User } = require('../models');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')


class UserController {


    //Busca todos os usuario
    async index(req, res) {
        const users = await User.findAll()
        return res.status(200).json(users)
    }

    //Cria um usuario
    async store(req, res) {
        const { email } = req.body
        try {
            if (await User.findOne({ where: { email } }))
                return res.status(400).json({ error: 'User altready exists' })

            req.body.password = await bcrypt.hash(req.body.password, 8)
            const user = await User.create(req.body)
            return res.status(200).json(user)

        } catch (e) {
            //  console.log(e)
            res.status(500).json({ error: 'Algo inesperado ocorreu' })
        }
    }

    async autenticate(req, res) {
        const { email, password } = req.body

        try {
            const user = await User.findOne({ where: { email } })

            if (!user)
                return res.status(400).json({ error: 'User not found' })

            if (! await bcrypt.compare(password, user.password))
                return res.json({ error: 'Inválid password' })

            const public_key = user.id + user.email

            const token = await UserController.prototype.genarateToken({ public_key })

            res.status(200).json({ user, token })
        } catch (error) {
            console.log(error)
        }

    }

    /**
     * Gera token JWT
     */
    async genarateToken(params = {}) {

        const Token = jwt.sign(params, process.env.APP_SECRET, {
            expiresIn: 86400
        })

        return Token
    }


}


// genarateToken = (params = {}) => {

//     const Token =   jwt.sign( params , process.env.APP_SECRET, {
//         expiresIn: 86400
//     }  )

//     return Token
// }

module.exports = new UserController()