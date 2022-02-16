import { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'

function MyThgs() {
  const [thgs, setThgs] = useState([])
  return (
    <section>
      <div>
        <h1>My Things</h1>
        <Link to="/thg/add">Register things</Link>
      </div>
      
      <div>
        { thgs.length > 0 && <p>Things I'm donating</p>}
        { thgs.length === 0 && <p>There are no donations</p>}
      </div>
    </section>
  )
}

export default MyThgs