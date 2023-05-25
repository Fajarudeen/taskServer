const mongoose=require('mongoose')

const CONNECTDB=async()=>{
try{
    mongoose.connect("mongodb://localhost:27017/contacts",{
        useNewUrlParser: true,
    }).then((res)=>{
        console.log("mongoose connected successfully");
    })

}catch(err){
    console.log("MongoDb connection error");
}
}

module.exports=CONNECTDB;
