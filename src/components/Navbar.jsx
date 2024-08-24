import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-around bg-blue-950 text-white  p-10 py-9'>
        <div className="logo">
            <span className='font-bold text-xl mx-8'>TO-DO APP</span>
        </div>
       <ul className="flex gap-40 mx-9">
        <li className='cursor-pointer hover:font-bold transition-all'>
            HOME
        </li>
        <li className='cursor-pointer hover:font-bold transition-all'>
            YOUR TASKS
        </li>
        </ul> 
    </nav>
  )

}

export default Navbar
