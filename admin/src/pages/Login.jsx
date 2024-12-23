import React, { useContext, useState } from 'react'
import { AdminContext } from '../contexts/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { DoctorContext } from '../contexts/DoctorContext'

const Login = () => {

    const { setAToken, backendUrl } = useContext(AdminContext)
    const {setDToken} = useContext(DoctorContext)
    const [state, setState] = useState('Admin')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const onSubmitHandler = async (event) =>{
      event.preventDefault()
      try {
        
        if (state === 'Admin') {
            
            const {data} = await axios.post( backendUrl +'/api/admin/login', {email, password})
            if (data.success){
                localStorage.setItem('aToken', data.token)
                setAToken(data.token)
            }
            else{
                toast.error(data.message)
            }

        }else{
            
          const {data} = await axios.post( backendUrl +'/api/doctor/login', {email, password})
          console.log("hello")
          console.log(data);
          
          if (data.success){
              localStorage.setItem('dToken', data.token)
              setDToken(data.token)
          }
          else{
              toast.error(data.message)
          }
        }

      } catch (error) {
        console.log(error);
        toast.error(error.message)
        
      }
    }
    return (
      <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
        <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
          <p className='text-2xl font-semibold'> <span className='text-primary'>{state === 'Admin' ? 'Admin' : 'Doctor'}</span> Login</p>
  
          <div className='w-full'>
            <p>Email</p>
            <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="email" onChange={(e) => setEmail(e.target.value)} value={email} required/>
          </div>
  
          <div className='w-full'>
            <p>Password</p>
            <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="password" onChange={(e) => setPassword(e.target.value)} value={password} required/>
          </div>
          <button className='bg-primary text-white w-full py-2 rounded-md text-base'>{state === 'Sign Up' ? 'Create Account' : 'Login'}</button>
  
          {
            state === 'Admin'
            ? <p>Doctor Login? <span onClick={() => setState('Doctor')} className='text-primary underline cursor-pointer'>Click here</span></p>
            : <p>Admin Login? <span onClick={() => setState('Admin')} className='text-primary underline cursor-pointer'>Click here</span></p>
          }
        </div>
      </form>
    )
  }
  

export default Login