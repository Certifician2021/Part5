const blogRouter = require('express').Router()
const Blog = require('../models/blog-list')
const User = require('../models/users')
const jwt = require('jsonwebtoken')


blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

blogRouter.get('/:id',async (request, response) => {
  const blog = await Blog.findById(request.params.id)
   
      if (blog) {
        response.json(blog)
      } else {
        response.status(404).end()
      }
    
})

blogRouter.post('/', async (request, response) => {

  const sender = request.user
  console.log(sender)
  const body = request.body
  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  console.log(user)

  const blog = new Blog({
    title: body.title,
    url: body.url,
    likes: body.likes,
    author: body.author,
    user:user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.json(savedBlog)
})


blogRouter.delete('/:id', async (request, response, next) => {
  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)

  const user = await User.findById(decodedToken.id)
  const blogToDelete = await Blog.findById(request.params.id)

  if ( blogToDelete.user._id.toString() === user._id.toString() ) {
      try {
          await Blog.findByIdAndRemove(request.params.id)
          response.status(204).end()
        } catch (exception) {
          next(exception)
        }
  } else {
      return response.status(401).json({ error: `Unauthorized` })
  }
 
})

blogRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  await Blog.findByIdAndUpdate(request.params.id, blog, { new: true , runValidators: true, context: 'query'})
    
      response.json(updatedNote)
    
    
})

module.exports = blogRouter