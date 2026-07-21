
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const topay = async (req , res) =>{

    try{
       
        console.log(req.body)
        const lineitems = req.body.data.map((item) =>(
            {
                price_data  :{
                    currency : "pkr" ,
                    product_data : {
                        name : item.product.name
                    } ,  
                    unit_amount : item.product.price  *100
                },
                quantity : item.quantity
            }


        ))

    const customer = await stripe.customers.create({
    name: "bilal khan",
    address: {
        line1: "133 main road",
        line2: "st#123 house no 45",
        city: "karachi",
        state: "sindh",
        country: "PK",   // ✅ fix this too
        postal_code: "42250" // ✅ correct field name
    }
});


const session = await stripe.checkout.sessions.create({
    payment_method_types : ['card'] , 

    line_items : lineitems,

    mode : 'payment' ,
    success_url : "http://localhost:3000/payment-successful",
    cancel_url : "http://localhost:3000/payment-cancelled" ,
    customer : customer.id 

})

// console.log(customer , session )
         res.status(200).json({message : "payment controller is working" , session_id : session.id})
    }
 
    catch(error){
        console.log(error)
        res.status(500).json({message : "Internal Server Error"})
    }
}

module.exports = topay