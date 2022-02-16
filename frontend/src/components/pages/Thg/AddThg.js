import api from '../../../utils/api'

import ThgForm from '../../form/ThgForm'

import styles from './AddThg.module.css'

import { useState} from 'react'
import { useHistory } from 'react-router-dom'

/* Hooks */
import useFlashMessage from '../../../hooks/useFlashMessage'

function AddThg() {

  const [token] = useState(localStorage.getItem('token') || '')
  const { setFlashMessage } = useFlashMessage()
  const history = useHistory()

  async function registerThg(thg) {
    
    let msgType = 'success'
    
    const formData = new FormData()

    await Object.keys(thg).forEach((key) => {
      if(key === 'images') {
        for(let i = 0; i < thg[key].length; i++) {
          formData.append('images', thg[key][i])
        }
      } else {
        formData.append(key, thg[key])
      }
    })

    const data = await api.post('thgs/create', formData, {
      Authorization: `Bearer ${JSON.parse(token)}`, 
      'Content-Type': 'multipart/fprm-data'
    })
    .then((response) => {
      return response.data
    })
    .catch((err) => {
      msgType = 'error'
      return err.response.data
    })

    setFlashMessage(data.message, msgType)
    
    if (msgType !== 'error') {
      history.push('/thgs/mythgs')  
    }    

  }
  return (
    <section className={styles.addthg_header}>
      <div>
        <h1>Register your donation</h1>
      </div>
      <ThgForm handleSubmit={registerThg} btnText="Register Item" />      
    </section>
  )
}

export default AddThg

