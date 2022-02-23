import api from '../../utils/api'

import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

import styles from './Home.module.css'

function Home() {

  const [ thgs, setThgs ] = useState([])

  useEffect(() => {
    api.get('/thgs').then((response) => {
      setThgs(response.data.thgs)
    })
  }, [])

  return (
    <section>
      <h1>Order an item</h1>
      <p>See the detail of each item and who the donor is</p>
      <div className={styles.thg_container}>
        {thgs.length > 0 && thgs.map((thg) => (
          <div className={styles.thg_card}>
            <div 
              style={{backgroundImage: `url(${process.env.REACT_APP_API}/images/thgs/${thg.images[0]})`}}
              className={styles.thg_card_image}
            >
          </div>
            <h3>{thg.name}</h3>
            <p>
              <span className='bold'>Weigth:</span> {thg.weight}Kg
            </p>
            {thg.available ? (
              <Link to={`thg/${thg._id}`}>Mais Detalhes</Link>
            ) : <p>Doado</p>}
          </div>
        ))}
        {thgs.length === 0 && (
          <p>There are no items registered or available for donation!</p>
        )}
      </div>
    </section>
  )
}

export default Home