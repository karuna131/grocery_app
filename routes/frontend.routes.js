require("dotenv").config();
const router=require('express').Router();
const auth=require("../routes/auth")
const vendorAuth=require("../routes/vendore.auth")
const {  signup, login, Signout, updateUser, get_user } = require("../controller/frontend/user.contro");
const { forgotpassword, varifyOtp, setPassword } = require("../controller/frontend/forgotPass.contro");
const {  showCart,remove, updateQuantity, add_cart } = require("../controller/frontend/cart.contro");
const { list, categorybyId, cat_byPro_Id } = require("../controller/frontend/category.contro");
const { listOfProduct, by_productId, byCategoryId, /* DetailsbyId */ } = require("../controller/frontend/product.contro");
const {  shippingAdd, updateAddress } = require("../controller/frontend/shipping_contro");
const { showVendor } = require("../controller/frontend/vendor_product.contro");
const { addProduct } = require("../controller/Backend/vendor");
const { checkout } = require("../controller/Backend/order");
const { addDetails, edit } = require("../controller/frontend/bank.contro");


// api for users
router.post('/signup',signup)
router.post('/login',login)
router.put("/update-user",auth,updateUser)
router.get("/logout",Signout)
router.get('/getUser',auth,get_user)

// api for password 
router.post("/forgot-password",forgotpassword)
router.post("/varifyOtp",varifyOtp)
router.post("/resetPassword",setPassword)

// api for category
router.get("/allCategory",list)
router.post("/category-byId",categorybyId)
router.post("/category-by-productId",cat_byPro_Id)


// api for product
router.get("/product-list",listOfProduct)
router.post("/product-byId",by_productId)
router.post("/product/by-categoryId",byCategoryId)
// router.post("/product/details",DetailsbyId)

// api for cart
router.post('/add_cart', add_cart)
router.get("/showCart",showCart)
router.post('/remove-item',remove)
router.put("/update-quantity",updateQuantity)

// api for shipping
router.post("/add-shipping-Address",auth,shippingAdd)
router.put("/update-shipping-Address",auth,updateAddress)



// vendor product
router.get("/allVendore",vendorAuth,showVendor)
router.post('/addProduct',vendorAuth,addProduct)

router.get("/checkout",auth,checkout)

// bank details
router.post("/add-bank-details",auth,addDetails)
router.put("/edit-details",auth,edit)


module.exports=router