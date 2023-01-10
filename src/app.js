import express from 'express'

const app = express()
app.use(express.json())

const cars = [
  { id: 1, model: "Fiat", name: "Argo", year: 2020 },
  { id: 2, model: "Fiat", name: "Uno", year: 2022 },
  { id: 3, model: "VW", name: "Polo", year: 2019 },
  { id: 4, model: "VW", name: "Gol", year: 2018 },
  { id: 5, model: "Ford", name: "EcoSport", year: 2021 },
  { id: 6, model: "Volvo", name: "Xc60", year: 2021 }
]

app.get('/api/cars', (req, res) => {
  const { year } = req.query

  if (year) {
    const filteredCars = cars.filter(item => item.year === parseInt(year))
    return res.send(filteredCars)
  }

  res.send(cars)
})

app.get('/api/cars/:id', (req, res) => {
  const { id } = req.params

  if (!id || isNaN(id)) return res.status(422).send('Por favor informe um id válido')

  const getCarById = cars.find(item => item.id === parseInt(id))

  if (!getCarById) return res.status(404).send("Carro não encontrado!")

  res.send(getCarById)
})

app.post('/api/cars', (req, res) => {
  const { model, year, name } = req.body;
  const { admin } = req.headers;

  if (admin == 'false') return res.status(401).send('Você não tem autorização para cadastrar')

  if (!model || !year || !name) return res.status(422).send('Por favor informe todos os  campos!')

  cars.push({ model, year, name })

  res.status(201).send("OK")
})

const PORT = 6000

app.listen(PORT, () => console.log('foiiiiiii'))