import axios, { toFormData } from "axios";
import React, { useEffect, useState } from "react";
import { json } from "react-router-dom";

const AddProduct = () => {
  const [addparentcategory, setaddparentcategory] = useState([]);

  const [parentcategory, setparentcategory] = useState("");
  const [productcategory, setproductcategory] = useState([]);
  const [colors , setcolors] = useState([]);
  const [sizes , setsizes] = useState([]);
  const [productImgPreview, setProductImgPreview] = useState("");
const [animationPreview, setAnimationPreview] = useState("");
const [galleryPreview, setGalleryPreview] = useState("");
  const [checksizes , setchecksizes]  = useState([]);
  const [checkcolors  , setcheckcolors ]  = useState([]);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/adminpanel/parentcategory/trueparentcategory`
      )

      .then((response) => {
        setaddparentcategory(response.data.data);

        // console.log(response.data.data);
      })

      .catch((error) => {
        alert("something went wrong");
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (!parentcategory) return;

    axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/adminpanel/productcategory/productcategorybyparentcategory/${parentcategory}`,
      )

      .then((response) => {
         setproductcategory(response.data.data)

        // console.log(response.data.data);
      })

      .catch((error) => {
        alert("something went wrong");
        console.log(error);
      });
  }, [parentcategory]);


  useEffect(() =>{
    axios.get(
        `${process.env.REACT_APP_API_URL}/api/adminpanel/colors/activecolors`)

        .then((response) => {
          console.log(response.data.data) ; 

          setcolors(response.data.data)

          

        })

        .catch((error)=>{
          console.log(error)
        })
  }, [])


  useEffect(() =>{
    axios.get(
        `${process.env.REACT_APP_API_URL}/api/adminpanel/size/readsize`)

        .then((response) => {
          console.log(response.data.data) ; 

          setsizes(response.data.data)

          

        })

        .catch((error)=>{
          console.log(error)
        })
  }, []) 
    


const handlePreview = (e, type) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onload = () => {
    if (type === "product") setProductImgPreview(reader.result);
    if (type === "animation") setAnimationPreview(reader.result);
    if (type === "gallery") setGalleryPreview(reader.result);
  };
};
  

const handleinsertproduct = (e) => {
  e.preventDefault();
  

  if (e.target.parent_category.value === 'false')
    return alert('please select a parentcategory');

  const data = new FormData(e.target);

  data.append('colors', JSON.stringify(checkcolors));
  data.append('sizes', JSON.stringify(checksizes));

  axios.post(
    `${process.env.REACT_APP_API_URL}/api/adminpanel/product/insertproduct`,
    data,
   
  )

  .then((response) => {
    console.log(response);
  })

  .catch((error) => {
    console.log(error);
  });
};

  const handlechecksizes = (e)=>{
  
    if(e.target.checked){
      setchecksizes([...checksizes , e.target.value])
    }  

    else{
      setchecksizes((presizes)=>(
        presizes.filter(size => size !== e.target.value )

      ))
    }
  
  }

  const handlecheckcolor = (e)=>{
    if(e.target.checked){
      setcheckcolors([...checkcolors , e.target.value])
    }
    else{
      setcheckcolors((precolors)=>(
        precolors.filter(color  => color !== e.target.value)
      ))
    }
  }

  return(<div className="w-[90%] mx-auto my-[150px] bg-white rounded-[10px] border">
      <span className="block border-b bg-[#f8f8f9] text-[#303640] text-[20px] font-bold p-[8px_16px] h-[40px] rounded-[10px_10px_0_0]">
        Product Details
      </span>
      <div className="w-[90%] mx-auto my-[20px]">
        <form method = "post" onSubmit = {handleinsertproduct}>
          <div className="w-full my-[10px]">
            <label htmlFor="product_name" className="block text-[#303640]">
              Product Name
            </label>
            <input
              type="text"
              id="product_name"
              name="product_name"
              placeholder="Name"
              className="w-full input border p-2 rounded-[5px] my-[10px]"
            />
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="product_desc" className="block text-[#303640]">
              Product Description
            </label>
            <textarea
              id="product_desc"
              name="product_desc"
              placeholder="Description"
              rows={3}
              cols={10}
              className="w-full input border p-2 rounded-[5px] my-[10px]"
            />
          </div>
          <div className="w-full my-[10px]">
            <label
              htmlFor="product_short_desc"
              className="block text-[#303640]"
            >
              Short Description
            </label>
            <textarea
              id="product_short_desc"
              name="product_short_desc"
              placeholder="Short Description"
              rows={2}
              cols={10}
              className="w-full input border p-2 rounded-[5px] my-[10px]"
            />
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="product_img" className="block text-[#303640]">
              Product Image
            </label>
            <input
             onChange={(e) => handlePreview(e, "product")}
              type="file"
              id="product_img"
              name="product_img"
              className="w-full input border rounded-[5px] my-[10px] category"
            />
          </div>

               <div>
            <img src={productImgPreview} alt=""  style = { { width: '100px'}} />
          </div>

          <div className="w-full my-[10px]">
            <label htmlFor="image_animation" className="block text-[#303640]">
              Image Animation
            </label>
            <input
              onChange={(e) => handlePreview(e, "animation")}

              type="file"
              id="image_animation"
              name="image_animation"
             className="w-full input border rounded-[5px] my-[10px] category"

            />
          </div>

                <div>
            <img src={animationPreview} alt=""  style = { { width: '100px'}} />
          </div>

          <div className="w-full my-[10px]">
            <label htmlFor="product_gallery" className="block text-[#303640]">
              Product Gallery
            </label>
            <input
               onChange={(e) => handlePreview(e, "gallery")}galleryPreview

              type="file"
              id="product_gallery"
              name="product_gallery"
                  className="w-full input border rounded-[5px] my-[10px] category"

                  
              
            />
          </div>

          <div>
            <img src={galleryPreview} alt="" style = { { width: '100px'}}  />
          </div>
          <div className="w-full my-[10px] grid grid-cols-[2fr_2fr] gap-[20px]">
            <div>
              <label htmlFor="product_price" className="block text-[#303640]">
                Price
              </label>
              <input
                type="text"
                id="product_price"
                name="product_price"
                placeholder="Product Price"
                className="w-full input border rounded-[5px] my-[10px] p-2"
              />
            </div>
            <div>
              <label htmlFor="product_mrp" className="block text-[#303640]">
                MRP
              </label>
              <input
                type="text"
                id="product_mrp"
                name="product_mrp"
                placeholder="Product MRP"
                className="w-full input border rounded-[5px] my-[10px] p-2"
              />
            </div>
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="parent_category" className="block text-[#303640]">
              Select Parent Category
            </label>
            <select
              id="parent_category"
              name="parent_category"
              className="w-full input border p-2 rounded-[5px] my-[10px] cursor-pointer"
              onChange={(e) => setparentcategory(e.target.value)}
            >
                <option value = {false}> please select a category</option>

              {addparentcategory.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="product_category" className="block text-[#303640]">
              Select Product Category
            </label>
            <select
              id="product_category"
              name="product_category"
              className="w-full input border p-2 rounded-[5px] my-[10px] cursor-pointer"
            >
             {productcategory.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full grid grid-cols-[2fr_2fr] gap-[20px]">
            <div>
              <label htmlFor="stock" className="block text-[#303640]">
                Manage Stock
              </label>
             <select
             name="stock"
             id="stock"
             required
             className="p-2 input w-full border rounded-[5px] my-[10px]">
  <option value="">--Select Stock--</option>
  <option value="true">In Stock</option>
  <option value="false">Out of Stock</option>
</select>
            </div>
            <div>
              <label htmlFor="brand" className="block text-[#303640]">
                Brand Name
              </label>
              <input
                type="text"
                name="brand"
                id="brand"
                placeholder="Brand"
                className="p-2 input w-full border rounded-[5px] my-[10px]"
              />
            </div>
          </div>
          <div className="w-full grid grid-cols-[2fr_2fr] gap-[20px]">
            <div>
              <label htmlFor="size" className="block text-[#303640]">
                Size
              </label>
           <ul>
             {
              sizes.map((size , index) =>(
                <li key = {index}>
 
                  <input type="checkbox"  value = {size._id}  onClick = {handlechecksizes} />
                  <span className="ml-2">{size.name}</span>
                  <span className={`px-6 bg-${size.code}` }></span>

                </li>
           

              ))
            }
           </ul>
            </div>
            <div>
              <label htmlFor="color" className="block text-[#303640]">
                Color
              </label>
           <ul >
             {
              colors.map((color , index) =>(
                <li key = {index}>
 
                  <input  type="checkbox" onClick = {handlecheckcolor} value = {color._id} />
                  <span name = "colors" className="ml-2">{color.name}</span>
                  <span name = "colors" className= " w-2 h-12 ml-5 p-2" style = {{backgroundColor : color.code}}></span>

                </li>
           

              ))
            }
           </ul>
            </div>
          </div>
          <div className="w-full my-[10px] ">
            <label htmlFor="status" className="text-[#252b36f2] mr-[30px]">
              Status
            </label>
            <input
              type="radio"
              name="status"
              id="status"
              value= {true}
              className="my-[10px] mx-[20px] accent-[#5351c9]"
            />
            <span>Display</span>
            <input
              type="radio"
              name="status"
              id="status"
              value={false}
              className="my-[10px] mx-[20px] accent-[#5351c9]"
              checked
            />
            <span>Hide</span>
          </div>
          <div className="w-full p-[8px_16px] my-[30px] ">
            <button className="bg-[#5351c9] rounded-md text-white w-[100px] h-[35px]" type = "submit">
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
