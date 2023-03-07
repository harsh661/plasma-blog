import React, {useContext, useEffect, useState} from 'react'
import Editor from '../components/Editor'
import {useParams, Navigate} from 'react-router-dom'
import { UserContext } from '../UserContext'
import Loader from '../components/Loader'

const EditPost = () => {
    const {id} = useParams()
    const [title, setTitle] = useState('')
    const [summary, setSummary] = useState('')
    const [files, setFiles] = useState('')
    const [content, setContent] = useState('')
    const [redirect, setRedirect] = useState(false)

    const {darkMode} = useContext(UserContext)

useEffect(() => {
    fetch(import.meta.env.VITE_REACT_SERVER+'/post/' + id)
    .then(res => {
        res.json().then(info => {
            setTitle(info.title)
            setSummary(info.summary)
            setFiles(info.cover)
            setContent(info.content)
            console.log(info)
        })
        console.log(res)
    })
}, [])

const updatePost = async (e) => {
    e.preventDefault()
    const data = new FormData()
    data.set('title', title)
    data.set('summary', summary)
    data.set('content', content)
    data.set('id', id)
    data.set('file', files)

    await fetch(import.meta.env.VITE_REACT_SERVER+'/post', {
        method: 'PUT',
        body: data,
        credentials: 'include'
    })
    setRedirect(true)
}

if(content === '') return <Loader />

if(redirect) {
    return <Navigate to={`/post/${id}`} />
}
  return (
    <div className={`${darkMode ? 'bg-gradient-to-b from-dark to-darker': ''} flex justify-center min-h-body`}>
      <div className='max-w-6xl mx-auto flex flex-col items-center p-5 w-full'>
      <h1 className={`${darkMode ? 'text-white': ''} text-3xl font-bold text-center mt-10 mb-5`}>Edit your Post:</h1>
        <form className='flex flex-col gap-5' onSubmit={updatePost}>
          <div className='flex flex-col gap-3'>
            <h2 className={`${darkMode ? 'text-dark-text': 'text-light-mode-text'} text-2xl font-bold`}>Enter a title:</h2>
            <input 
              className={`${darkMode ? 'text-white': ''} border border-dark-text p-2`}
              type="text"
              name="title" 
              id="title" 
              placeholder='Title'
              value={title}
              size={1}
              onChange={(e)=>setTitle(e.target.value)} 
            />
          </div>
          <div className='flex flex-col gap-3'>
            <h2 className={`${darkMode ? 'text-dark-text': 'text-light-mode-text'} text-2xl font-bold`}>Write a summary:</h2>
            <input 
            className={`${darkMode ? 'text-white': ''} border border-dark-text p-2 bg-transparent h resize-none h-24`}
            type="text"
            name="summary" 
            id="summary" 
            placeholder='Summary'
            value={summary}
            size={1}
            onChange={(e)=>setSummary(e.target.value)}
          />
          </div>
          <div className='flex flex-col gap-3'>
            <h2 className={`${darkMode ? 'text-dark-text': 'text-light-mode-text'} text-2xl font-bold`}>Add a cover image:</h2>
            <input 
            className={`${darkMode ? 'text-white': ''} border border-dark-text p-2`} 
            type="text"
            placeholder='Paste image link here'
            name="cover" 
            id="cover"
            size={1}
            value={files}
            onChange={(e)=>setFiles(e.target.value)}
          />
          </div>

          <div className='flex flex-col gap-3'>
            <h2 className={`${darkMode ? 'text-dark-text': 'text-light-mode-text'} text-2xl font-bold`}>Edit you Post content:</h2>
            <Editor value={content} onChange={setContent} theme={darkMode && 'text-white'}/>
          </div>

          <button className='bg-accent text-white font-semibold p-4 my-5 rounded-2xl hover:bg-accent-dark'>Update the Post</button>
        </form>
      </div>
    </div>
  )
}

export default EditPost