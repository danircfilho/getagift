import { useState, useContext } from 'react'

import Input from '../../form/Input'
import { Link } from 'react-router-dom'

import styles from '../../form/Form.module.css'

/* Context */
import { Context } from '../../../context/UserContext'

function Register() {

  const [ user, setUser] = useState({}) //seta o usuário
  const { register } = useContext(Context)

  //Preencher usuário
  function handleChange(e) {
    setUser({...user, [e.target.name]: e.target.value }) //pelo nome toda mudança fica registrada
  }

  //Enviar os dados para o backend
  function handleSubmit(e) {
    e.preventDefault()
    register(user)
  }

  return (
    <section className={styles.form_container}>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <Input
          text="Name"
          type="text"
          name="name"
          placeholder="Enter your name"
          handleOnChange={handleChange}
        />
        <Input
          text="Phone"
          type="text"
          name="phone"
          placeholder="Enter your phone"
          handleOnChange={handleChange}
        />
        <Input
          text="E-mail"
          type="email"
          name="email"
          placeholder="Enter your email"
          handleOnChange={handleChange}
        />
        <Input
          text="Password"
          type="password"
          name="password"
          placeholder="Enter your password"
          handleOnChange={handleChange}
        />
        <Input
          text="Confirm pasword"
          type="password"
          name="confirmpassword" 
          placeholder="Confirm your password"
          handleOnChange={handleChange}
        />
        <input type="submit" value="Register" />
      </form>
      <p>
        Already have account? <Link to="/login">Click here!</Link>
      </p>
    </section>
  )
}

export default Register