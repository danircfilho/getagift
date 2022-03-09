import api from '../../../utils/api'

import { useState, useEffect} from 'react'

import RoundedImage from '../../layout/RoundedImage'

import styles from './Dashboard.module.css'

function MyAcquire() {
  const [ thgs, setThgs ] = useState({})
  const [token] = useState(localStorage.getItem('token') || '')

  /* Objetivo - trazer os itens */
  useEffect(() => {

    api.get(`/thgs//myget`, {
      Authorization: `Bearer ${JSON.parse(token)}`
    })
    .then((response) => {
      setThgs(response.data.thgs)
    })

  }, [token])

  return (
    <section>
      <div className={styles.thglist_header}>
        <h1>My Acquire</h1>
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
              <div className={styles.contacts}>
                <p>
                  <span className="bold">Call to:</span> {thg.user.phone}
                </p>
                <p>
                  <span className="bold">Speak with:</span> {thg.user.name}
                </p>
              </div>
              <div className={styles.actions}>
                {thg.available
                  ? (thg.acquire && (<p>Acquisition in process</p>)) 
                  : (<p>Congratulations on purchasing an item!</p>)
                }
              </div>
            </div>
        ))}
        {thgs.length === 0 && <p>There are no requested items yet</p>}
      </div>      
    </section>
  )  
}

export default MyAcquire