const mongoose=require('mongoose');

const connectDB=async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/restapi"||process.env.MONGO_URI);
        
        console.log('Connected');
        
    } catch (error) {
        console.log(error);
        
    }
}
module.exports=connectDB;