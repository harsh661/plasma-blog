import React, { useContext, useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../UserContext'
import {IoMdAdd} from 'react-icons/io'
import {MdLightMode, MdNightlightRound, MdClose, MdLogout} from 'react-icons/md'
import {FaRegUserCircle} from'react-icons/fa'
import {HiOutlineMenuAlt1, HiOutlineMoon} from 'react-icons/hi'
import {AiOutlineTwitter, AiOutlineInstagram, AiFillLinkedin, AiFillGithub} from 'react-icons/ai'

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false)

  const {setUserInfo, userInfo, darkMode, setDarkMode,} = useContext(UserContext)

  useEffect(() => {
    fetch(import.meta.env.VITE_REACT_SERVER+'/profile', {
      credentials: 'include',
    }).then((res) => {
      res.json().then(info => {
        setUserInfo(info)
      })
    })
  },[])

  const logout = () => {
    fetch(import.meta.env.VITE_REACT_SERVER+'/logout', {
      credentials: 'include',
      method: 'POST',
    })
    setUserInfo(null)
    setNavOpen(false)
  }

  return (
    <nav className={`${darkMode ? 'bg-dark': 'bg-white shadow-md'} z-10 px-5 flex items-center justify-center sticky top-0`}>
      <div className='h-[60px] md:relative w-full flex items-center justify-between max-w-6xl'>
        <Link to='/' className='hidden md:flex'>
          <img className='w-24' src={darkMode ? '/logo-dark.png' : '/logo.png'} alt="" />
        </Link>
        <div onClick={() => setNavOpen(prev => !prev)} className={`${darkMode && 'text-dark-text'} ${navOpen && 'hidden'} md:hidden text-3xl z-50`}>
          <HiOutlineMenuAlt1 />
        </div>
        <div onClick={() => setNavOpen(prev => !prev)} className={`${darkMode && 'text-dark-text'} ${!navOpen && 'hidden'} md:hidden absolute right-5 text-4xl z-50 animate-slidein`}>
            <MdClose />
        </div>

        <div className='flex items-center gap-5 text-white'>
          { userInfo !== null 
             ?
             <>
             <button 
             className={`${darkMode?'text-dark-text':'text-light-mode-text'}`}
             onClick={() => setDarkMode((mode) => !mode)}
              >
                {darkMode && <MdLightMode size={25}/>}
                {!darkMode && <HiOutlineMoon size={25}/>}

              </button>
              <Link to='/create' className={`${darkMode ? 'text-dark-text': 'text-light-mode-text'} flex items-center`}>
                <IoMdAdd size={30}/>
              </Link>
              <div onClick={()=>setNavOpen(prev => !prev)} className={`${darkMode ? 'text-dark-text': 'text-light-mode-text'} hidden md:flex`}>
                <FaRegUserCircle size={30}/>
              </div>
              </>
            :
            <>
            <button 
              className={`${darkMode?'text-dark-text':'text-light-mode-text'}`}
              onClick={() => setDarkMode((mode) => !mode)}
            >
              {!darkMode && <MdLightMode size={25}/>}
              {darkMode && <MdNightlightRound size={25}/>}

            </button>
            <Link to='/login' className='text-accent px-3 border py-1 rounded-md border-accent font-semibold cursor-pointer'>Login</Link>
            </>
          } 
        </div>
        { (userInfo !== null && navOpen) && (
          <div className={`${darkMode ? 'bg-darker': 'bg-light-mode md:bg-white md:border shadow-md'} animate-slidein w-full md:w-auto md:animate-slideinSmall absolute md:left-auto left-0 top-0 md:top-16 md:right-0 flex flex-col justify-between p-5 pt-20 md:pt-5 h-screen md:h-auto md:justify-between md:items-center md:rounded-lg md:absolute`}>
              <div className='text-dark-text h-full text-xl gap-5 flex flex-col justify-between'>
                <div className={`flex items-center gap-5 ${darkMode ? 'text-dark-text': 'text-black'}`}>
                  <div className='md:hidden'><FaRegUserCircle size={30}/></div>
                  {userInfo.username}
                </div>
                <div onClick={logout} className={`cursor-pointer flex items-center gap-5 text-red pt-5 pb-10 md:pb-5 border-t ${darkMode ? 'border-dark-text': 'border-light-mode-text'}`}>
                  <div><MdLogout size={30}/></div>
                  Logout
                </div>
              </div>
              <div className={`${darkMode ? 'text-dark-text': 'text-light-mode-text'} flex justify-center gap-5 text-3xl`}>
                <a target='_blank' href='https://twitter.com/Harsh_script'><AiOutlineTwitter/></a>
                <a target='_blank' href='https://www.linkedin.com/in/harsh-raj-1b6638258/'><AiFillLinkedin /></a>
                <a target='_blank' href='https://github.com/harsh661'><AiFillGithub /></a>
                <a target='_blank' href='https://instagram.com/harsh.script'><AiOutlineInstagram/></a>
              </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar