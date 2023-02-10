import { useEffect, useState } from 'react'
import './App.css'

// Custom hook
function useAnimals() {
  const [animals, setAnimals] = useState([])

  useEffect(() => {
    // runs only when the App component is mounted
    const lastQuery = localStorage.getItem('lastQuery')
    search(lastQuery)
  }, [])

  const search = async (q) => {
    const response = await fetch(`http://localhost:8081?${new URLSearchParams({q})}`)
    const data = await response.json()
    // When the data received changes React re-renders the list of animals
    setAnimals(data)

    // Set last query from user in localStorage
    // This avoids clearing results when users refreshes the page
    localStorage.setItem('lastQuery', q)
  }

  return { search, animals }
}

function App() {
  const { search, animals } = useAnimals()

  return (
    <div>
     <h1>🐻 Animal Farm</h1>

     <input type="text" value={localStorage.getItem('lastQuery')} placeholder='Search an animal' onChange={(e) => search(e.target.value)} />

      <ul>
        {animals.map((animal) => {
          return <Animal key={animal.id} {...animal} />
        })}

        {animals.length === 0 && 'No animals found.'}
      </ul>
    </div>
  )
}

function Animal({ type, name, age }) {
  return (
    <li>
      <strong>{type}</strong> {name} ({age} years old).
    </li>
  )
}

export default App
