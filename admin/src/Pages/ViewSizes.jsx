import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const ViewSizes = () => {
  const [sizes, setSizes] = useState([]);
  const [checkedsizecategory, setcheckedsizecategory] = useState([]);
  const [ifAllChecked, setifAllChecked] = useState(false);

  const handleviewsize = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/adminpanel/size/readsize`
      );

      if (response.status !== 200) return alert("Try after some time");

      const payload = response.data && response.data.data;
      setSizes(Array.isArray(payload) ? payload : payload ? [payload] : []);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleviewsize();
  }, []);

  const handledeltesize = async (_id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          try {
            axios
              .delete(
                `${process.env.REACT_APP_API_URL}/api/adminpanel/size/deletesize/${_id}`
              )
              .then((response) => {
                if (response.status !== 200)
                  return alert("couldnot be delete size");
                console.log(response.data)
                setSizes((presize) => presize.filter((size) => size._id !== _id));
                   }); 
          } catch (error) {
            console.log(error);
          }

          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error",
          });
        }
      });
  };

  const handleupdatesizestatus = async (e) => {
    console.log(e.target.value);

    const newstatus = e.target.textContent !== "Active";

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/adminpanel/size/updatesize/${e.target.value}`,
        { newstatus }
      );

      if (response.status !== 200) return alert("status could not b updated");

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
      });

      setSizes((presize) =>
        presize.map((size) => {
          if (size._id === e.target.value) return { ...size, status: newstatus };

          return size;
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handlecheckedcategories = (e) => {
    if (e.target.checked) {
      setcheckedsizecategory([...checkedsizecategory, e.target.value]);
    } else {
      setcheckedsizecategory(
        checkedsizecategory.filter((item) => item !== e.target.value)
      );
    }
  };


  const handleallchecked = (e) => {
    if (e.target.checked) {
      setcheckedsizecategory(sizes.map((size) => size._id));
    } else {
      setcheckedsizecategory([]);
    }
  };

  useEffect(() => {
    setifAllChecked(
      sizes.length === checkedsizecategory.length && sizes.length !== 0
    );
  }, [sizes, checkedsizecategory]);

  const multideletesize = (e) => {



    const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-danger"
  },
  buttonsStyling: false
});
swalWithBootstrapButtons.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonText: "Yes, delete it!",
  cancelButtonText: "No, cancel!",
  reverseButtons: true
}).then((result) => {
  if (result.isConfirmed) {

    axios.put(
        `${process.env.REACT_APP_API_URL}/api/adminpanel/size/deleteallsize` , {ids : checkedsizecategory })
        .then((response)=>{
  if (response.status !== 200) return alert("Try after some time");
        })
  
        setSizes((presize)=>(
          presize.filter((size)=> !checkedsizecategory.includes(size._id))
        ))

    

      console.log(checkedsizecategory);

   
    swalWithBootstrapButtons.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success"
    });
  } else if (
    /* Read more about handling dismissals below */
    result.dismiss === Swal.DismissReason.cancel
  ) {
    swalWithBootstrapButtons.fire({
      title: "Cancelled",
      text: "Your imaginary file is safe :)",
      icon: "error"
    });
  }
})
.catch((error)=>{
  console.log(error)
  Swal.fire({
  icon: "error",
  title: "Oops...",
  text: "Something went wrong!",
  footer: '<a href="#">Why do I have this issue?</a>'
});
})  
  };



  const handlesearchcsize = (e)=>{

    if (e.target.value){

          axios.get(
        `${process.env.REACT_APP_API_URL}/api/adminpanel/size/searchsizebyid/${e.target.value}` )

        .then((response)=>{

          if(response.status === 404){
                  Swal.fire({
           icon: "error",
           title: "Oops...",
           text: "No match Found!",
           footer: '<a href="#">Why do I have this issue?</a>'
         });
          }

          else if(response.status === 200){

            const payload = response.data && response.data.data;
            setSizes(Array.isArray(payload) ? payload : payload ? [payload] : []);

          }
           
        })

        

        .catch((error)=>{
          console.log(error)
        })
    }
  }

  return (
    <div className="w-[90%] bg-white mx-auto border rounded-[10px] my-[150px]">
      <span className="block border-b rounded-[10px_10px_0_0] bg-[#f8f8f9] text-[#303640] h-[50px] p-[8px_16px] text-[23px] font-bold">
        View Size
      </span>
      <div className="w-[90%] mx-auto">

       <div>
          <input
          onChange = {handlesearchcsize}
            type="text"
            className="border p-2 mb-2 w-full"
            placeholder="Search"
          />
        </div>


        <table className="w-full my-[20px]">
          <thead>
            <tr className="text-left border-b">
              <th>
                <button
                  className="bg-red-400 rounded-sm px-2 py-1"
                  onClick={multideletesize}
                >
                  Delete
                </button>
                <input
                  checked={ifAllChecked}
                  type="checkbox"
                  name="deleteAll"
                  className="m-[0_10px] accent-[#5351c9] cursor-pointer input"
                  onClick={handleallchecked}
                />
              </th>
              <th>Sno</th>
              <th>Size Name</th>
              <th>Size Order</th>
              <th>Action</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {(Array.isArray(sizes) ? sizes : []).map((size, index) => (
              <tr className="border-b" key={index}>
                <td>
                  <input
                    type="checkbox"
                    onClick={handlecheckedcategories}
                    value={size._id}
                    name="delete"
                    className="accent-[#5351c9] cursor-pointer input"
                    checked={checkedsizecategory.includes(size._id)}
                  />
                  {console.log(size)}
                </td>
                <td>{index + 1}</td>
                <td>{size.name}</td>
                <td>{size.order}</td>
                <td className="flex gap-[5px]">
                  <MdDelete
                    className="my-[5px] text-red-500 cursor-pointer"
                    onClick={() => {
                      handledeltesize(size._id);
                    }}
                  />{" "}
                  |{" "}
                  <Link to={`/dashboard/sizes/update-size/${size._id}`}>
                    <CiEdit className="my-[5px] text-yellow-500 cursor-pointer" />
                  </Link>
                </td>
                <td>{size.status}</td>
                <td className="p-2">
                  <button
                    className={`${
                      size.status ? "bg-green-600" : "bg-red-600"
                    } text-white font-light rounded-md p-1 w-[80px] h-[35px] cursor-pointer`}
                    value={size._id}
                    onClick={handleupdatesizestatus}
                  >
                    {size.status ? "Active" : "Inactive"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewSizes;
