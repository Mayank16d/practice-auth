'use client'
import Link from 'next/link';
import React, { useState } from 'react';

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className='flex justify-between items-center px-4 bg-purple-500 py-5 rounded-lg text-xl'>
      <div className={`md:w-1/2 ${!isMenuOpen ? 'block' : 'hidden'}`}><img src="" alt="LOGO" /></div>
      
      {/* Menu button for smaller screens */}
      <div className='md:hidden'>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
        </button>
      </div>

      {/* Links for larger screens */}
      <div className={`flex-grow md:flex md:items-center md:justify-between ${isMenuOpen ? 'block' : 'hidden'}`}>

        <ul className='flex flex-col md:flex-row justify-between gap-5 items-center font-bold text-gray-300'>
          <li><Link href={"/"}>Home</Link></li>
          <li><Link href={"/Product"}>Product</Link></li>
          <li><Link href={"/Cart"}>Cart</Link></li>
        </ul>
        <div className='mt-4 md:mt-0'>
          <Link href={"/signIn"} className='bg-blue-700 hover:bg-blue-900 text-white px-3 py-2 rounded-full'>Login/Signup</Link>
        </div>
      </div>
    </div>
  );
}

export default NavBar;