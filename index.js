const express=require('express');
const dotenv=require('dotenv');
const cors=require('cors');
dotenv.config();
const authController=require('./routes/user.routes');
const connectDB=require('./config/db');
const app=express();
app.use(express.json());
connectDB();
app.use(cors({
  origin: 'https://connect12.netlify.app', // allow only your frontend
  credentials: true, // if you use cookies or auth headers
}));

app.use('/api/auth',authController);
const PORT=process.env.PORT;
app.listen(PORT,()=>{
    console.log(`application is running on ${PORT}`); 
})
