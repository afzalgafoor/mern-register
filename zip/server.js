const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
var apiLock = require('api-concurrency')
const res = require("express/lib/response")

const app = express()
app.use(express.json())
// app.use(express.urlencoded())
app.use(cors())
app.use(apiLock)
// var ObjectId = require('mongodb').ObjectID;



//Schema
const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    role: String,
    password: String
})
// await User.save;

const User = new mongoose.model("User", userSchema)

//Routes
//login 
app.post("/login", (req, res) => {
    const { email, password } = req.body
    User.findOne({ email: email }, (err, user) => {
        if (user) {
            if (password === user.password) {
                res.send({ message: "Login Successfull", user: user })
            } else {
                res.send({ message: "Password didn't match" })
            }
        } else {
            res.send({ message: "User not registered" })
        }
    })
})


//get users
app.get('/users', (req, res) => {
    User.find({ role: { $ne: 'admin' } }).exec((err, users) => {
        // console.log(users)
        if (err) {
            // console.log(users)
            return res.status(400).json({ error: err })

        }
        console.log(users)
        return res.status(200).json

            ({
                success: true,
                existinguser: users
            })

    })
})

app.get('/users/:id', (req, res) => {
    let userId = req.params.id;

    User.findById(userId, (err, users) => {
        if (err) {
            return res.status(400).json({ success: false, err })
        }
        return res.status(200).json
            ({
                success: true,
                users
            })
    })
})

app.get('/users/:firstname', (req, res) => {
    let userName = req.query.firstname;

    User.findByFirstname(userName, (err, users) => {
        if (err) {
            return res.status(400).json({ success: false, err })
        }
        return res.status(200).json
            ({
                success: true,
                users
            })
    })
})



//Show product and homepage
// app.get("/", (req, res) => {

//     User.findOne({}, (err, users) => {
//         res.send("gi")
//         // if (err) {
//         //     console.log(err);
//         // } else {
//         //     res.render("index", { users: users });
//         // }
//         // if (users) {
//         //     res.send("gi")
//         //     res.send({ message: "user success", users: users })
//         //     console.log(users)
//         // } else {
//         //     res.send("gi")
//         //     res.send({ message: "error", err })
//         // }
//     })

// })

//post
app.post("/register", (req, res) => {
    const { firstname, lastname, email, role, password } = req.body
    User.findOne({ email: email }, (err, user) => {
        if (user) {
            res.send({ message: "User already registerd" })
        } else {
            const user = new User({

                firstname,
                lastname,
                email,
                role,
                password
            })
            user.save(err => {
                if (err) {
                    res.send(err)
                } else {
                    res.send({ message: "Successfully Registered, Please login now." })
                }
            })
        }
    })

})
// User.findByIdAndRemove(deleteId, (err, users) => {
// User.findByOneAndDelete({ _id: ObjectID(deleteId) }, (err, users) => {
//delete
app.delete('/users/delete/:id', (req, res) => {
    let deleteId = req.params.id;
    User.findByIdAndRemove(deleteId, (err, users) => {
        if (err) {
            return res.status(400).json({ error: err })
        }
        console.log(users)
        return res.status(200).json
            ({
                success: true,
                existinguser: users
            })
    })
})



// Get Single Student
// app.get('/users/:id' ,(req, res) => {
//     studentSchema.findById(req.params.id, (error, data) => {
//       if (error) {
//         return next(error)
//       } else {
//         res.json(data)
//       }
//     })
//   })

app.get('/users/:id', (req, res) => {
    let userId = req.params.id;

    User.findById(userId, (err, users) => {
        if (err) {
            return res.status(400).json({ success: false, err })
        }
        return res.status(200).json
            ({
                success: true,
                users
            })
    })
})

// Update Student
app.put('/users/:id').put((req, res) => {
    let userId = req.params.id;
    User.findByIdAndUpdate(userId, { $set: req.body, }, (error, users) => {
        if (err) {
            return res.status(400).json({ success: false, err })
        }
        return res.status(200).json
            ({
                success: true,
                users
            })
    })
})




//db
mongoose.connect('mongodb://127.0.0.1:27017/indigo',
    async (err) => {
        if (err) throw err;
        console.log("connected to database")
    }
)

//port
app.listen(9002, () => {
    console.log("Started at port 9002")
    // res.send("Hi")
})
