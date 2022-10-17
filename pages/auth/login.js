import React from 'react'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'

import { AiFillFacebook } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'

const Login = () => {
  const [data, setData] = useState({
    staffId: '',
    password: '',
  })
  const [error, setError] = useState('')
  const router = useRouter()

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await signIn('credentials', {
      // ...data,
      staffId: data.staffId,
      password: data.password,
      redirect: false,
    })
    if (result.error) {
      setError(result.error)
    } else {
      router.push(router.query.redirect || '/dashboard/admin')
    }
    console.log(result)
  }

  return (
    <div className="min-h-screen flex bg-white/5 justify-center items-center  ">
      <div className="md:w-1/3 bg-white  p-4 rounded-lg shadow-2xl  outline outline-violet-200 shadow-violet-400 ">
        <h1 className="text-orange-500 text-3xl  items-center justify-center flex  font-bold mb-4">
          Sign In
        </h1>
        {error && <p className="text-red-500 ">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div className="flex justify-center mt-4">
            <p className="border cursor-pointer shadow-lg hover:shadow-xl px-6 py-2 relative flex items-center">
              <AiFillFacebook className="mr-2" /> Facebook
            </p>
            <p className="border cursor-pointer shadow-lg hover:shadow-xl px-6 py-2 relative flex items-center">
              <FcGoogle className="mr-2" /> Google
            </p>
          </div>

          <div className="flex flex-col mb-4 mt-9">
            <label htmlFor="staffId" className="font-semibold text-violet-600">
              Staff ID
            </label>
            <input
              type="text"
              name="staffId"
              id="staffId"
              className="text-gray-600 rounded-lg px-2 py-1 outline-none bg-slate-200"
              placeholder="DEMAK1234"
              value={data.staffId}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col mb-4 mt-9">
            <label htmlFor="password" className="font-semibold text-violet-600">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="*******"
              className="text-gray-600 rounded-lg px-2 py-1 outline-none bg-slate-200"
              value={data.password}
              onChange={handleChange}
            />
          </div>
          <button className="primary-button w-full text-white" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
