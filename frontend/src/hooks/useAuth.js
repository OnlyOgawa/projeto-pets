import api from '../utils/api'

import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import useFlashMessage from './useFlashMessage'

export default function useAuth() {
    const { setFlashMessage } = useFlashMessage()

    async function register(user) {
        let msgText = 'Cadastro realizado com sucesso!'
        let msgType = 'success'

        try {
            const response = await api.post('/users/register', user)
            const data = response.data
            setFlashMessage(msgText, msgType)
            return data
        } catch (error) {
            msgText = error.response.data.message || 'Ocorreu um erro'
            msgType = 'error'
            setFlashMessage(msgText, msgType)
            return null
            }
        }

    return { register }

}