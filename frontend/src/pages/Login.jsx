import { useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"

const Login = () => {

  const navigate = useNavigate()

  const [form, setForm] = useState({
    email: "",
    password: ""
  })

  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      setLoading(true)

      const res = await axios.post(
        "https://blog-8lfj.onrender.com/api/auth/login",
        form
      )

      localStorage.setItem(
        "token",
        res.data.token
      )

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      )

      navigate("/")

    } catch (err) {

      alert("Invalid Credentials")

    } finally {

      setLoading(false)

    }

  }

  return (

    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center overflow-hidden relative">

      {/* Background Glow */}

      <div className="absolute w-96 h-96 bg-pink-500 rounded-full blur-[140px] opacity-20 top-10 left-10"></div>

      <div className="absolute w-96 h-96 bg-violet-600 rounded-full blur-[140px] opacity-20 bottom-10 right-10"></div>

      {/* Login Card */}

      <div className="w-[420px] bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl p-10 shadow-2xl relative z-10">

        <div className="text-center mb-8">

          <h1 className="text-5xl font-black mb-3 bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
            BlogSphere
          </h1>

          <p className="text-gray-300">
            Welcome back 👋
          </p>

        </div>

        <form onSubmit={handleSubmit}>

          {/* Email */}

          <div className="mb-5">

            <label className="text-gray-300 text-sm">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full mt-2 bg-[#1e293b] border border-gray-700 text-white p-4 rounded-2xl outline-none focus:border-pink-500 duration-300"
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value
                })
              }
            />

          </div>

          {/* Password */}

          <div className="mb-6">

            <label className="text-gray-300 text-sm">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              className="w-full mt-2 bg-[#1e293b] border border-gray-700 text-white p-4 rounded-2xl outline-none focus:border-pink-500 duration-300"
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value
                })
              }
            />

          </div>

          {/* Button */}

          <button
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-violet-600 text-white font-bold hover:scale-105 duration-300 shadow-lg shadow-pink-500/20"
          >

            {
              loading
              ? "Logging in..."
              : "Login"
            }

          </button>

        </form>

        {/* Register */}

        <p className="text-center text-gray-400 mt-8">

          Don't have an account?

          <Link
            to="/register"
            className="text-pink-400 ml-2 hover:text-pink-300"
          >
            Register
          </Link>

        </p>

      </div>

    </div>

  )

}

export default Login