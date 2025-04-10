import React from 'react'

const Footer = () => {
    return (
        <div className='bg-slate-800 text-white flex flex-col justify-center items-center'>
            <div className="logo font-bold text-xl ">
                <span className="text-green-500">&lt;</span>
                Password-
                <span className="text-green-500">OP/&gt;</span>

            </div>
            <div className='flex h-12 py-1'>

                Created with <img src="icons/heart.png" alt="" /> by  RSROYAL
            </div>
        </div>
    )
}

export default Footer
