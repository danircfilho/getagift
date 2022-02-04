import styles from './Input.module.css'

/*
PARA O FORMULÁRIO
type = number, textos, date, etc
text = o que fica na label, nome do input, etc
name = nome do atributo (id, age, etc)
placeholder = textos de dicas (placeholder)
handleOnChange = monitora as mudanças de estado
value = valores
multiple = trabalhar com multiplos dados (ex: várias fotos) 
*/
function Input( {type, text, name, placeholder, handleOnChange, value, multiple,} ) {
  return (
    <div className={styles.form_control}>
      <label htmlFor={name}>{text}:</label>
      <input 
        type={type}
        name={name} 
        id={name} 
        placeholder={placeholder} 
        onChange={handleOnChange} 
        value={value}
        {...(multiple ? {multiple} : '')} //spread operator com lógica para receber multiplos arquivos-fotos
      />
    </div>
  )
}

export default Input