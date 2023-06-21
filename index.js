const express = require('express');
const dbConnection = require('./db/config');
const dotenv = require('dotenv')
const cors = require('cors')
const User = require("./db/User")
const app = express();
app.use(express.json());
dbConnection();
dotenv.config();
app.use(cors());


// posting data in MongoDb
app.post("/addnote",async(req, resp)=>{
    let user = new User(req.body) 
    let result = await user.save();
    resp.send(result)
})

// getting Data from MongoDb

app.get("/notes",async(req, res)=>{
    let uData = await User.find();        
    if(uData.length>0){
        res.send(uData)
    }else{
        res.send({msg: "No record available"})
    }
})

// deleting user by id
app.delete("/notes/:id",async(req,res)=>{    

    let delUser = await User.deleteOne({_id: req.params.id})
    res.send(delUser)

})

// Getting User Data from MongoDb on the basis of Id (dynamic Id)
app.get("/singleNote/:id",async(req,res)=>
{
    let result = await User.findOne({_id: req.params.id})
    res.send(result) 
})

// updating User Data on the basis of Id (params id)

app.put("/noteDetail/:id",async(req,res)=>{
    let result = await User.updateOne(        
            {_id: req.params.id},
            {$set: req.body}                  
    )
    res.send(result)
})

















const PORT = process.env.port || 8000

app.listen(PORT,()=>{
    console.log(`Server started at PORT ${PORT} in ${process.env.App_Mod}`)
})