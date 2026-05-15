const router = require("express").Router()
const fs = require("fs")
const { v4: uuid } = require("uuid")

const auth = require("../middleware/auth")

const dbPath = "./data/db.json"

router.get("/", (req, res) => {

  const db = JSON.parse(
    fs.readFileSync(dbPath)
  )

  res.json(db.posts)

})

router.post("/", auth, (req, res) => {

  const db = JSON.parse(
    fs.readFileSync(dbPath)
  )

  const newPost = {
    id: uuid(),
    title: req.body.title,
    content: req.body.content,
    author: req.user.name,
    userId: req.user.id,
    createdAt: new Date()
  }

  db.posts.unshift(newPost)

  fs.writeFileSync(
    dbPath,
    JSON.stringify(db, null, 2)
  )

  res.json(newPost)

})

router.delete("/:id", auth, (req, res) => {

  const db = JSON.parse(
    fs.readFileSync(dbPath)
  )

  db.posts = db.posts.filter(
    post => post.id !== req.params.id
  )

  fs.writeFileSync(
    dbPath,
    JSON.stringify(db, null, 2)
  )

  res.json({
    msg: "Post Deleted"
  })

})

module.exports = router