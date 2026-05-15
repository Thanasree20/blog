import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

const Home = () => {

  const [posts, setPosts] = useState([])

  const user = JSON.parse(
    localStorage.getItem("user")
  )

  useEffect(() => {

    axios
      .get("https://blog-8lfj.onrender.com/api/posts")
      .then((res) => setPosts(res.data))

  }, [])

  return (

    <div className="min-h-screen bg-[#0f172a] text-white">

      {/* Navbar */}

      <nav className="flex justify-between items-center px-10 py-6 border-b border-gray-800 backdrop-blur-lg sticky top-0 bg-[#0f172ad9] z-50">

        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
          BlogSphere
        </h1>

        <div className="flex gap-4 items-center">

          {
            user && (

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex items-center justify-center font-bold">

                  {user.name.charAt(0)}

                </div>

                <span className="font-semibold">
                  {user.name}
                </span>

              </div>

            )
          }

          <Link
            to="/create"
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-violet-600 hover:scale-105 duration-300 shadow-lg"
          >
            Create Post
          </Link>

          {

            user ? (

              <button

                onClick={() => {

                  localStorage.removeItem("token")
                  localStorage.removeItem("user")

                  window.location.reload()

                }}

                className="px-5 py-2 rounded-xl border border-red-500 hover:bg-red-500 duration-300"
              >

                Logout

              </button>

            ) : (

              <Link
                to="/login"
                className="px-5 py-2 rounded-xl border border-gray-600 hover:bg-white hover:text-black duration-300"
              >
                Login
              </Link>

            )

          }

        </div>

      </nav>

      {/* Hero Section */}

      <section className="max-w-7xl mx-auto px-8 py-20 grid md:grid-cols-2 gap-10 items-center">

        <div>

          <h1 className="text-6xl font-black leading-tight mb-6">

            Share Your
            <span className="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
              {" "}Ideas
            </span>

            <br />

            With The World

          </h1>

          <p className="text-gray-400 text-lg leading-8 mb-8">

            Create stunning blogs, engage with readers,
            and build your own professional writing platform.

          </p>

          <div className="flex gap-5">

            <Link
              to="/create"
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-violet-600 font-semibold hover:scale-105 duration-300"
            >
              Start Writing
            </Link>

            <button className="px-8 py-4 rounded-2xl border border-gray-600 hover:bg-white hover:text-black duration-300">
              Explore Blogs
            </button>

          </div>

        </div>

        {/* Hero Image */}

        <div className="relative">

          <div className="absolute w-72 h-72 bg-pink-500 rounded-full blur-[120px] opacity-30 top-0 left-10"></div>

          <div className="absolute w-72 h-72 bg-violet-500 rounded-full blur-[120px] opacity-30 bottom-0 right-10"></div>

          <img
            src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1200&auto=format&fit=crop"
            alt=""
            className="rounded-3xl shadow-2xl relative z-10"
          />

        </div>

      </section>

      {/* Blog Section */}

      <section className="max-w-7xl mx-auto px-8 pb-20">

        <div className="flex justify-between items-center mb-12">

          <div>

            <h2 className="text-4xl font-bold mb-2">
              Latest Blogs
            </h2>

            <p className="text-gray-400">
              Read trending stories from creators
            </p>

          </div>

        </div>

        {

          posts.length === 0 ? (

            <div className="text-center py-20">

              <h2 className="text-3xl font-bold mb-4">
                No Blogs Yet 🚀
              </h2>

              <p className="text-gray-400 mb-8">
                Create your first blog post now.
              </p>

              <Link
                to="/create"
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-violet-600"
              >
                Create Blog
              </Link>

            </div>

          ) : (

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

              {

                posts.map((post) => (

                  <div
                    key={post.id}
                    className="group bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden hover:-translate-y-3 hover:shadow-2xl hover:shadow-pink-500/20 duration-500"
                  >

                    <img
                      src={`https://picsum.photos/500/300?random=${post.id}`}
                      alt=""
                      className="h-52 w-full object-cover group-hover:scale-110 duration-500"
                    />

                    <div className="p-6">

                      <div className="flex items-center gap-3 mb-4">

                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex items-center justify-center font-bold">

                          {post.author?.charAt(0)}

                        </div>

                        <div>

                          <h4 className="font-semibold">
                            {post.author}
                          </h4>

                          <p className="text-sm text-gray-400">
                            Blogger
                          </p>

                        </div>

                      </div>

                      <h2 className="text-2xl font-bold mb-4 line-clamp-2">
                        {post.title}
                      </h2>

                      <p className="text-gray-400 mb-6 line-clamp-3">
                        {post.content}
                      </p>

                      <div className="flex justify-between items-center">

                        <button className="text-pink-400 hover:text-pink-300 font-semibold">
                          Read More →
                        </button>

                        <div className="flex gap-4 text-gray-400">

                          <span>❤️ 24</span>
                          <span>💬 8</span>

                        </div>

                      </div>

                    </div>

                  </div>

                ))

              }

            </div>

          )

        }

      </section>

    </div>

  )

}

export default Home