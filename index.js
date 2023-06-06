import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import employeeRouter from "./route/employee.js"
import home from "./route/home.js"
import userRouter from "./route/user.js"
import hr from "./route/hr.js"



const app = express()
dotenv.config()
const connect=async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connect to mongDB")
    }catch (error){
        throw error;
    }
};
mongoose.connection.on("Disconnected", ()=>{
    console.log("Disconnected")
})

//connection with html
app.set('view engine', 'ejs');
app.use(express.static('public'))
// app.engine('html', exp)
//middlewares
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())

app.use(employeeRouter)
app.use(userRouter)
app.use(hr)
app.use(home)

const PORT = process.env.PORT
app.listen(3000, ()=>{
    connect ()
    console.log(`server running on port ${PORT}`)
});