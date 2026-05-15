const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/auth", require("./routes/authRoutes"))
app.use("/api/posts", require("./routes/postRoutes"))
app.use("/api/comments", require("./routes/commentRoutes"))

app.listen(5000, () => {
  console.log("Server Running on 5000")
})