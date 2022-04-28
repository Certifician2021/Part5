const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/users')


usersRouter.get('/', async (request, response, next) => {
  const users = await User
  .find({}).populate('blogs')

  response.json(users)
})

usersRouter.get('/:id', async(request, response, next)=>{

  const user = await User.findById(request.params.id)

  if (user) {
    response.json(user)
  } else {
    response.status(404).end()
  }

})

usersRouter.post('/', async (request, response, next) => {
    
  const { username, name, password } = request.body

  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return response.status(400).json({
      error: 'username must be unique'
    })
  }
  if(!password || !username ){
    return response.status(400).json({
      error: 'username or password missing'
    })
  }
  if(password.length < 3){
    return response.status(400).json({
      error: 'password or username must be 3 characters long'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter
