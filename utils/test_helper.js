const Blog = require('../models/blog-list')
const User = require('../models/users')

const initialBlogs = [
    {
      id:"5a422a851b54a676234d17f7",
      title:"React patterns",
      author:"Michael Chan",
      url:"https://reactpatterns.com/",
      likes:7
    },
    {
      id:"5a422aa71b54a676234d17f8",
      title:"Go To Statement Considered Harmful",
      author:"Edsger W. Dijkstra",
      url:"http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes:5
    }
  ]

const totalBlogs = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const totalUsers = async ()=>{
  const users = await User.find({})
  return users.map(user=>user.toJSON())
}

module.exports = {
    initialBlogs, totalBlogs, totalUsers
}