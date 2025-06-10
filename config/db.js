const mongoose=require('mongoose');

const connectDB=async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/restapi"||process.env.MONGO_URI);
        
        console.log('Connected');
        
    } catch (error) {
        console.log(error);
        
    }
}
module.exports=connectDB;
