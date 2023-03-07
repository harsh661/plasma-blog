import React, {useContext, useEffect, useState} from 'react'
import { UserContext } from '../UserContext'
import BlogPost from './BlogPost'
import Loader from './Loader'
// import Categories from '../components/Categories'


const Blog = () => {

  const [posts, setPosts] = useState(null)
  const {darkMode} = useContext(UserContext)

  useEffect(() => {
    fetch(import.meta.env.VITE_REACT_SERVER+'/post').then(res => {
      res.json().then(data => {
        console.log(data)
        setPosts(data)
      })
    })
  }, [])

  if(!posts) return <Loader />

  return (
    <div className='w-screen max-w-6xl flex flex-col items-center p-5'>
      {/* <Categories /> */}
      {posts.length > 0 && posts.map((blog, index) => (
        <BlogPost {...blog} key={index}/>
      ))}
      {posts.length == 0 && (
        <h1 className={`${darkMode ? ' text-dark-text': ''} text-3xl font-bold text-center mt-10`}>No Posts yet!</h1>
      )}
    </div>
  )
}

export default Blog