import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import dateFormat from "dateformat";
import {BsCalendar, BsPerson} from 'react-icons/bs'
import {BiEditAlt} from 'react-icons/bi'
import { UserContext } from '../UserContext';
import Loader from '../components/Loader';

const BlogPage = () => {

  const[info, setInfo] = useState(null)  
  const {id} = useParams()
  const {userInfo, darkMode} = useContext(UserContext)

  useEffect(() => {
    fetch(import.meta.env.VITE_REACT_SERVER+'/post/'+id)
    .then(res => res.json().then(postInfo => {
        setInfo(postInfo)
    }))
  }, [])

  if(!info) return <Loader/>

  return (
    <div className={`${darkMode ? 'bg-gradient-to-b from-dark to-darker': ''} min-h-body`}>
      <div className="max-w-4xl mx-auto flex flex-col items-center p-5">
          <h1 className={`${darkMode && 'text-white'} text-4xl font-bold text-left w-full pt-5 pb-5 sm:pb-10`}>{info.title}</h1>
          <div className='pb-10 flex gap-5 items-center flex-wrap w-full'>
              <span className={`flex gap-3 items-center ${darkMode ? 'text-dark-text':'text-light-mode-text'}`}>
                <BsCalendar />
                {dateFormat(info.createdAt, "mmmm dS, yyyy")}
              </span>
              <span className={`flex gap-3 items-center ${darkMode ? 'text-dark-text':'text-light-mode-text'}`}>
                <BsPerson size={20}/>
                {info?.author?.username}
                {userInfo?.id === info?.author._id && (
                  <Link to={`/edit/${info._id}`} className='pl-1'>
                    <BiEditAlt size={25}/>
                  </Link>
                  )} 
              </span>
          </div>
          <div className='w-full'>
              <img src={import.meta.env.VITE_REACT_SERVER+'/'+info.cover} 
              alt="Blog image" 
              className='max-h-96 w-full object-cover object-center'
              />
          </div>
          <div dangerouslySetInnerHTML={{__html: info.content}} className={`${darkMode ? 'content-dark' : 'content'} w-full py-10 flex flex-col justify-start`}/>
      </div>
    </div>
  )
}

export default BlogPage