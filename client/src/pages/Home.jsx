import React, {useContext} from 'react'
import Blog from '../components/Blog'
import { UserContext } from '../UserContext'
import {AiOutlineTwitter, AiOutlineInstagram, AiFillLinkedin, AiFillGithub} from 'react-icons/ai'


const Home = () => {
  const {darkMode} = useContext(UserContext)
  
  return (
    <div className={`${darkMode ? 'bg-dark': ''} flex flex-col items-center min-h-body pb-20`}>
      <div className='flex flex-col gap-5 items-center p-5'>
        <h2 className={`${darkMode && 'text-white'} text-3xl`}>Plasma Blogs</h2>
        <div className={`${darkMode ? 'text-dark-text': 'text-light-mode-text'} flex justify-center gap-5 text-2xl`}>
          <a target='_blank' href='https://twitter.com/Harsh_script'><AiOutlineTwitter/></a>
          <a target='_blank' href='https://www.linkedin.com/in/harsh-raj-1b6638258/'><AiFillLinkedin /></a>
          <a target='_blank' href='https://github.com/harsh661'><AiFillGithub /></a>
          <a target='_blank' href='https://instagram.com/harsh.script'><AiOutlineInstagram/></a>
        </div>
      </div>
      <Blog />
    </div>
  )
}

export default Home