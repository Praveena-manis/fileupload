// const mongoose=require('mongoose');

// const connectDB=async () => {
//     try {
//         await mongoose.connect("mongodb://127.0.0.1:27017/restapi"||process.env.MONGO_URI);
        
//         console.log('Connected');
        
//     } catch (error) {
//         console.log(error);
        
//     }
// }
// module.exports=connectDB;

const mongoose=require('mongoose');
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('DB connection error:', error);
    process.exit(1);
  }
};

module.exports=connectDB;
