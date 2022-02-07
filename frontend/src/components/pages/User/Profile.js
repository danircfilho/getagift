import { useState, useEffect } from 'react'

import styles from './Profile.module.css'
import formStyles from '../../form/Form.module.css'

import Input from '../../form/Input'


function Profile() {
  const [user, setUser] = useState({})

  function onFileChange(e) {

  }

  function handleChange(e) {

  }

  return (
    <section>
      <h1>Profile</h1>
      <p>Preview Image</p>
      <form className={formStyles.form_container}>
        <Input 
          text="Image"
          type="file"
          name="image"
          handleOnChnage={onFileChange}
        />
        <Input 
          text="E-mail"
          type="email"
          name="email"
          placeholder='Enter your email'
          handleOnChnage={handleChange}
          value={user.email || ''} //vem do backend
        />
        <Input 
          text="Name"
          type="text"
          name="name"
          placeholder='Enter your name'
          handleOnChnage={handleChange}
          value={user.name || ''} //vem do backend
        />
        <Input 
          text="Phone"
          type="text"
          name="phone"
          placeholder='Enter your phone'
          handleOnChnage={handleChange}
          value={user.phone || ''} //vem do backend
        />
        <Input 
          text="Password"
          type="password"
          name="password"
          placeholder='Enter your password'
          handleOnChnage={handleChange}
        />
        <Input 
          text="Confirm Password"
          type="password"
          name="confirmpassword"
          placeholder='Confirm password'
          handleOnChnage={handleChange}
        />
        <input type="submit" value="Edit" />
      </form>
    </section>
  )
}

export default Profile