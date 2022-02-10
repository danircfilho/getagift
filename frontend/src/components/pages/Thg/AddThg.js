import  api from '../../../utils/api'

import ThgForm from '../../form/ThgForm'

import styles from './AddThg.module.css'

import { useState} from 'react'
import { useHistory } from 'react-router-dom'

/* Hooks */
import useFlashMessage from '../../../hooks/useFlashMessage'


function AddThg() {
  return (
    <section className={styles.addthg_header}>
      <div>
        <h1>Register your donation</h1>
        <p>Ficará disponível</p>
      </div>
      <ThgForm />      
    </section>
  )
}

export default AddThg