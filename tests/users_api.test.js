const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const helper = require('../utils/test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/users')

describe('one user at db', () => {
    beforeEach(async () => {
      await User.deleteMany({})

      const passwordHash = await bcrypt.hash('sekret', 10)
      const user = new User({ username: 'root', passwordHash })

      await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await helper.totalUsers()

      const newUser = {
        username: 'fullstackUser',
        name: 'University',
        password: 'lalaland',
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.totalUsers()
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

      const usernames = usersAtEnd.map(u => u.username)
      expect(usernames).toContain(newUser.username)
    })

    test('username already exits', async () => {
        const usersAtStart = await helper.totalUsers()

        const newUser = {
          username: 'root',
          name: 'Superuser',
          password: 'salainen',
        }

        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('username must be unique')

        const usersAtEnd = await helper.totalUsers()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
      })

      test('username too short', async () => {
        const usersAtStart = await helper.totalUsers()

        const newUser = {
          username: 'ro',
          name: 'Superuser',
          password: 'salainen',
        }

        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('is shorter than the minimum allowed length (3)')

        const usersAtEnd = await helper.totalUsers()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
      })

      test('password too short', async () => {
        const usersAtStart = await helper.totalUsers()

        const newUser = {
          username: 'test123',
          name: 'Supernova',
          password: 'sa',
        }

        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('password or username must be 3 characters long')

        const usersAtEnd = await helper.totalUsers()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
      })

    afterAll(() => {
        mongoose.connection.close()
      })
  })