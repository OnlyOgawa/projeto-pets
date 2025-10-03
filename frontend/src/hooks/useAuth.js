import api from '../utils/api'

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useFlashMessage from './useFlashMessage'

export default function useAuth() {
    const [ authenticated, setAuthenticated ] = useState(false)
    const { setFlashMessage } = useFlashMessage()
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')

        if(token){
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
            setAuthenticated(true)
        }
    }, [])

    async function register(user) {
        let msgText = 'Cadastro realizado com sucesso!'
        let msgType = 'success'

        try {
            const response = await api.post('/users/register', user)
            const data = response.data
            setFlashMessage(msgText, msgType)
            await authUser(data)
            return data
        } catch (error) {
            msgText = error.response?.data?.message || 'Ocorreu um erro'
            msgType = 'error'
            setFlashMessage(msgText, msgType)
            return null
            }
        }

        async function login(user){
            let msgText = 'Login realizado com sucesso'
            let msgType = 'success'

            try {
                const data = await api.post('/users/login', user).then((response) =>{
                    return response.data
                })
                await authUser(data)
            } catch (error) {
                msgText = error.response.data.message
                msgType = 'error'
            }

            setFlashMessage(msgText, msgType)
        }

        async function authUser(data) {
            setAuthenticated(true)

            localStorage.setItem('token', JSON.stringify(data.token))

            navigate('/')
        }

        function logout() {
            const msgText = 'Logout realizado com sucesso!'
            const msgType = 'Success'

            setAuthenticated(false)
            localStorage.removeItem('token')
            api.defaults.headers.Authorization = undefined
            navigate('/')

            setFlashMessage(msgText, msgType)
        }

    return { authenticated, register, logout, login }

}