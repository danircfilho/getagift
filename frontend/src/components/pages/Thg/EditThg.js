import api  from '../../../utils/api'

import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import styles from './AddThg.module.css'

import ThgForm from  '../../form/ThgForm'

/* Hooks */
import useFlashMessage from '../../../hooks/useFlashMessage'

function EditThg() {

  const [ thg, setThg ] = useState({})
  const [token] = useState(localStorage.getItem('token') || '')
  const {id} = useParams() /* por causa do /:id na rota EditId no App */
  const {setFlashMessage} = useFlashMessage()

  /* Objetivo - trazer os itens */
  useEffect(() => {

    api.get(`/thgs/${id}`, {
      Authorization: `Bearer ${JSON.parse(token)}`
    })
    .then((response) => {
      setThg(response.data.thg)
    })

  }, [token, id]) /* dependencias para uso do Effect - [token, id] - (sempre tem que ter)*/

  async function updateThg(thg) {

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

    const data = await api.patch(`thgs/${thg._id}`, formData, {
      headres: {
        Authorization: `Bearer ${JSON.parse(token)}`,
        'Content-Type': 'multipart/form-data'
      }
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
    <section>
      <div className={styles.addthg_header}>
        <h1>Editing the item: {thg.name}</h1>
        <p>After editing the data will be edited in the system</p>
      </div>
      {thg.name && <ThgForm handleSubmit={updateThg} btnText="Update" thgData={thg} />}
    </section>
  )
}

export default EditThg