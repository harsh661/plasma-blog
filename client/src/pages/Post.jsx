import React, { useState, useContext } from 'react'
import { Navigate } from 'react-router-dom';
import Editor from '../components/Editor'
import { UserContext } from '../UserContext';

const Post = () => {
  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [files, setFiles] = useState('')
  const [content, setContent] = useState('')
  const [redirect, setRedirect] = useState(false)

  const {darkMode} = useContext(UserContext)

  const createNewPost = async(e) => {
      const data = new FormData()
      data.set('title', title)
      data.set('summary', summary)
      data.set('file', files[0])
      data.set('content', content)

    e.preventDefault()
    const response = await fetch(import.meta.env.VITE_REACT_SERVER+'/post', {
      method: 'POST',
      body: data,
      credentials: 'include',
    })
    if(response.ok) {
      setRedirect(true)
    }
  }

  if(redirect) {
    return <Navigate to='/' />
  }

  return (
    <div className={`${darkMode ? 'bg-gradient-to-b from-dark to-darker': ''} flex justify-center min-h-body`}>
      <div className='max-w-6xl mx-auto flex flex-col items-center p-5 w-full'>
      <h1 className={`${darkMode ? 'text-white': ''} text-3xl font-bold text-center mt-10 mb-5`}>Create a Post:</h1>
        <form className='flex flex-col gap-5' onSubmit={createNewPost}>
          <div className='flex flex-col gap-3'>
            <h2 className={`${darkMode ? 'text-dark-text': 'text-light-mode-text'} text-2xl font-bold`}>Enter a title:</h2>
            <input 
              className={`${darkMode ? 'text-white': ''} border border-dark-text p-2`}
              type="text"
              required 
              name="title" 
              id="title" 
              placeholder='Title'
              value={title}
              onChange={(e)=>setTitle(e.target.value)} 
            />
          </div>
          <div className='flex flex-col gap-3'>
            <h2 className={`${darkMode ? 'text-dark-text': 'text-light-mode-text'} text-2xl font-bold`}>Write a summary:</h2>
            <input 
            className={`${darkMode ? 'text-white': ''} border border-dark-text p-2 bg-transparent h resize-none h-24`}
            type="text"
            required 
            name="summary" 
            id="summary" 
            placeholder='Summary'
            value={summary}
            onChange={(e)=>setSummary(e.target.value)}
          />
          </div>
          <div className='flex flex-col gap-3'>
            <h2 className={`${darkMode ? 'text-dark-text': 'text-light-mode-text'} text-2xl font-bold`}>Add a cover image:</h2>
            <input 
            className={`${darkMode ? 'text-white': ''} border border-dark-text p-2`} 
            type="file"
            required 
            name="cover" 
            id="cover"
            onChange={(e)=>setFiles(e.target.files)}
          />
          </div>

          <div className='flex flex-col gap-3'>
            <h2 className={`${darkMode ? 'text-dark-text': 'text-light-mode-text'} text-2xl font-bold`}>Write your post:</h2>
            <Editor value={content} onChange={setContent} theme={darkMode && 'text-white'}/>
          </div>

          <button className='bg-accent text-white font-semibold p-4 my-5 rounded-2xl hover:bg-accent-dark'>Post Now</button>
        </form>
      </div>
    </div>
  )
}

export default Post