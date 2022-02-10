import { useState } from 'react'

import formStyles from './Form.module.css'

import Input from './Input'

function ThgForm(handleSubmit, thgData, btnText) {
  const [thg, setThg] = useState(thgData || {})
  const [preview, setPreview] = useState([])
  const colors = ['White', 'Black', 'Silver', 'Gold', 'Not mentioned']

  function onFileChange(e) {

  }

  function handleChange(e) {

  }

  return (            
    <form className={formStyles.form_container}>
      <Input 
        text="Image of donated items"
        type="file"
        name="images"
        handleOnChange={onFileChange}
        multiple={true}
      />
      <Input 
        text="Item name"
        type="text"
        name="name"
        placeholder="Enter the item name"
        handleOnChange={handleChange}
        value={thg.name || ''}
      />
      <Input 
        text="Usage time" 
        type="text"
        name="age"
        placeholder="Enter the time"
        handleOnChange={handleChange}
        value={thg.age || ''}
      />
      <Input 
        text="Item weight"
        type="number"
        name="weight"
        placeholder="Enter the weight"
        handleOnChange={handleChange}
        value={thg.weight || ''}
      />
      <input type="submit" value="Register Item" />
    </form>
  )
}

export default ThgForm

/* btnText = muda no componente */