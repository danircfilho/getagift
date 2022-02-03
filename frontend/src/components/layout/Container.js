import styles from './Container.module.css'

function Container( {children} ) {
  return (
    <main className={styles.container}>
      { children }
    </main>
  )
}

export default Container

//props children => faz com que o conteúdo seja exibido no local em que foi solicitado
//muito usado para componentes que abraçam outros