import React, { useContext, useRef, useState, useEffect } from 'react'
import { AdminContext } from '../contexts/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { DoctorContext } from '../contexts/DoctorContext'

const Login = () => {
  const { setAToken, backendUrl } = useContext(AdminContext)
  const { setDToken } = useContext(DoctorContext)

  const [state, setState] = useState('Admin')
  const [email, setEmail] = useState('demo@mail.com')
  const [password, setPassword] = useState('qwerty123')
  const [loading, setLoading] = useState(false)

  const mountedRef = useRef(true)
  const serverToastIdRef = useRef(null)

  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  }, [])

  // ping health endpoint — returns true if server responds with 2xx
  const pingHealth = async (timeoutMs = 3000) => {
    try {
      await axios.get(`${backendUrl}/health`, { timeout: timeoutMs })
      return true
    } catch (err) {
      return false
    }
  }

  // wait for server ready with exponential backoff + jitter
  const waitForServerReady = async ({
    maxRetries = 10,
    baseInterval = 2000, // initial 2s
    maxBackoff = 30000,
    pingTimeout = 3000,
  } = {}) => {
    for (let i = 0; i < maxRetries && mountedRef.current; i++) {
      const ok = await pingHealth(pingTimeout)
      if (ok) return true

      const backoff = Math.min(baseInterval * 2 ** i, maxBackoff)
      const jitter = Math.floor(Math.random() * backoff * 0.25)
      const waitMs = backoff + jitter

      // wait but bail early if unmounted
      await new Promise((resolve) => {
        const id = setTimeout(resolve, waitMs)
        if (!mountedRef.current) {
          clearTimeout(id)
          resolve()
        }
      })
    }
    return false
  }

  // perform login API call — returns true on success
  const doLogin = async () => {
    try {
      if (state === 'Admin') {
        const { data } = await axios.post(
          backendUrl + '/api/admin/login',
          { email, password },
          { timeout: 10000 } // 10s timeout
        )
        if (data.success) {
          localStorage.setItem('aToken', data.token)
          if (mountedRef.current) setAToken(data.token)
          toast.success('Logged in as Admin')
          return true
        } else {
          toast.error(data.message || 'Login failed')
          return false
        }
      } else {
        const { data } = await axios.post(
          backendUrl + '/api/doctor/login',
          { email, password },
          { timeout: 10000 } // 10s timeout
        )
        if (data.success) {
          localStorage.setItem('dToken', data.token)
          if (mountedRef.current) setDToken(data.token)
          toast.success('Logged in as Doctor')
          return true
        } else {
          toast.error(data.message || 'Login failed')
          return false
        }
      }
    } catch (error) {
      console.error('login error', error)
      const msg =
        error?.code === 'ECONNABORTED'
          ? 'Request timed out — please try again'
          : error?.response?.data?.message || error?.message || 'Login request failed'
      toast.error(msg)
      return false
    }
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    setLoading(true)

    try {
      // quick health check
      const healthy = await pingHealth(2500)
      if (healthy) {
        // server up: attempt login directly (doLogin has its own timeout)
        await doLogin()
        return
      }

      // server not up: show persistent toast and poll
      const toastId = toast.info('Server is starting, please wait...', {
        autoClose: false,
      })
      serverToastIdRef.current = toastId

      const becameReady = await waitForServerReady({
        maxRetries: 12,
        baseInterval: 3000,
        maxBackoff: 30000,
        pingTimeout: 3000,
      })

      if (!mountedRef.current) return

      if (becameReady) {
        // Use string type instead of toast.TYPE to avoid undefined on some versions
        if (toastId !== null && toastId !== undefined) {
          toast.update(toastId, {
            render: 'Server is ready — attempting login...',
            type: 'success',
            autoClose: 2000,
          })
        } else {
          // fallback notification
          toast.success('Server is ready — attempting login...')
        }

        await doLogin()
      } else {
        if (toastId !== null && toastId !== undefined) {
          toast.update(toastId, {
            render: 'Server still not responding — please try again later.',
            type: 'error',
            autoClose: 5000,
          })
        } else {
          toast.error('Server still not responding — please try again later.')
        }
      }
    } catch (err) {
      console.error('Unexpected error in login flow', err)
      toast.error('Unexpected error — please try again')
    } finally {
      if (mountedRef.current) setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold">
          <span className="text-primary">{state === 'Admin' ? 'Admin' : 'Doctor'}</span> Login
        </p>

        <div className="w-full">
          <p>Email</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            disabled={loading}
          />
        </div>

        <div className="w-full">
          <p>Password</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            disabled={loading}
          />
        </div>

        <button
          className="bg-primary text-white w-full py-2 rounded-md text-base flex items-center justify-center"
          disabled={loading}
        >
          {loading ? (
            <>
              <svg className="h-5 w-5 animate-spin mr-2" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>
              Processing...
            </>
          ) : (
            state === 'Sign Up' ? 'Create Account' : 'Login'
          )}
        </button>

        {state === 'Admin' ? (
          <p>
            Doctor Login?{' '}
            <span onClick={() => setState('Doctor')} className="text-primary underline cursor-pointer">
              Click here
            </span>
          </p>
        ) : (
          <p>
            Admin Login?{' '}
            <span onClick={() => setState('Admin')} className="text-primary underline cursor-pointer">
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  )
}

export default Login
