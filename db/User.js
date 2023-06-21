const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    title: String,
    note: String,
    
    
})

module.exports = mongoose.model("note",userSchema)

