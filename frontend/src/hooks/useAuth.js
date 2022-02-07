import api from '../utils/api' //chamar a api

import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom' //controlar as rotas como devem se mostrar primeiro
import useFlashMessage from './useFlashMessage'

export default function useAuth() {  

  const { setFlashMessage } = useFlashMessage()
  const [authenticated, setAuthenticated] = useState(false)
  const history = useHistory()

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
      setAuthenticated(true)
    }

  }, [])

  //Registrar
  async function register(user) {

    //mensagens 
    let msgText = 'Successfully registered'
    let msgType = 'success'

    try {
      const data = await api.post('/users/register', user).then((response) => {
        return response.data
      })

      await authUser(data)

    } catch (error) {
      msgText = error.response.data.message
      msgType = 'error'
    }

    //envio da função
    setFlashMessage(msgText, msgType)
  }

  //Logar  
  async function login(user) {
    //função assincrona por causa do BD que pode demorar em responder
    let msgText = 'Login successfully'
    let msgType = 'success'

    try {
      const data = await api.post('/users/login', user).then((response) => {
        return response.data
      })

      await authUser(data)

    } catch (error) {
      msgText = error.response.data.message
      msgType = 'error'
    }

    setFlashMessage(msgText, msgType)
  }

  //Autenticar Usuário
  async function authUser(data) {
    setAuthenticated(true)
    localStorage.setItem('token', JSON.stringify(data.token))

    history.push('/')
  }
  
  //Logout
  function logout() {
    const msgText = 'Logout successful'
    const msgType = 'success'

    setAuthenticated(false)
    localStorage.removeItem('token')
    api.defaults.headers.Authorization = undefined

    history.push('/')

    setFlashMessage(msgText, msgType)
  }

  return { register, authenticated, logout, login }
}
