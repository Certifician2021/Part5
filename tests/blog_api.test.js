const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog-list')
const api = supertest(app)
const helper = require('../utils/test_helper')


beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
})

test('unique id is named id',async ()=>{
  const blogs = await Blog.find({})
  expect(blogs[0].id).toBeDefined()
})

test('saving new blog', async ()=>{
    const newblog = {
      title: "new blog",
      url: "pta nhi",
      likes: 0,
      author: "ramu"
    }
   
    await api.post('/api/blogs').send(newblog).expect(200).expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)
  
    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(titles).toContain(
      'new blog'
    )
})

test('like property defaults to 0 ', async () => {
  const newBlog = {
    title:"running tests",
    author:"Robert C. Martin",
    url:"http://blog.cleancoder.com/",
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.totalBlogs()
  const addedBlog = await blogsAtEnd.find(blog => blog.title === "running tests")
  expect(addedBlog.likes).toBe(0)
})

test('If title and url are missing, respond with 400 ', async () => {
  const newBlog = {
    author:"Jahapana",
    likes:12
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.totalBlogs()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})


test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

afterAll(() => {
  mongoose.connection.close()
})