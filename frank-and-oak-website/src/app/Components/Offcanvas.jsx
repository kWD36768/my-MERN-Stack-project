import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { IoLockClosedOutline } from "react-icons/io5";
import PopularOffcanvasCards from "./PopularOffcanvasCards";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { deleteprodcutfromcart, updateproductquantity } from "../redux/slices/cartslice";
import { loadStripe } from "@stripe/stripe-js";
import  Cookies  from "js-cookie";

const Offcanvas = ({ close }) => {
  const [controlBtn, setControlBtn] = useState(false);
  const [cartdetails, setcartdetails] = useState({ totalQ: 0, totalprice: 0 });
  const cartproducts = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Offcanvas - cartproducts:", cartproducts);
  }, [cartproducts]);






useEffect(() => {

  let totalitems = 0;
  let totalprice = 0;

  cartproducts.forEach((item) => {

    totalitems += item.quantity;



      totalprice += item.quantity * (item.product?.product_price || 0);

  });

  setcartdetails({
    totalQ: totalitems,
    totalprice: totalprice
  });

}, [cartproducts]);
  const handlePrevBtn = () => {
    const box = window.document.querySelector("#box");
    const width = box.clientWidth;
    box.scrollLeft -= width;
    if (box.scrollLeft === 0 || box.scrollLeft < width) setControlBtn(false);
  };
  const handleNextBtn = () => {
    const box = window.document.querySelector("#box");
    const width = box.clientWidth;
    box.scrollLeft += width;
    setControlBtn(true);
  };
const handledeleteproduct = async(e) =>{
console.log( "this new",e.target.value);

axios.delete(`${process.env.NEXT_PUBLIC_URL}/frankandoak/cart/deleteproduct/${e.target.value}`)
.then((response) =>{
  console.log(response) 
       dispatch(deleteprodcutfromcart(e.target.value));


})
.catch((error)=>{
  console.log(error)
}
)




}

const handleupdatequantity = async(e) =>{
 const datafound = cartproducts.filter((cartitem) => cartitem._id === e.target.value);
 
 let newquantity ;
if(e.target.textContent === "+") newquantity = datafound[0].quantity + 1 ;
if(e.target.textContent === "-") newquantity = datafound[0].quantity - 1 ;

 const obj = datafound[0] ;  

 const newobj = {...obj , quantity  : newquantity};

 console.log(newobj)

 axios.put(`${process.env.NEXT_PUBLIC_URL}/frankandoak/cart/quantityupdate/${e.target.value}` , {newquantity})

.then((response) =>{
  console.log(response)
  const index = cartproducts.findIndex((item) => item._id === e.target.value)  ;
    const newarr = [...cartproducts] ;
    newarr.splice(index , 1 , newobj)
dispatch(updateproductquantity(newarr)); 
})
.catch((error)=>{
  console.log(error)
}
)
}


   const handlepurchase = async () =>{

    const user  = JSON.parse(Cookies.get('user_200'))


console.log('user' , user)
    const response = await axios.post(`${process.env.NEXT_PUBLIC_URL}/frankandoak/payment/pay` , {cartproducts} ,
      {headers :{
        // 'content-type' : 'multipart/formData',

        'content-type' : 'application/json' ,
        'Authorization' :`Bearer ${user.auth}`
      }}
    )


console.log(response)

}
  

  return (
    <div className="w-[600px] h-[100vh] absolute right-0 top-0 bg-white">
   
      <span className="block h-[40px] px-[10px] bg-[#f9f9f9]">
        <FaArrowLeft
          className="inline-block cursor-pointer mr-[20px] h-full text-[12px] font-thin"
          onClick={() => close(false)}
        />
        <span className="text-[14px]">Continue Shopping</span>
      </span>
      <span className="block bg-black text-white text-center text-[12px] h-[30px] py-[5px] box-border font-[500]">
        Free shipping on orders $99+ and free returns
      </span>

    
<div className="h-[65vh] overflow-y-auto px-2">
  {cartproducts.map((product) => (
    <div key={product._id} className="border-b py-3">
      <div className="grid grid-cols-[80px_1fr_90px_100px] gap-3 items-start">

        <div>
          <Image
            src={product.product.product_image}
            alt={product.name}
            width={70}
            height={70}
            className="w-[70px] h-[70px] object-cover"
          />
        </div>

        {/* Product Name */}
        <div>
          <h2 className="text-[15px] text-[#303640] leading-6">
            {product.product.product_name}
          </h2>
        </div>

        <div>
          <p className="text-[15px] font-medium">
            Rs. {product.product.product_price}
          </p>
        </div>

        <div className="flex flex-col items-center">

          <div className="flex items-center border">

            <button
              value={product._id}
              onClick={handleupdatequantity}
              disabled={product.quantity === 1}
              className="px-2 py-1"
            >
              -
            </button>

            <span className="px-3">
              {product.quantity}
            </span>

            <button
              value={product._id}
              onClick={handleupdatequantity}
              className="px-2 py-1"
            >
              +
            </button>

          </div>

          <button
            value={product._id}
            onClick={handledeleteproduct}
            className="mt-2 text-black hover:text-red-500"
          >
            Delete
          </button>

        </div>

      </div>
    </div>
  ))}
</div>
      <div className="w-[90%] absolute bottom-[10px] left-[50%] translate-x-[-50%] ">
        <div className="w-full bg-[#f9f9f9] h-[40px] flex items-center justify-between mb-[10px] px-[10px]">
          <span>
          Subtotal <span className="text-[#7c7c7c]">{cartdetails.totalQ}</span>
          </span>
          <span>{cartdetails.totalprice}</span>
        </div>
        <button className="flex gap-[20px] items-center justify-center text-white text-[20px] w-full h-[60px] cursor-pointer bg-[#7c7c7c] ">
          <span onClick={handlepurchase}> Secure Checkout</span>
          <IoLockClosedOutline className="inline-block" />
        </button>
      </div>
    </div>
  );
};

export default Offcanvas;
