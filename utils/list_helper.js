const mostBlogs = (blogs) => {
  const blogArray = blogs.map(blog=>{return blog.blogs})
  const max = Math.max(...blogArray)
  const mostBlog = blogs.find(blog=>{return blog.blogs === max})
  return ({
    author: mostBlog.author,
    blogs: mostBlog.blogs
  })

}

const mostLikes = (blogs) => {
  const likeArray = blogs.map(blog=>{return blog.likes})
  const max = Math.max(...likeArray)
  const mostLike = blogs.find(blog=>{return blog.likes === max})
  return ({
    author: mostLike.author,
    likes: mostLike.likes
  })

}


const favoriteBlog = (blogs)=>{
  const likesArray = blogs.map(blog=>{return blog.likes})
  const max = Math.max(...likesArray)
  const maxBlog = blogs.find(blog=>{return blog.likes === max})
  return maxBlog
}


const totalLikes = (blogs) => {
  if(blogs.length === 0){
    return 0
  }
  else if(blogs.length === 1){
   return blogs.map(el=>el.likes)[0]
  }
  else{  
    
    const result = blogs.map((el)=>{
    return (el.likes)
  })
 
  let s = 0
  const sum = result.reduce((s,p)=>{return s + p},0)

  return sum
}}

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}

  


