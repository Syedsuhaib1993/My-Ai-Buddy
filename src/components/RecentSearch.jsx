import React, { useState } from 'react'
import DarkModeToggle from './DarkModeToggle';

const RecentSearch = ({recentHistory,setRecentHistory,setSelectedHistory,isDark,setIsDark}) => {
    
     const ClearHistory = () => {
    localStorage.removeItem("history");
    setRecentHistory([]);}

  return (
    <div className="col-span-1 hidden md:block bg-zinc-100 text-black dark:bg-zinc-800 dark:text-white transition-colors duration-300 ">
        <h1 className="text-center flex justify-center mt-4  text-xl  cursor-pointer ">
          <span>Recent Search</span>
          <button onClick={ClearHistory} className="hover:cursor-pointer">
           {
            isDark? <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="#FFFFFF"
            >
              <path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z" />
            </svg>: <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="#000000"
            >
              <path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z" />
            </svg>
           }
          </button>
        </h1>
        <ul className="text-left pl-4 overflow-auto    text-sm mt-2">
          {recentHistory &&
            recentHistory.map((item, index) => (
              <li
                onClick={() => setSelectedHistory(item)}
                className="py-2 mx-2 w-fit px-2 rounded-lg  hover:translate-x-4 transition duration-300 hover:bg-zinc-300 hover:cursor-pointer "
                key={index}
              >
                {item}
              </li>
            ))}
        </ul>
        <div className='fixed bottom-0 p-4'>
          <DarkModeToggle isDark={isDark} setIsDark={setIsDark}/>
        </div>
        <div>
        </div>
      </div>
  )
}

export default RecentSearch
