import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import { UserContext } from '../UserContext'

const Categories = () => {

    const categories = ['React', 'JavaScript', 'Tailwind', 'Linux', 'Windows']  

    const {darkMode} = useContext(UserContext)
  return (
    <div className='w-full flex py-3 gap-3 overflow-scroll'>
        {
            categories.map((category, index) => {
                return (
                    <Link to={`category/:id`} key={index} className={`${darkMode ? 'bg-light text-dark-text': 'bg-light-mode text-light-mode-text'} px-3 py-2 rounded-2xl cursor-pointer`}>
                        {category}
                    </Link>
                )
            })
        }
    </div>
  )
}

export default Categories