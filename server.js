import { fastify } from 'fastify'
//import { DatabaseMemory } from './database-memory.js'
import { DatabasePostgres } from './database-postgres.js'

const server = fastify()

//const database = new DatabaseMemory()
const database = new DatabasePostgres()


server.post('/videos', async (req, reply) => {
  const { title, description, duration } = req.body

  await database.create({
    title,
    description,
    duration,
  })

  return reply.status(201).send()
})

server.get('/videos', async (req) => {
  const search = req.query.search

  const videos = await database.list(search)

  return videos
})

server.put('/videos/:id', async (req, reply) => {
  const videoId = req.params.id
  const { title, description, duration } = req.body

  await database.update(videoId, { 
    title, 
    description, 
    duration
  })

  return reply.status(204).send()
})

server.delete('/videos/:id', async (req, reply) => {
  const id = req.params.id

  await database.delete(id)

  return reply.status(204).send()
})

server.listen({
  port: process.env.PORT ?? 3333,
})