import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import mongoose from 'mongoose'

const app = express()

const PORT = process.env.PORT || 5000

app.use(express.json())

app.use((err, req, res, next)=>{
  console.error(err.stack)
  res.status(500).json({
    message: 'Something went wrong on our side. Please try again later.'
  })
})

const connectdb = async()=>{
try{
    await mongoose.connect(process.env.MONGO_URI)
    console.log('MongoDB Connected')
    app.listen(PORT, ()=>{
        console.log(`The server is running on PORT ${PORT}`)
    })
}catch(e){
    console.error(e.message)
    process.exit(1)
}
} 

connectdb()