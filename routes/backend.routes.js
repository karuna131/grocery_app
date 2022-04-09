const express = require('express');
let router = express.Router();

const upload = require('../middleware/upload')
const auth = require('../routes/auth')
const { userSignUp, userLogin } = require('../controller/Backend/user');
const { create_categories, category_update, delete_category } = require('../controller/Backend/categories');
const { create_products, Update_product, delete_products } = require('../controller/Backend/product');
const { vendor_signup, vendor_login } = require('../controller/Backend/vendor');
const { add_vandor, getVendor_data } = require('../controller/Backend/vendor_access');
const { loc } = require('../controller/Backend/location')
const {add_order, get_orderdDetails, getOrder, getOrder_shortDetails } = require('../controller/Backend/order');

/* user APIs */
router.post('/usersignup', userSignUp);
router.post('/userlogin', userLogin);

/* category APIs */
/* upload middleware is used for image */
router.post('/category-add',upload, create_categories);
router.put('/category-edit/:id',upload,  category_update)
router.delete('/category-delete/:id', delete_category)

/* vendor APIs */
router.post('/vendor-signup', vendor_signup);
router.post('/vendor-login', vendor_login)

/* add vendor APIs */
router.post('/vendor-add', add_vandor);
router.get('/vendor-data', getVendor_data)

/* product APIs */
router.post('/product-add', upload, create_products);
router.put('/product-edit/:id', upload, Update_product)
router.post('/product-delete/:id', delete_products)

// location
router.post('/location', loc)


// order
router.post('/order-id',auth,  add_order)
router.get('/order-details', auth, get_orderdDetails)
router.get('/order-get',auth, getOrder);
router.get('/short-orderdetails', auth, getOrder_shortDetails)

module.exports = router;