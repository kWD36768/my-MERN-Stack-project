
const express = require('express');
const { addcolors, readcolors, deletecolor, changestatus, deleteallcolors, readcolorbyid, updatecolor, truecolors } = require('../../controllers/controllers');

const colorrouter  = express.Router() ;

colorrouter.post('/addcolors' , addcolors);

colorrouter.get('/readcolors' , readcolors);

colorrouter.delete('/deletecolor/:id' , deletecolor)

colorrouter.put('/changestatus/:id'  , changestatus)

colorrouter.put('/deleteallcolors' , deleteallcolors)

colorrouter.get('/readcolorbyid/:id' , readcolorbyid)

colorrouter.put('/updatecolor/:id' , updatecolor)

colorrouter.get('/activecolors' , truecolors)


module.exports = colorrouter ;

