const express  = require('express');
const { addparentcategory, readparentcategory, deleteparentcategory, updatestatus, deletemultiparentcategories, readparentcategorybyid, handleupdatecategory, searchparentcategory, trueparentcategory } = require('../../controllers/controllers');


const parentcategoryrouter = express.Router();

parentcategoryrouter.post('/addcategory' , addparentcategory)

parentcategoryrouter.get('/readparentcategory' , readparentcategory )

parentcategoryrouter.delete('/deleteparentcategory/:id'  , deleteparentcategory)

parentcategoryrouter.put('/updatestatus/:id' , updatestatus)


parentcategoryrouter.put('/deletecategories' , deletemultiparentcategories)

  
parentcategoryrouter.get('/readparentcategorybyid/:_id' ,  readparentcategorybyid )


parentcategoryrouter.put('/handleupdatecategory/:_id' , handleupdatecategory)


parentcategoryrouter.get('/searchparentcategory/:key' , searchparentcategory)


parentcategoryrouter.get('/trueparentcategory' , trueparentcategory)

module.exports = parentcategoryrouter; 