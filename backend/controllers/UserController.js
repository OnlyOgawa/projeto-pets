const User = require('../models/User')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const createUserToken = require('../helpers/create-user-token')
const getToken = require('../helpers/get-token')

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

        //create password
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        //create user
        const user = new User ({
            name,
            email,
            phone,
            password: passwordHash,
        })

        try {
            const newUser = await user.save()
            
            await createUserToken(newUser, req, res)
        } catch (error) {
        res.status(500).json({message: error})
        }
    }

    static async login(req, res) {
        
        const { email, password } = req.body

        if(!email) {
            res.status(422).json({message: 'O e-mail eh obrigatorio' })
            return
        }
        if(!password) {
            res.status(422).json({message: 'A senha eh obrigatoria' })
            return
        }

        const user = await User.findOne({email: email})

        if(!user) {
            res.status(422).json({message: 'Nao ha usuario cadastrado com este e-mail!' })
            return
        }

        //check if password match with db password
        const checkPassword = await bcrypt.compare(password, user.password)
        
        if(!checkPassword) {
            res.status(422).json({message: 'Senha Invalida'})
            return
        }

        await createUserToken(user, req, res)
    }

    static async checkUser(req, res) {

        let currentUser

        if(req.headers.authorization) {

            const token = getToken(req)
            const decoded = jwt.verify(token, 'nossosecret')

            currentUser = await User.findById(decoded.id)

            currentUser.password = undefined
        } else {
            currentUser = null
        }

        res.status(200).send(currentUser)
    }

    static async getUserById(req, res) {
        const id = req.params.id

        const user = await User.findById(id).select('-password')

        if(!user) {
            res.status(422).json({message: 'Usuario nao encontrado!'})
            return
        }

        res.status(200).json({ user })
    }
}