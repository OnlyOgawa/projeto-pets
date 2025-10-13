import api from '../../../utils/api'

import styles from './AddPet.module.css'

import {useState} from 'react'
import{useHistory} from 'react-router-dom'

/* components */
import PetForm from '../../form/PetForm'

/* hooks */
import useFlashMessage from '../../../hooks/useFlashMessage'

function AddPet() {
    return(
        <section className={styles.addpet_header}>
            <div>
                <h1>Cadastre um pet</h1>
                <p>Depois ele ficara disponivel para adocao</p>
            </div>
            <PetForm btnText='Cadastrar Pet' /> 
        </section>
    )
}
export default AddPet