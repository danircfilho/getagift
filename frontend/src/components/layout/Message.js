import { useState, useEffect } from 'react'
import styles from './Message.module.css'
import bus from '../../utils/bus'

function Message() {
  
  const [ visbility, setVisbility ] = useState(false) //mensagem aparecer quando chamada
  const [ message, setMessage ] = useState('')
  const [ type, setType ] = useState('')

  //para conter eventos contínuos
  useEffect(() => {
    bus.addListener('flash', ({ message, type }) => {
      //mensagem são preenchidas com estes dados
      setVisbility(true)
      setMessage(message)
      setType(type)

      //tempode exibição das mensagens
      setTimeout(() => {
        setVisbility(false)
      }, 3000) // 3 segundos
    })
  }, [])


  return (
    visbility && (
      <div className={`${styles.message} ${styles[type]}`}>{message}</div>
    )
    
  )
}

export default Message