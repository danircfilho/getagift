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

  //criar uma função para enviar o registro do usuário para o BD
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

  async function authUser(data) {
    setAuthenticated(true)
    localStorage.setItem('token', JSON.stringify(data.token))

    history.push('/')
  }

  return { authenticated, register }
}
