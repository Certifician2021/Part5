import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/loginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'


function App() {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [noti, setNoti] = useState(null)

 

  useEffect(()=>{
    async function allblogs(){
      const blogs = await blogService.getAll()
          setBlogs(blogs)
    }
    allblogs()
  },[])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  



  const handleLogin = async (e) => {
  e.preventDefault()

  try {
    const user = await loginService.login({ username, password, })
    blogService.setToken(user.token)
    window.localStorage.setItem(
      'loggedInUser', JSON.stringify(user)
    ) 
    setUser(user)
    setUsername('')
    setPassword('')

  } catch (error) {
    setNoti(error.response.data.error)
    setTimeout(() => {
      setNoti(null)
    }, 5000);
  }

  }

  return (
    <div>
      <h2>Login to the application</h2>
      <Notification message={noti} />
     
    {user === null ?
      <Togglable buttonLabel='login'>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleLogin={handleLogin}
      />
    </Togglable> :
      <div>
        <p>{user.name} logged-in</p><button onClick={()=>{
          window.localStorage.removeItem('loggedInUser')
          window.location.reload(false)
          }}>Logout</button><br/><br/>
        <h3>Create new blog </h3>
          <Togglable buttonLabel='Create Blog' >
          <BlogForm 
          setNoti={setNoti}
          user={user}
          />
          </Togglable>
      
        {blogs.map((blog,i)=>{return <Blog key={i} user={user} blog={blog}/>})}
      </div>
    }
    </div>
  )
    }

export default App;
