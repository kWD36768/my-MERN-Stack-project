
const express = require('express')
const { addsize, readsizecontroller, handledeletesize, handlesizestatus, deleteallsize, readsizebyid, updatesize, searchsizebyid } = require('../../controllers/controllers')

const sizerouter = express.Router()

sizerouter.post('/addsize' , addsize )

sizerouter.get('/readsize' , readsizecontroller)

sizerouter.delete('/deletesize/:id' , handledeletesize)

sizerouter.put('/updatesize/:id' , handlesizestatus)

sizerouter.put('/deleteallsize'  ,  deleteallsize)

sizerouter.get('/readsizebyid/:id' , readsizebyid)

sizerouter.put('/updatesize/:id' , updatesize)

sizerouter.get('/searchsizebyid/:key' , searchsizebyid)

module.exports = sizerouter ;