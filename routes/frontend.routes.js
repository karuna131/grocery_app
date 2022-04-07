require("dotenv").config();
const express=require('express');
const router=express.Router();
const auth=require("../routes/auth")
const {  signup, login, Signout, updateUser } = require("../controller/frontend/user.controller");
const { forgotpassword, varifyOtp, setPassword } = require("../controller/frontend/forgotPass");
const { addcart, showCart,remove, updateQuantity, add_cart} = require("../controller/frontend/cart.controller");
const { list, categorybyId } = require("../controller/frontend/category.controller");
const { listOfProduct, by_productId, byCategoryId, /* DetailsbyId */ } = require("../controller/frontend/product.controller");


// api for users
router.post('/signup',signup)
router.post('/login',login)
router.put("/update-user/:id",auth,updateUser)
router.get("/logout",Signout)

// api for password 
router.post("/forgot-password",auth,forgotpassword)
router.post("/varifyOtp",auth,varifyOtp)
router.post("/resetPassword",auth,setPassword)

// api for category
router.get("/allCategory",list)
router.post("/category-byId",categorybyId)


// api for product
router.get("/product-list",listOfProduct)
router.post("/product-byId",by_productId)
router.post("/product/by-categoryId",byCategoryId)
// router.post("/product/details",DetailsbyId)

// api for cart
router.post("/addCart",addcart)
router.get("/showCart",showCart)
router.post('/remove-item',remove)
router.put("/update-quantity",updateQuantity)

router.post('/product-addtocart', add_cart)

module.exports=router