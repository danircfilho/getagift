import api from '../../../utils/api'

import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

import styles from './ThgDetails.module.css'

/* hooks */
import useFlashMessage from '../../../hooks/useFlashMessage'


function ThgDetails() {

  const [ thg, setThg ] = useState({})
  const [token] = useState(localStorage.getItem('token') || '')
  const {id} = useParams() 
  const {setFlashMessage} = useFlashMessage()

  useEffect(() => {
    api.get(`/thgs/${id}`).then((response) => {
      setThg(response.data.thg)
    })
  }, [id])

  async function schedule() {

    let msgType = 'success'

    const data = await api.patch(`thg/schedule/${thg._id}`, {
      
        Authorization: `Bearer ${JSON.parse(token)}`,
        'Content-Type': 'multipart/form-data'
    })
    .then((response) => {
      return response.data
    })
    .catch((err) => {
      msgType = 'error'
      return err.response.data
    })

    setFlashMessage(data.message, msgType)

  }

  return (
    <>
    {thg.name && (
      <section className={styles.thg_details_container}>
        <div className={styles.thg_details_header}>
          <h1>About the item to be donated: {thg.name}</h1>
          <p>If interested, get in touch</p>
        </div>
        <div className={styles.thg_images}>
          {thg.images.map((image, index) => (
            <img
              src={`${process.env.REACT_APP_API}/images/thgs/${image}`} 
              alt={thg.name} 
              key={index}
            />
          ))}
        </div>
        <p>
          <span className='bold'>Weigth:</span> {thg.weight}Kg
        </p>
        <p>
          <span className='bold'>Usage Time (year, month):</span> {thg.age}
        </p>
        {token 
          ? (<button onClick={schedule}>Make contact</button>)
          : (<p>You need <Link to='/register'>to create an account</Link> to order an item</p>)        
        }
      </section>
    )}
    </>
  )
}

export default ThgDetails 