import styles from '../form/Select.module.css'

function Select ({text, name, options, handleOnChange, value,}) {
  return (
    <div className={styles.form_control}>
      <label htmlFor={name}>{text}:</label>
      <select 
        name={name} 
        id={name} 
        onChange={handleOnChange} 
        value={value || ''}    
      >
        <option>Select an option</option>
        {options.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Select

//key é como um id em react