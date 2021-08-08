const { validationResult } = require("express-validator")
const Users = require("../models/users")
const bcrypt = require('bcrypt');
const salt = "$2b$10$V6wYroprLiL6bY/QclY7k."

exports.getUsers = (req,res,next)=>{
    Users.find()
    .then(result=>{
        res.status(200).json({
            message: "sukses",
            data: result.map((item)=>{
            return({
                nama_tim: item.nama_tim,
                email: item.email,
                asal: item.asal,
                manager: item.manager,
                no_manager: item.no_manager,
            })
        })
        })
    })
    .catch(err=>{
        next(err)
    })
}

exports.postUsers = (req,res,next)=>{
    console.log(`${req.method} ${req.originalUrl}`);
    // console.log(salt)

    const errors = validationResult(req)

    if(!errors.isEmpty()){
        const err = new Error("invalid value")
        err.errorStatus = 400
        err.data = errors.array()
        throw err
    }

    const user = new Users({
            nama_tim: req.body.nama_tim,
            password: bcrypt.hashSync(req.body.password, salt),
            email: req.body.email,
            asal: req.body.asal,
            manager: req.body.manager,
            no_manager: req.body.no_manager,
        })

    const result = {
            message: "User Post Success",
            data: {
                nama_tim: req.body.nama_tim,
                email: req.body.email,
                asal: req.body.asal,
                manager: req.body.manager,
                no_manager: req.body.no_manager,
            }
        }
    
    Users.findOne({"email":req.body.email})
    .then((hasil)=>{
        if(hasil!==null){
            const err = new Error("Email sudah terdaftar")
            err.errorStatus = 400
            err.data = {"email":"email sudah terdaftar"}
            throw err
        }else{
            user.save()
            .then(
                ()=>{
                    res.status(200).json(result)
                }
            )
        }
    }
    ).catch((err)=>{
        next(err)
    })
}