const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const keys = require('./keys')
const User = require("./models/User")

//connect mongoose
const mongoose = require('mongoose');
mongoose.connect(keys.mongoDBUrl, {useNewUrlParser: true})
    .then(() => console.log("db connected"));


//auto changes root directory to public for the specified route
app.use(bodyParser.json())
app.use("/", express.static("public"))

app.get("/", (req, res) => {
    res.send("Hello World")
})

//use body for multiple variable sending
app.post("/api", (req, res) => {
    const username = req.body.username
    const message = req.body.message

    const data = {
        username,
        message
    }

    const user = new User(data)
    user.save()
        .then(() => res.send(data))
        .catch(err => console.log(err))

})

app.get("/getallusers", (req, res) => {
    User
    .find()
    .then(results => {
      console.log(results)
      res.send(results)
    })
 }) 


//use params to access a page
app.get("/showprofile/:username", function (req, res) {
    const user = req.params.username;
    console.log(user);
   
    User.find({ username: user })
      .then(result => {
        console.log("Showing", user, "profile:", result)
        res.send(result)
      })
      .catch(err => {
        console.log(err)
        res.send(err)
      })
   })
   

const port = process.env.PORT || 3000
app.listen(port, (error) => {
    if (error) {
        console.log(error)
    }
    console.log("server is online running on port: " + port)
})
