// const express = require('express')
// const mongoose = require('mongoose')
// const cors = require('cors')
// const UserModel =require('./models/Users')
// const app = express()
// app.use(cors())
// app.use(express.json())

// // URL 
// mongoose.connect("mongodb+srv://bhuvneshverma:Verma29042005@collage.lkkh7mp.mongodb.net/collage")

// // GET ALL USER DATA
// app.get('/',(req,res)=>{
//     UserModel.find({}).sort({name:1})
//     .then(users => res.json(users))
//     .catch(err => res.json(err))
// })

// // GET SPECFIC USER DATA
// app.get('/getUser/:id',(req,res)=>{
//     const id = req.params.id;
//     UserModel.findById({_id:id})
//     .then(users => res.json(users))
//     .catch(err => json(err))
// })

// // CREATE A DOCUMENT IN COLLECTION
// app.post("/createUser",(req,res) => {
//     UserModel.create(req.body)
//     .then(users => res.json(users))
//     .catch(err => res.json(err))
// })

// // UPDATE THE DOCUMENT
// app.put('/User/:id', (req, res) => {
//     const id = req.params.id;
//     UserModel.findByIdAndUpdate({_id:id},{
//       name: req.body.name,
//       date: req.body.date
//     })
//       .then(users => res.json(users))
//       .catch(err => res.json(err))
//   })

// // DELETE THE DOCUMENT 
// app.delete('/deleteUser/:id', (req, res) => {
//     const id = req.params.id;
//     UserModel.findByIdAndDelete({_id:id})
//       .then(users => res.json(users))
//       .catch(err => res.json(err))
//   })

// // RUN THE SERVER 
// app.listen(3001,()=>{
//     console.log("server is Running")
// })
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/Users');
const app = express();

// Middleware
// app.use(cors());
app.use(
  cors({
    origin:[ "http://localhost:5173", "https://app-frontend-lemon.vercel.app"]// Allow requests from localhost:5173
    credentials: true, // Allow credentials
  })
);
app.use(express.json());

// Database connection
mongoose.connect("mongodb+srv://bhuvneshverma:Verma29042005@collage.lkkh7mp.mongodb.net/collage");

// Routes

// GET ALL USER DATA
app.get('/', (req, res) => {
    UserModel.find({})
        .sort({ name: 1 })
        .then(users => res.json(users))
        .catch(err => res.status(500).json({ error: err.message }));
});

// GET SPECIFIC USER DATA
app.get('/getUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findById(id)
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json(user);
        })
        .catch(err => res.status(500).json({ error: err.message }));
});

// CREATE A DOCUMENT IN COLLECTION
app.post("/createUser", async (req, res) => {
    try {
        const newUser = await UserModel.create(req.body); // Create the user
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// UPDATE THE DOCUMENT
app.put('/User/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const updatedUser = await UserModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE THE DOCUMENT 
app.delete('/deleteUser/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const deletedUser = await UserModel.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(deletedUser);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// RUN THE SERVER 
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
