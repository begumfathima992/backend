const USER = require('../models/User');

exports.index = (req,res) => {
    res.json({message:"Welcome to UsersDB"});
}

exports.regsiter = (req,res) => {
    const {username,password,email,contact} = req.body;

    const newUser = USER({
        username,
        password,
        email,
        contact
    });

    USER.findOne({email:email})    
    .then(user => {
        if(user) {
            return res.json({message:"User already exits !"})
        } else {
            newUser.save().then(()=> res.json({message:"User Created !"}))
            .catch(err => res.json({error:err.toString()}))
        }
    }).catch(err => res.json({error:err.toString()}))
}

exports.users = (req,res)=> {
     USER.find().then(users => res.json({data:users}))
     .catch(err => res.json({error:err.toString()}))

}

exports.user = (req,res) => {
    const {email} = req.body;

    USER.findOne({email:email})
    .then(user => {
        if(user) {
            res.json({data:user})
        } else {
            res.json({message:"User not found !"})
        }
    })
    .catch(err => res.json({error:err.toString()}))
}

exports.delete = (req,res)=> {
    const {email} = req.body;

    USER.deleteOne({email:email})
    .then(() => res.json({message:"User Deleted !"}))
    .catch(() => res.json({error:err.toString()}))
}

exports.update = (req,res)=> {
    const {username,password,email,contact} = req.body;
    const updateUser = {
        username,
        password,
        email,
        contact
    }
    
 USER.findOne({email:email}).then(user => {
     if(user) {
        USER.updateOne({email: email}, {$set:{...updateUser}})
        .then(() => res.json({message:"User updated !"}))
        .catch((err) => res.json({error:err.toString()}))
     } else {
         res.json({message:"User couldn't find !"});
     }
 })
}