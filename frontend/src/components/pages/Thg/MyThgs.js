import api from '../../../utils/api'

import styles from './Dashboard.module.css'

import { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'

import RoundedImage from '../../layout/RoundedImage'

/* hooks */
import useFlashMessage from '../../../hooks/useFlashMessage'

function MyThgs() {
  const [thgs, setThgs] = useState([])
  const [token] = useState(localStorage.getItem('token') || '') 
  const {setFlashMessage} = useFlashMessage()

  /* pegar as imagens das coisas - com autenticação */
  useEffect(() => {
    api.get('/thgs/mythgs', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    })
    /* then (usar por pegar (get) dados then/catch - diferente de try) */
    .then((response) => {
      setThgs(response.data.thgs)
    })
  }, [token]) //algo definido necessita passar como dependencia (neste caso o token)

  /* Deletar */
  async function removeThg(id) {
    
    let msgType = 'success'

    const data = await api.delete(`/thgs/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    })
    .then((response) => {
      /* remover do frontend e backend */
      const updatedThgs = thgs.filter((thg) => thg._id !== id)
      setThgs(updatedThgs)
      return response.data
    })
    .catch((err) => {
      msgType= 'error'
      return err.response.data
    })

    setFlashMessage(data.message, msgType)
  }

  return (
    <section>
      <div className={styles.thglist_header}>
        <h1>My Things</h1>
        <Link to="/thg/add">Register things</Link>
      </div>      
      <div className={styles.thglist_container}>
        {thgs.length > 0 && 
          thgs.map((thg) => (
            <div className={styles.thglist_row} key={thg._id}>
              <RoundedImage
                src={`${process.env.REACT_APP_API}/images/thgs/${thg.images[0]}`} 
                alt={thg.name} 
                width="px75" //criado na classe dinâmica no RoundedImage - width (layout)
              />
              <span className="bold">{thg.name}</span>
              <div className={styles.actions}>
                {/* Verificar se a doação está disponível */}
                {thg.available 
                  ? (<> {thg.acquire && (
                        <button className={styles.conclude_btn}>
                          Complete the request
                        </button>
                      )}
                      <Link to={`/thg/edit/${thg._id}`}>Edit</Link>
                      <button 
                        onClick={() => { removeThg(thg._id) }}>
                        Delete
                      </button>
                    </>
                  ) : (
                    <p>The donation has already been completed!</p>
                )}
              </div>
            </div>
          ))
        }
        {thgs.length === 0 && <p>There are no donations</p>}
      </div>
    </section>
  )
}

export default MyThgs