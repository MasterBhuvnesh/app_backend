const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel =require('./models/Users')
const app = express()
app.use(cors())
app.use(express.json())

// URL 
mongoose.connect("mongodb+srv://bhuvneshverma:Verma29042005@collage.lkkh7mp.mongodb.net/collage")

// GET ALL USER DATA
app.get('/',(req,res)=>{
    UserModel.find({}).sort({name:1})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

// GET SPECFIC USER DATA
app.get('/getUser/:id',(req,res)=>{
    const id = req.params.id;
    UserModel.findById({_id:id})
    .then(users => res.json(users))
    .catch(err => json(err))
})

// CREATE A DOCUMENT IN COLLECTION
app.post("/createUser",(req,res) => {
    UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

// UPDATE THE DOCUMENT
app.put('/User/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndUpdate({_id:id},{
      name: req.body.name,
      date: req.body.date
    })
      .then(users => res.json(users))
      .catch(err => res.json(err))
  })

// DELETE THE DOCUMENT 
app.delete('/deleteUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndDelete({_id:id})
      .then(users => res.json(users))
      .catch(err => res.json(err))
  })

// RUN THE SERVER 
app.listen(3001,()=>{
    console.log("server is Running")
})