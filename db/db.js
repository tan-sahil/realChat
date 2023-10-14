
const mongoose = require('mongoose');

const connectDB = async () =>{
    try{
        const connec = await mongoose.connect(process.env.MONGO_URI)
        console.log(`the db is coonected to ${connec.connection.host}`)
    }catch(err){
        console.log(err);
        process.exit(1) // process failed
    }
    
}

module.exports = connectDB;