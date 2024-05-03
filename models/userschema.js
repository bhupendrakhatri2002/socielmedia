const mongoose =require("mongoose")
const plm=require("passport-local-mongoose")

const userSchema = new mongoose.Schema(
    {
    name:{
        type:String,
        trim:true,
        required:[true,"name is required"],
        minlength:[4,"name must be atleast 4 character long"]
    },
    username:{
        type:String,
        trim:true,
        unique:true,
        required:[true,"username is required"],
    minlength:[4,"username must be atleast 4 character long"]
    },
    email:{
        type:String,
        trim:true,
        lowercase:true,
        required:[true,"name is required"],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please fill a valid email address",
        ],
    },

    password:String,
},
{ timestamps: true }
);


userSchema.plugin(plm);

const User =mongoose.model("User",userSchema);
module.exports=User;
