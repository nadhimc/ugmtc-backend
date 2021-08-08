const express = require("express");
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const multer = require("multer")
const { getUsers, postUsers } = require("./src/controllers/users");
const {body} = require("express-validator");
const { login } = require("./src/controllers/auth");

const app = express()
const router = express.Router()

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename:(req, file, cb) => {
        cb(null, new Date().getTime()+ '-'+ file.originalname)
    },
})

const fileFilter = (req, file, cb)=>{
    if(
        file.mimetype === "image/jpg"||
        file.mimetype === "image/jpeg"
    ){
        cb(null,true)
    }else{
        cb(null,false)
    }
}

app.use(multer({storage:fileStorage, fileFilter: fileFilter}).single('image'))

// Routing

// AUTH

// POST LOGIN

router.post('/auth', login)

// USERS

// GET USERS
router.get('/users', getUsers)

// POST USERS
const usersPostValidator = [
     body('nama_tim').not().isEmpty().trim().escape().withMessage("Tidak Boleh Kosong"),
     body('email').isEmail().normalizeEmail().withMessage("Format harus Email"),
     body('password').isStrongPassword({minLength: 8, minLowercase: 0, minUppercase: 0, minNumbers: 1, minSymbols: 0, returnScore: false}).withMessage("Password Kurang Kuat"),
     body('asal').not().isEmpty().trim().escape().withMessage("Tidak Boleh Kosong"),
     body('manager').not().isEmpty().trim().escape().withMessage("Tidak Boleh Kosong"),
     body('no_manager').isMobilePhone("id-ID").withMessage("Format harus No HP"),
]

router.post('/users', usersPostValidator , postUsers)

// 




// Settingan Express


// app.use(bodyParser.urlencoded({
//   extended: true
// }));

app.use(bodyParser.json())

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})

app.use('/api', router)

app.use((error, req, res, next)=>{
    const status = error.errorStatus || 500
    const message = error.message
    const data = error.data
    res.status(status).json({message: message, data: data})
})

mongoose.connect("mongodb+srv://ugmtc:ugmtc@cluster0.esefz.mongodb.net/ugmtcExpress?retryWrites=true&w=majority", { useNewUrlParser: true,useUnifiedTopology: true })
.then(
    ()=>{
        console.log("Server di port ",process.env.SERVER_PORT?process.env.SERVER_PORT:4000)
        app.listen(process.env.SERVER_PORT?process.env.SERVER_PORT:4000)
    }
).catch(
    (err)=>{
        console.log("error",err)
    }
)