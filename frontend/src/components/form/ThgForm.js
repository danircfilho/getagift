import { useState } from 'react'

import formStyles from './Form.module.css'

import Input from './Input'
import Select from './Select'

function ThgForm({handleSubmit, thgData, btnText}) {
  const [thg, setThg] = useState(thgData || {})
  const [preview, setPreview] = useState([])
  const colors = ['White', 'Black', 'Silver', 'Gold', 'Not mentioned']

  function onFileChange(e) {
    setPreview(Array.from(e.target.files))
    setThg({...thg, images: [...e.target.files]})
  }

  function handleChange(e) {
    setThg({...thg, [e.target.name]: e.target.value})
  } 

  function handleColor(e) {
    setThg({...thg, color: e.target.options[e.target.selectedIndex].text })
  }

  function submit(e) {
    e.preventDefault()
    console.log(thg)
    handleSubmit(thg)
  }

  return (            
    <form onSubmit={submit} className={formStyles.form_container}>
      <div className={formStyles.preview_thg_images}>
        {preview.length > 0
          ? preview.map((image, index) => (
            <img 
              src={URL.createObjectURL(image)} 
              alt={thg.name} 
              key={`${thg.name}+${index}`} 
            />
          ))
          : thg.images && 
          thg.images.map((image, index) => (
            <img 
              src={`${process.env.REACT_APP_API}/images/thgs/${image}`} 
              alt={thg.name} 
              key={`${thg.name}+${index}`} 
            />
          ))
        }
      </div>
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
      <Select 
        name="color"
        text="Select color"
        options={colors}
        handleOnChange={handleColor}
        value={thg.color || ''}
      />
      <input type="submit" value={btnText} />
    </form>
  )
}

export default ThgForm

/* btnText = muda no componente */

