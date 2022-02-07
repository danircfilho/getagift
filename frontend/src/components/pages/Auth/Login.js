import { useState, useContext } from 'react'

import Input from '../../form/Input'
import { Link } from 'react-router-dom'

import styles from '../../form/Form.module.css'

/* Context */
import  { Context } from '../../../context/UserContext'

function Login() {
  const [user, setUser] = useState({})
  const {login} = useContext(Context)
  
  //Preencher usuário
  function handleChange(e) {
    setUser({...user, [e.target.name]: e.target.value }) //pelo nome toda mudança fica registrada
  }

  //Enviar os dados para o backend
  function handleSubmit(e) {
    e.preventDefault()
    login(user)
  }

  return (
    <section className={styles.form_container}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <Input 
          text="E-mail"
          type="email"
          name="email"
          placeholder="Enter you email"
          handleOnChange={handleChange}
        />
        <Input 
          text="Password"
          type="password"
          name="password"
          placeholder="Enter you password"
          handleOnChange={handleChange}
        />
        <input type="submit" value="Enter" />
      </form>
      <p>
        Already have account? <Link to="/login">Click here!</Link>
      </p>
    </section>
  )
}

export default Login