const { validationResult } = require("express-validator")
const SpeedKicks = require("../models/speedkick")
const Tokens = require ("../models/token")

exports.postSpeedKick = (req,res,next)=>{
    console.log(`${req.method} ${req.originalUrl}`);

    Tokens.findById(req.query.token)
    .then((hasilfind)=>{
        if(hasilfind!==null){

            const errors = validationResult(req)
            if(!errors.isEmpty()){
                const err = new Error("invalid value")
                err.errorStatus = 400
                err.data = errors.array()
                throw err
            }

            // cek file
            if(!req.file){
                const err = new Error("Image harus diupload")
                err.errorStatus = 400
                err.data = {"image" :"Gambar harus diupload dengan format jpg, jpeg, atau png"}
                throw err
            }

            const image = req.file.path

            const successjson = {
                message: "Pendaftaran Speed Kick berhasil",
                data: {
                    user_id: hasilfind.user_id,
                    nama: req.body.nama,
                    tgl_lahir: req.body.tgl_lahir,
                    jk: req.body.jk,
                    berat: req.body.berat,
                    sabuk: req.body.sabuk,
                    kelas: req.body.kelas,
                    foto: image,
                    youtube: req.body.youtube,
                }
            }
            const speedkick = new SpeedKicks(successjson.data)
            speedkick.save()
            .then(
                ()=>{
                    res.status(200).json(successjson)
                }
            ).catch(
                (err)=>{
                    next(err)
                }
            )
        }else{
            const err = new Error("Token Salah")
            err.errorStatus = 400
            err.data = {"Token":"Token Salah"}
            throw err
        }
    })
    .catch(
        (error)=>{
            console.log("lohkok")
            const err = new Error("Token Salah")
            err.errorStatus = 400
            err.data = {"Token":"Token Salah"}
            next(error)
    })

}