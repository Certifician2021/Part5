import { useState } from 'react'
import blogService from '../services/blogs'

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }



const Blog = ({blog}) => {
  const [blogpost, setBlogPost] = useState(blog)
  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }

  const buttonLabel = visible ? 'hide' : 'show'

  const toggleVisibility = ()=>{
    setVisible(!visible)
  }
 
  const increaseLike = async ()=>{
    const newObject = ({
      ...blog,
      likes: blog.likes + 1
    })
    await blogService.update(newObject)
    setBlogPost(newObject)
  }
 
  const removeBlog = async() => {
    if(window.confirm(`Confirm delete ${blog.title} by ${blog.author}`)){
      await blogService.remove(blog.id)
      window.location.reload(false)
    }
  }

   return(
    <div style={blogStyle}>
    {blog.title} {blog.author}<button onClick={toggleVisibility}>{buttonLabel}</button>
    <div style={showWhenVisible}>
      {blog.url} <br/>
      <p>{blogpost.likes}<button id='like' onClick={increaseLike}>Like</button></p>
     <button id='remove' onClick={removeBlog}>remove</button> 
    </div>
    </div>
   )  
   }
  
  export default Blog