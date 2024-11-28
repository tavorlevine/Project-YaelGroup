import { useState } from 'react'
import './App.css'

function App() {
  
  const [dateHe, setDateHe] = useState("")
  const [error, setError] = useState(null)


  async function handleSubmit(event) {
    event.preventDefault()
    
    setError(null)
    setDateHe("")
    const date = event.target.Date.value
    
    try {
      const response = await fetch(`https://www.hebcal.com/converter?cfg=json&date=${date}&g2h=1&strict=1`);

      if (!response.ok) {
        throw new Error("Error");
      }

      const result = await response.json();

      
      if (!Object.keys(result).length) {
        throw new Error("Error");
      }

      setDateHe(result.hebrew);
    } 
    catch (err) {
      console.error(err);
      setError(err.message);
    }
  }


  return (
    <div className='page'>
      <form className='form' onSubmit={handleSubmit} >
            <h1>Date Convert</h1>
            <div>
              <input type="date" name="Date" id="Date" placeholder="Enter Date" />
              <button type="submit">Submit</button>
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
      <div className='convert'>
        {dateHe && <h3>The date after convert to Hebrew</h3>} 
        {dateHe}
      </div>

    </div>
  )
}

export default App
