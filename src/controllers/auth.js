const Tokens = require ("../models/token")
const users = require("../models/users")
const bcrypt = require('bcrypt');
const salt = "$2b$10$V6wYroprLiL6bY/QclY7k."

exports.login = (req,res,next)=>{

    users.findOne({"email":req.body.email})
    .then(hasil=>{
        if(hasil!==null){
            if(bcrypt.compareSync(req.body.password,hasil.password)){
                const token = new Tokens({
                    user_id: hasil._id,
                    expired: (new Date().getTime() + 1000 * 60 * 60 * 24 * 2)
                })
                token.save()
                .then((hslsave)=>{
                    res.status(200).json(hslsave)
                }).catch(err=>{
                    // console.log(err)
                    next(err)
                })
            }else{
                const err = new Error("Password Salah")
                err.errorStatus = 400
                err.data = {"password":"Password Salah"}
                throw err
            }
        }else{
            const err = new Error("Email tidak terdaftar")
            err.errorStatus = 400
            err.data = {"email":"Email tidak terdaftar"}
            throw err
        }
    })
    .catch(
        (err)=>{
            // console.log(err)
            next(err)
        }
    )

}