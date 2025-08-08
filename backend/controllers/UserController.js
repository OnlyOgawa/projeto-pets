const User = require('../models/User')

module.exports = class UserController {

    static async register(req, res){
        const { name, email, phone, password, confirmpassword } = req.body

        //validacoes
        if(!name) {
            res.status(422).json({message: 'O nome eh obrigatorio' })
            return
        }
        if(!email) {
            res.status(422).json({message: 'O email eh obrigatorio' })
            return
        }
        if(!phone) {
            res.status(422).json({message: 'O telefone eh obrigatorio' })
            return
        }
        if(!password) {
            res.status(422).json({message: 'A senha eh obrigatorio' })
            return
        }
        if(!confirmpassword) {
            res.status(422).json({message: 'A confirmacao da senha eh obrigatorio' })
            return
        }

        if(password !== confirmpassword) {
            res.status(422).json({message: 'A senha e a confirmacao de senha precisam ser iguais' })
            return
        }

        //check user exists
        const UserExists = await User.findOne({email: email})

        if(UserExists) {
            res.status(422).json({message: 'Por favor, utilize outro e-mail' })
            return
        }
    }
}