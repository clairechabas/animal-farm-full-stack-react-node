import express from 'express'
import cors from 'cors'
const PORT = process.env.PORT || 8081

const app = express()

// We need our frontend to be able to make requests
// to our server from a different URL (a different origins)
app.use(cors())

// We need to parse JSON received in requests' `body`
app.use(express.json())

// Build an array of 250 random animals
import Chance from 'chance'
const chance = new Chance()
const animals = [...Array(250).keys()].map((id) => {
  return {
    id,
    type: chance.animal(),
    age: chance.age(),
    name: chance.name(),
  }
})

// Endpoint to search within the list of animals
app.get('/', (req, res) => {
  const q = req.query.q?.toLowerCase() || ''
  const results = animals.filter((animal) =>
    animal.type.toLowerCase().includes(q)
  )

  res.send(results)
})

app.listen(PORT, () =>
  console.log(`🚀 Listening server on http://localhost:${PORT}`)
)
