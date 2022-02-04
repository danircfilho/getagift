import axios from 'axios'

//chamasr a api do seu local
export default axios.create ({
  baseURL: 'http://localhost:5000'
})