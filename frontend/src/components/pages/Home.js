import {Link} from 'react-router-dom'

import { useState, useEffect } from 'react'
import api from '../../utils/api'

import styles from './Home.module.css'

function Home() {
  const [pets, setPets] = useState([])

  useEffect(() => {
    api.get('/pets')
      .then((response) => {
        // Verifica se realmente vieram pets
        console.log('Pets recebidos:', response.data)
        setPets(response.data.pets || [])
      })
      .catch((err) => {
        console.error('Erro ao buscar pets:', err)
      })
  }, [])

  return (
    <section>
      <div className={styles.pet_home_header}>
        <h1>Adote um Pet</h1>
        <p>Veja os detalhes de cada um e conheça o tutor</p>
      </div>
      <div className={styles.pet_container}>
        {pets.length > 0 ? (
          pets.map((pet) => (
            <div key={pet._id} className={styles.pet_card}>
                <div
                    className={styles.pet_card_image}
                    style={{
                        backgroundImage: `url(${process.env.REACT_APP_API}/images/pets/${pet.images[0]})`
                    }}
                ></div>
              <p>Imagem do Pet</p>
              <h3>{pet.name}</h3>
              <p>
                <span className="bold">Peso:</span> {pet.weight}kg
              </p>
              {pet.available ? <Link to={`pet/${pet._id}`}>Mais detalhes</Link> : <p className={styles.adopted_text}>Adotado</p>}
            </div>
          ))
        ) : (
          <p>Não há pets cadastrados ou disponíveis para adoção!</p>
        )}
      </div>
    </section>
  )
}

export default Home
