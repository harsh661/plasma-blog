import React, {useContext} from 'react'
import Blog from '../components/Blog'
import { UserContext } from '../UserContext'


const Home = () => {
  const {darkMode} = useContext(UserContext)
  
  return (
    <div className={`${darkMode ? 'bg-gradient-to-b from-dark to-darker': ''} flex justify-center min-h-body`}>
      <Blog />
    </div>
  )
}

export default Home