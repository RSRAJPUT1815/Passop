import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';


const Manager = () => {
    const ref = useRef()
    const passwordref = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passArray, setPassArray] = useState([])
    useEffect(() => {
        let passwords = localStorage.getItem("password")
        if (passwords) {
            setPassArray(JSON.parse(passwords))
        } else {
            passArray.length = 0;
        }
    }, [])

    const copytext = (text) => {
        toast('Copied to clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)
    }

    const showpassword = () => {

        if (ref.current.src.includes("icons/eyecross.png")) {
            ref.current.src = "icons/eye.png"
            passwordref.current.type = "password"
        } else {

            ref.current.src = "icons/eyecross.png"
            passwordref.current.type = "text"
        }

    }

    const savepassword = () => {
        if (form.site.length>3 && form.username.length>3 && form.password.length>3) {
            
            toast('Password is saved', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            
            setPassArray([...passArray, { ...form, id: uuidv4() }])
            localStorage.setItem("password", JSON.stringify([...passArray, { ...form, id: uuidv4() }]))
            setform({ site: "", username: "", password: "" })
        }else{
            toast('Error : password not saved ', {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }


    }
    const deletepassword = (id) => {
        toast('password deleted', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        let c= confirm("Do you wanted to delete this password")
        if (c) {
            
            setPassArray(passArray.filter(item => item.id!==id))
            localStorage.setItem("password", JSON.stringify(passArray.filter(item => item.id!==id)))
        }


    }
    const editpassword = (id) => {
        
        setform(passArray.filter(item => item.id===id)[0])
        setPassArray(passArray.filter(item => item.id!==id))


    }
    const handlechange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }




    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"

            />
            <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div></div>
            <div className="p-2  md:mycontainer ">
                <h1 className='text-2xl font-bold text-center'>
                    <span className="text-green-500">&lt;</span>
                    Password-
                    <span className="text-green-500">OP/&gt;</span>
                </h1>
                <p className='text-green-900 text-center text-lg'>Manage your password hare</p>

                <div className="text-black flex flex-col p-4 gap-8 items-center">
                    <input type="text" value={form.site} onChange={handlechange} placeholder='Enter your URL' className='rounded-full border border-green-600  outline-green-700  px-4 py-1 w-full' name="site" id="site" />
                    <div className='flex flex-col md:flex-row w-full justify-between gap-8'>
                        <input value={form.username} onChange={handlechange} type="text" placeholder='Enter user name' className='rounded-full border border-green-600  outline-green-700  px-4 py-1 w-full' name="username" id="username" />
                        <div className="relative">

                            <input ref={passwordref} value={form.password} onChange={handlechange} type="password" placeholder='Enter Password' className='rounded-full border border-green-600  outline-green-700  px-4 py-1 w-full' name="password" id="password" />
                            <span className='absolute right-1 top-1 cursor-pointer' onClick={showpassword}>
                                <img className='p-1 ' ref={ref} width={30} src="icons/eye.png" alt="eye" />
                            </span>
                        </div>
                    </div>
                    <button onClick={savepassword} className='flex justify-center items-center bg-green-500 rounded-full px-5 gap-2 py-2 w-fit hover:bg-green-400 border border-gray-900'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover" >
                        </lord-icon>Save</button>
                </div>
                <div className="passwords">
                    <h2 className='py-4 text-2xl font-bold'>Your Passwords</h2>
                    {passArray.length === 0 && <div> No Passwords to show</div>}
                    {passArray.length != 0 && <table className="table-auto w-full overflow-hidden rounded-md mb-5">
                        <thead className='bg-green-950 text-white'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Passwords</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {passArray.map((item, index) => {
                                return <tr key={index}>
                                    < td className='  text-center  py-2 border border-white' >
                                        <div className="flex  items-center justify-center">
                                            <a href={item.site} target='_blank'> {item.site}</a>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copytext(item.site) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className=' text-center  py-2 border border-white'>
                                        <div className="flex  items-center justify-center">
                                            <span>{item.username}</span>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copytext(item.username) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>

                                    </td>
                                    <td className=' text-center  py-2 border border-white'>
                                        <div className="flex  items-center justify-center">
                                            <span>{item.password}</span>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copytext(item.password) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className=' text-center  py-2 border border-white'>
                                        <span className='cursor-pointer mx-1' onClick={() => { editpassword(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/gwlusjdu.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                        </span>
                                        <span className='cursor-pointer mx-1' onClick={() => { deletepassword(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/skkahier.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                        </span>
                                    </td>
                                </tr>
                            })}

                        </tbody>
                    </table>}
                </div >

            </div >
        </>

    )
}

export default Manager
