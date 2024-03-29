let user = require('../Models/userModel');
let bcrypt =  require('bcrypt');
let jwt = require('jsonwebtoken');



const userSignUp = async (req, res) => {
    
    try{

        let {email,name,phoneNo,password}= req.body;
        if(!email || !name || !phoneNo || !password){
            return res.status(400).send({status:false, message:"please provide email,name,phoneNo,password"});

        }
        console.log(phoneNo)
        //check if user already exist

        let user_find = await user.findOne({
            $or: [{ email: email },{phoneNo:phoneNo}],
          });
          if (user_find) {
            if (user_find.email === email)
              return res
                .status(400)
                .send({ status: false, message: `${email} is already in  use` });
            if (user_find.phoneNo === phoneNo)
              return res
                .status(400)
                .send({ status: false, message: `${phoneNo} already in use` });
           
          }
     //hashing password

     const  hash_password = await bcrypt.hash(password,10);
     password = hash_password;
     const newUser={
        name,
        email,
        password,
        phoneNo
     }

     await user.create(newUser);
     res.status(201).send({status:true,message:"user created  successfully"})


    }catch(error){
        return  res.status(500).send({status:false ,message:error.message})
    }
}

const userLogin = async (req,res)=>{
    try{

        let {email,password} = req.body;

        if(!email  || !password){
            return res.status(400).send({status:false,message:"Provide all the necessary details"})
        }
        
        let find_user = await user.findOne({email:email}).select({password:1,_id:1});
        if(!find_user){
            return res.status(400).send({status:false,message :"User not find"})
            
        }
        let checkPassword = await bcrypt.compare(password,find_user.password);
       
        if(!checkPassword){
            return res.status(400).send({status:false,message:"Please provide correct details"})
        }
        let token = jwt.sign({userId:find_user._id},process.env.secret_key,{expiresIn:'1d'});

        return res.status(200).send({status:true,message:"login successfully",data:token})

    }catch(error){
         return res.status(500).send({status:false,message:error.message})
    }
}

module.exports = {userSignUp,userLogin};


                                                                     



