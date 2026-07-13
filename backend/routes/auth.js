const express=require("express");
const {Register,
    loginUser,
    forgotPassword,
    updateName}=require("../controllers/authController");
    const authMiddleware=require("../middleware/authMiddleware");
const router=express.Router();

router.post("/register",Register);
router.get("/login",loginUser);
router.put("/forgot-password", forgotPassword);
router.put("/update-name", authMiddleware,updateName);


module.exports=router;
