const mongoose = require('mongoose');
const { registeradmin } = require('../controllers/admin_panel/admin/adminController');


// const url   = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@aizabilal.9tec3wg.mongodb.net/?retryWrites=true&w=majority&appName=${process.env.DB_CLUSTER}`

const url = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.9tec3wg.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;


mongoose.connect(url)
.then(()=>{
    console.log('success connected')
    registeradmin();
})
.catch(err =>console.log(err.message))