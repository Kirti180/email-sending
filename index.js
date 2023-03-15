const express=require("express")
const session =require("express-session")
const nodemailer=require("nodemailer")
const app=express()
app.use(express.json())
require("dotenv").config()
app.use(session({
    secret:process.env.session
}))
app.get("/createotp",(req,res)=>{
    const transporter=nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:"kirti1872001@gmail.com",
            pass:process.env.pass
        }
    })
    let otp=Math.floor(Math.random()*10000)
    transporter.sendMail({
        to:"kirti1872001@gmail.com",
        from:"kirti1872001@gmail.com",
        subject:"otp verification",
        text:`your otp is ${otp}`

    }).then((result)=>{
        console.log(result)
        req.session.otp=otp
        res.send({msg:"mail sent"})
    }).catch((err)=>{
        console.log(err.message)
    })
})


app.get("/verify",(req,res)=>{
    if(req.session.otp==req.body.otp){
        res.send("login successfull")
    }
    console.log(req.session)
    res.send("otp")
})

app.listen(8080)