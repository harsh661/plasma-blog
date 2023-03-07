import React, { useContext, useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../UserContext'
import {IoMdAdd} from 'react-icons/io'
import {MdLightMode, MdNightlightRound} from 'react-icons/md'
import {FaRegUserCircle} from'react-icons/fa'

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
    <nav className={`${darkMode ? 'bg-dark': 'bg-white shadow-md'} px-5 flex items-center justify-center`}>
      <div className='h-[60px] w-full flex items-center justify-between max-w-6xl relative'>
        <Link to='/'>
          <img className='w-28' src={darkMode ? '/logo-dark.png' : '/logo.png'} alt="" />
        </Link>

        <div className='flex items-center gap-5 text-white'>
          { userInfo !== null 
             ?
             <>
             <button 
             className={`${darkMode?'text-dark-text':'text-light-mode-text'}`}
             onClick={() => setDarkMode((mode) => !mode)}
              >
                {!darkMode && <MdLightMode size={25}/>}
                {darkMode && <MdNightlightRound size={25}/>}

              </button>
              <Link to='/create' className={`${darkMode ? 'text-dark-text': 'text-light-mode-text'} flex items-center`}>
                <IoMdAdd size={30}/>
              </Link>
              <div onClick={() => setNavOpen(prev => !prev)} className={`${darkMode ? 'text-dark-text': 'text-light-mode-text'}`}>
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
            <Link to='/login' className='bg-accent px-3 py-2 text-sm rounded-md cursor-pointer'>Login</Link>
            </>
          } 
        </div>
        { (userInfo !== null && navOpen) && (
          <div className={`${darkMode ? 'bg-darker': 'bg-light-mode shadow-md'} absolute right-0 flex flex-col -bottom-[76px] justify-between items-center p-5 rounded-lg`}>
              <div className='text-dark-text text-xl gap-5 flex flex-col'>
                <div className={`flex items-center gap-5 ${darkMode ? 'text-dark-text': 'text-black'}`}>
                  {userInfo.username}
                  <button onClick={logout} className={`cursor-pointer bg-red text-white font-semibold p-2 rounded-xl hover:bg-accent-dark text-sm`}>Logout</button>
                </div>
              </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar