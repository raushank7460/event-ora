const bcryptjs = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");


const Register = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }


        const existUser = await User.findOne({ email });

        if (existUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }


        const hashPassword = await bcryptjs.hash(password, 10);


        const newUser = await User.create({
            name,
            email,
            password: hashPassword,
            role,
        });


        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
            },
        });


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};



const loginUser = async (req, res) => {

    const { email, password } = req.body;

    try {

        if (!email || !password) {
            return res.status(400).json({
                success:false,
                message:"Email and password are required",
            });
        }


        const user = await User.findOne({ email });


        if (!user) {
            return res.status(404).json({
                success:false,
                message:"User not found",
            });
        }


        const isPasswordMatch = await bcryptjs.compare(
            password,
            user.password
        );


        if (!isPasswordMatch) {
            return res.status(401).json({
                success:false,
                message:"Invalid email or password",
            });
        }



        const token = jwt.sign(
            {
                id:user._id,
                role:user.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn:"7d",
            }
        );



        return res.status(200).json({
            success:true,
            message:"Login successfully",
            token,
            user:{
                _id:user._id,
                name:user.name,
                email:user.email,
                role:user.role,
            }
        });



    } catch(error) {

        return res.status(500).json({
            success:false,
            message:error.message,
        });

    }
};






const forgotPassword = async (req, res) => {

    const { email, newPassword } = req.body;

    try {

        if (!email || !newPassword) {
            return res.status(400).json({
                success:false,
                message:"Email and new password are required",
            });
        }


        const user = await User.findOne({ email });


        if (!user) {
            return res.status(404).json({
                success:false,
                message:"User not found",
            });
        }


        const hashPassword = await bcryptjs.hash(
            newPassword,
            10
        );


        user.password = hashPassword;

        await user.save();


        return res.status(200).json({
            success:true,
            message:"Password updated successfully",
        });


    } catch(error){

        return res.status(500).json({
            success:false,
            message:error.message,
        });

    }

};




const updateName = async (req,res)=>{

    const {name}=req.body;

    try{

        if(!name){

            return res.status(400).json({
                success:false,
                message:"Name is required",
            });

        }


        const user = await User.findById(req.user.id);


        if(!user){

            return res.status(404).json({
                success:false,
                message:"User not found",
            });

        }


        user.name=name;

        await user.save();



        return res.status(200).json({
            success:true,
            message:"Name updated successfully",
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                role:user.role,
            }
        });


    }catch(error){

        return res.status(500).json({
            success:false,
            message:error.message,
        });

    }

};


module.exports={
    Register,
    loginUser,
    forgotPassword,
    updateName
};


