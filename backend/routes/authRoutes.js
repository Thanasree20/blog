const router = require("express").Router()
const fs = require("fs")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { v4: uuid } = require("uuid")

const dbPath = "./data/db.json"

router.post("/register", async (req, res) => {

  const { name, email, password } = req.body

  const db = JSON.parse(fs.readFileSync(dbPath))

  const userExists = db.users.find(
    user => user.email === email
  )

  if (userExists) {
    return res.json({
      msg: "User already exists"
    })
  }

  const hashed = await bcrypt.hash(password, 10)

  const newUser = {
    id: uuid(),
    name,
    email,
    password: hashed
  }

  db.users.push(newUser)

  fs.writeFileSync(
    dbPath,
    JSON.stringify(db, null, 2)
  )

  res.json({
    msg: "Registered Successfully"
  })

})

router.post("/login", async (req, res) => {

  const { email, password } = req.body

  const db = JSON.parse(fs.readFileSync(dbPath))

  const user = db.users.find(
    user => user.email === email
  )

  if (!user) {
    return res.json({
      msg: "User Not Found"
    })
  }

  const isMatch = await bcrypt.compare(
    password,
    user.password
  )

  if (!isMatch) {
    return res.json({
      msg: "Wrong Password"
    })
  }

  const token = jwt.sign(
    {
      id: user.id,
      name: user.name
    },
    "secret123"
  )

  res.json({
    token,
    user
  })

})

module.exports = router