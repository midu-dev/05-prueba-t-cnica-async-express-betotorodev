import express from 'express'

export const app = express()
app.use(express.json())

const items = [{
  id: 1,
  content: 'Item 1'
}]

// EJERCICO 6 aquí
app.get('/items', (req, res) => {
  res.json(items)
})

app.get('/items/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const item = items.find(item => item.id === id)
  res.json(item)
})

app.post('/items', (req, res) => {
  const item = req.body
  const id = items.length + 1
  const newItem = { id, content: item.content }
  items.push(newItem)
  res.json(newItem)
})

app.put('/items/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const item = items.find(item => item.id === id)
  item.content = req.body.content
  res.json(item)
})

app.delete('/items/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const index = items.findIndex(item => item.id === id)
  items.splice(index, 1)
  res.json({ message: 'Item deleted' })
})

export const server = app.listen(3000)
