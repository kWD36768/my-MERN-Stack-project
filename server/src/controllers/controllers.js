
//admin controllers
const { login, registeradmin, readadmin, updateadmin, generatgeotandupdateemail } = require("./admin_panel/admin/adminController");


// colors controllers

const { addcolors, readcolors, deletecolor, changestatus, deleteallcolors, readcolorbyid, updatecolor, truecolors } = require("./admin_panel/colors/colorcontrollers");

// parent category controllers
const { addparentcategory, readparentcategory, deleteparentcategory, updatestatus, deletemultiparentcategories, readparentcategorybyid, handleupdatecategory, searchparentcategory, trueparentcategory } = require("./admin_panel/parentcategory/parentcategory");

// product category controller
const { productcategycontroller, readproductcategory, productcategorybyparentcategory } = require("./admin_panel/productcategory/productcategorycontroller");

// size controllers
const { addsize, readsizecontroller, handledeletesize, handlesizestatus, deleteallsize, readsizebyid, updatesize, searchsizebyid } = require("./admin_panel/parentcategory/size/sizecontroller");
const { insertproduct, readproduct } = require("./admin_panel/product/product");
const { generateotp, registerotp, loginuser } = require("./website/user/usercontrollers");
const cartcontroller = require("./website/cart/cart");
const webreadproduct = require("./website/products/prouct");




module.exports = {
    login ,
    registeradmin,
    addcolors ,
    addparentcategory,
    addsize,
    readparentcategory,
    deleteparentcategory,
    readsizecontroller,
    readcolors,
    handledeletesize,
   deletecolor,
   updatestatus,
   handlesizestatus,
   changestatus,
   deletemultiparentcategories,
   deleteallcolors,
   deleteallsize,
   readparentcategorybyid,
   handleupdatecategory,
   readcolorbyid,
   readsizebyid,
   updatesize,
   updatecolor,
   searchparentcategory,
   searchsizebyid,
   trueparentcategory,
   productcategycontroller,
   readproductcategory,
   readadmin,
   updateadmin,
   generatgeotandupdateemail,
   productcategorybyparentcategory,
   truecolors,
   insertproduct,
   readproduct,
   generateotp,
   registerotp,
   loginuser ,
   cartcontroller ,
   webreadproduct,
}
