import Link from 'next/link'
import React from 'react'

function NavBar() {
  return (
    <div className='flex justify-between px-4 bg-purple-500 items-center py-5 rounded-lg text-xl'>
        <div><img src="" alt="LOGO" /></div>
        <div><ul className='flex justify-between gap-5 items-center font-bold text-gray-300'>
            <li><Link href={"/"}>Home</Link> </li>
            <li><Link href={"/Product"}>Product</Link> </li>
            <li><Link href={"/Cart"}>Cart</Link> </li>
        </ul></div>
        <div><Link href={"/signIn"} className=' bg-blue-700 hover:bg-blue-900 text-white px-3 py-2 rounded-full'>Login/Signup</Link></div>
    </div>
  )
}

export default NavBar