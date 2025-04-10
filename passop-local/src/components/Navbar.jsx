import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-slate-800  text-white'>
            <div className="mycontainer flex justify-between items-center  px-4 py-5 h-14">
                <div className="logo font-bold text-xl ">
                    <span className="text-green-500">&lt;</span>
                    Password-
                    <span className="text-green-500">OP/&gt;</span>
                    
                </div>
                {/* <ul>
                    <li className='flex gap-4'>
                        <a className='hover:font-bold' href="/">Home</a>
                        <a className='hover:font-bold' href="#">About</a>
                        <a className='hover:font-bold' href="#">Contact</a>
                    </li>

                </ul> */}
                <div className='text-white cursor-pointer bg-green-700 my-5 rounded-md flex  justify-between items-center ring-2 ring-white'>
                    <img className='invert w-10 p-1' src="/icons/github.svg" alt="" />
                    <span className='font-bold px-2'>Github</span>
                </div>
            </div>

        </nav>
    )
}

export default Navbar
