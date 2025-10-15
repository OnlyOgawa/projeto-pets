import api from '../../../utils/api'

import styles from './AddPet.module.css'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

/* components */
import PetForm from '../../form/PetForm'

/* hooks */
import useFlashMessage from '../../../hooks/useFlashMessage'

function AddPet() {
    const [token] = useState(localStorage.getItem('token') || '')
    const { setFlashMessage} = useFlashMessage()
    const navigate = useNavigate()

    async function registerPet(pet) {
        let msgType = 'success'

        const formData = new FormData()

        Object.keys(pet).forEach((key) => {
            if (key === 'images') {
                for (let i = 0; i < pet[key].length; i++) {
                    formData.append('images', pet[key][i])
                }
            } else {
                formData.append(key, pet[key])
            }
        })

        try {
            const response = await api.post('pets/create', formData, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`,
                    'Content-Type': 'multipart/form-data'
                }
            })

            const data = response.data

            setFlashMessage(data.message, msgType)

            setTimeout(() => {
                navigate('/pets/mypets')
            }, 2000)
        } catch (err) {
            msgType = 'error'
            setFlashMessage(err.response?.data?.message || 'Erro ao cadastrar o pet.', msgType)
        }
    }

    return(
        <section className={styles.addpet_header}>
            <div>
                <h1>Cadastre um pet</h1>
                <p>Depois ele ficara disponivel para adocao</p>
            </div>
            <PetForm handleSubmit={registerPet} btnText='Cadastrar Pet' /> 
        </section>
    )
}
export default AddPet