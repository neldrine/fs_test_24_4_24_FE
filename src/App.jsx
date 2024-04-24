import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const imageSrc = "http://mars.jpl.nasa.gov/msl-raw-images/msss/01000/mcam/1000ML0044631200305217E01_DXXX.jpg";

  return (
    <>
      <div class="card my-3">
          <img src={imageSrc} />
          <div class="card-body">
              <p>Photo taken by <strong>Rover</strong></p>
              <small class="text-muted">Posted on 2015-05-30</small>
          </div>
      </div>
    </>
  )
}

export default App
