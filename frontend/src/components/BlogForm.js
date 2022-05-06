import { useState } from "react"
import blogService from '../services/blogs'

const BlogForm = ({setNoti, user}) => {

  const [title,setTitle] = useState('')
  const [url,setUrl] = useState('')
  const [author,setAuthor] = useState('')

  const addBlog = async(e)=> {
    e.preventDefault()
    
    try {
     
      const newBlog = {
        title: title,
        author: author,
        url: url
      }
     
    blogService.setToken(user.token)
      await blogService.create(newBlog)
      setAuthor('')
      setTitle('')
      setUrl('')
      setNoti(`New blog '${newBlog.title} added by '${newBlog.author}''`)
      setTimeout(()=>{
        setNoti(null)
        window.location.reload(false)
      },3000)
      
 
    } catch (error) {
      setNoti(error.response.data.error)
      setTimeout(()=>{
        setNoti(null)
      },5000)
    }
   }  
    return (
        <div>
            <form onSubmit={addBlog}>
     Title :
     <input id="title" value={title} 
        onChange={({target})=>{setTitle(target.value)}}
      /> <br />
      Author :
      <input id="author" value={author} 
        onChange={({target})=>{setAuthor(target.value)}}
      /> <br />
      Url :
      <input id="url" value={url} 
        onChange={({target})=>{setUrl(target.value)}}
      /> <br /><br/>
      <button type="submit">save</button>
    </form>
        </div>
    )

}

export default BlogForm