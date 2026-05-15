import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const CreatePost = () => {

  const navigate = useNavigate()

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  // Protect Route

  useEffect(() => {

    const token = localStorage.getItem("token")

    if (!token) {
      navigate("/login")
    }

  }, [navigate])

  // Submit Blog

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      await axios.post(
        "https://blog-8lfj.onrender.com/api/posts",
        {
          title,
          content
        },
        {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        }
      )

      navigate("/")

    } catch (err) {

      alert("Something went wrong")

    }

  }

  return (

    <div className="min-h-screen bg-[#0f172a] flex justify-center items-center relative overflow-hidden px-4">

      {/* Background Glow */}

      <div className="absolute w-96 h-96 bg-pink-500 rounded-full blur-[140px] opacity-20 top-10 left-10"></div>

      <div className="absolute w-96 h-96 bg-violet-600 rounded-full blur-[140px] opacity-20 bottom-10 right-10"></div>

      {/* Form */}

      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-white/10 backdrop-blur-2xl border border-white/10 p-10 rounded-3xl shadow-2xl w-full max-w-2xl"
      >

        <h1 className="text-5xl font-black mb-8 bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
          Create Blog
        </h1>

        {/* Title */}

        <div className="mb-6">

          <label className="text-gray-300 text-sm">
            Blog Title
          </label>

          <input
            type="text"
            placeholder="Enter blog title..."
            className="w-full mt-2 bg-[#1e293b] border border-gray-700 text-white p-4 rounded-2xl outline-none focus:border-pink-500 duration-300"
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />

        </div>

        {/* Content */}

        <div className="mb-8">

          <label className="text-gray-300 text-sm">
            Blog Content
          </label>

          <textarea
            rows="10"
            placeholder="Write your story..."
            className="w-full mt-2 bg-[#1e293b] border border-gray-700 text-white p-4 rounded-2xl outline-none focus:border-pink-500 duration-300 resize-none"
            onChange={(e) =>
              setContent(e.target.value)
            }
          />

        </div>

        {/* Button */}

        <button
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-violet-600 text-white font-bold hover:scale-105 duration-300 shadow-lg shadow-pink-500/20"
        >
          Publish Blog 🚀
        </button>

      </form>

    </div>

  )

}

export default CreatePost