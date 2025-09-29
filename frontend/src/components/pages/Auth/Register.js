import { useContext, useState } from 'react'

import Input from '../../form/Input'
import { Link } from 'react-router-dom'

import styles from '../../form/Form.module.css'

/* context */
import {Context} from '../../../context/UserContext'

function Register() {
    const [user, setUser] = useState({})
    const{ register } = useContext(Context)

    //atualiza o estado do usuário
    function handleChange(e) {
        setUser({...user, [e.target.name]: e.target.value })
    }
    //trata o envio do formulário, evitando reload da página e permitindo enviar os dados para o servidor
    function handleSubmit(e) {
        e.preventDefault()
        //enviar o usuario para o banco
        register(user)
    }

    return(
        <section className={styles.form_container}>
            <h1>Registrar</h1>
            <form onSubmit={handleSubmit}>
                <Input
                text='Nome'
                type='text'
                name='name'
                placeholder='Digite o seu nome'
                handleOnChange={handleChange}
                required
                />
                <Input
                text='Telefone'
                type='text'
                name='phone'
                placeholder='Digite o seu telefone'
                handleOnChange={handleChange}
                required
                />
                <Input
                text='E-mail'
                type='email'
                name='email'
                placeholder='Digite o seu e-mail'
                handleOnChange={handleChange}
                required
                />
                <Input
                text='Senha'
                type='password'
                name='password'
                placeholder='Digite a sua senha'
                handleOnChange={handleChange}
                required
                />
                <Input
                text='Confirmacao de senha'
                type='password'
                name='confirmpassword'
                placeholder='Confirme a sua senha'
                handleOnChange={handleChange}
                required
                />
                <input type='submit' value='Cadastrar' />
            </form>
            <p>
                Ja tem conta? <Link to='/login'>Clique aqui</Link>
            </p>
        </section>
    )
}

export default Register