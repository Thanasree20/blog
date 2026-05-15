const router = require("express").Router()
const fs = require("fs")
const { v4: uuid } = require("uuid")

const auth = require("../middleware/auth")

const dbPath = "./data/db.json"

router.get("/:postId", (req, res) => {

  const db = JSON.parse(
    fs.readFileSync(dbPath)
  )

  const comments = db.comments.filter(
    comment => comment.postId === req.params.postId
  )

  res.json(comments)

})

router.post("/:postId", auth, (req, res) => {

  const db = JSON.parse(
    fs.readFileSync(dbPath)
  )

  const newComment = {
    id: uuid(),
    text: req.body.text,
    postId: req.params.postId,
    user: req.user.name
  }

  db.comments.push(newComment)

  fs.writeFileSync(
    dbPath,
    JSON.stringify(db, null, 2)
  )

  res.json(newComment)

})

module.exports = router