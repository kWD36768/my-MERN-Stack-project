import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ViewColor = () => {
  const [colors, setColors] = useState([]);
  const [checkedcolor, setcheckedcolor] = useState([]);
  const [ifAllChecked, setifAllChecked] = useState(false);



  const handlereadcolor = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/adminpanel/colors/readcolors`
      );

      if (response.status !== 200) return alert("try after sometime");

      console.log(response);
      setColors(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handlereadcolor();
  }, []);

 

  const handledeltecolor = async (_id) => {
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

       try {
   axios.delete(
        `${process.env.REACT_APP_API_URL}/api/adminpanel/colors/deletecolor/${_id}`
      ).then((response)=>{
   if (response.status !== 200) return alert("color has not been deleted");

      setColors((precategory) =>
        precategory.filter((category) => category._id !== _id)
      );

      console.log(response.data);
      })

   
    } 

     
    catch (error) {
      console.log(error);
    }

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
});
 
   
  };

  const handlechangestatus = async (e) => {
    try {
      const newstatus = e.target.textContent !== "Active";
      console.log(e.target.value, newstatus);
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/adminpanel/colors/changestatus/${e.target.value}`,
        { newstatus }
      );

      if (response.status !== 200) return alert("status could not be updated");
       
     
Swal.fire({
  position: "top-end",
  icon: "success",
  title: "Your work has been saved",
  showConfirmButton: false,
  timer: 1500
});

      setColors((precolor) =>
        precolor.map((color) => {
          if (color._id === e.target.value)
            return { ...color, status: newstatus };

          return color;
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handlecheckedcategories = (e) => {
    if (e.target.checked) {
      setcheckedcolor([...checkedcolor, e.target.value]);
    } else {
      setcheckedcolor(checkedcolor.filter((item) => item !== e.target.value));
    }
  };

  const multideleltecolor = (e) => {

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
        `${process.env.REACT_APP_API_URL}/api/adminpanel/colors/deleteallcolors` , {ids : checkedcolor })
      .then((response)=>{

      if (response.status !== 200) return alert("status could not be updated");
      })


     console.log(checkedcolor)


     setColors((precolor)=>(
      precolor.filter((color)=>  !checkedcolor.includes(color._id))
     ))


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

  const handleallcolorchecked = (e) => {
    if (e.target.checked) {
      setcheckedcolor(colors.map((color) => color._id));
    } else {
      setcheckedcolor([]);
    }
  };

  useEffect(()=>{
    setifAllChecked(colors.length === checkedcolor.length && colors.length !== 0)
  } , [colors ,checkedcolor ])
  return (
    <div className="w-[90%] bg-white rounded-[10px] border mx-auto my-[150px]">
      <span className="block h-[40px] border-b rounded-[10px_10px_0_0] bg-[#f8f8f9] text-[#303640] p-[8px_16px] text-[20px]">
        View Color
      </span>
      <div className="w-[90%] mx-auto my-[20px]">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left">
              <th className="flex p-2">
                <button
                  className="bg-[#5351c9] font-light text-white rounded-md p-1 w-[80px] h-[35px] my-[10px] mr-[10px]"
                  onClick={multideleltecolor}
                >
                  Delete
                </button>

                <input
                checked={ifAllChecked}
                  onClick={handleallcolorchecked}
                  type="checkbox"
                  name="deleteAll"
                  className="cursor-pointer accent-[#5351c9] input"
                />
              </th>
              <th className="p-2">Sno.</th>
              <th className="p-2">Color Name</th>
              <th className="p-2">Color</th>
              <th className="p-2">Action</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {colors.map((color, index) => (
              <tr className="border-b" key={index}>
                <td className="p-2">
                  <input
                    value={color._id}
                    type="checkbox"
                    name="delete"
                    className="cursor-pointer accent-[#5351c9] input"
                      checked={checkedcolor.includes(color._id)}
                    onClick={handlecheckedcategories}
                  />
                </td>
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{color.name}</td>
                <td className="p-2">
                  <div  className="inline-block w-10 h-4 rounded ml-2"
  style={{ backgroundColor: color.code }}></div>
                </td>
                <td className="p-2">
                  <MdDelete
                    className="my-[5px] text-red-500 cursor-pointer inline"
                    onClick={() => {
                      handledeltecolor(color._id);
                    }}
                  />{" "}
                  |{" "}
                  <Link to={`/dashboard/color/update-colors/${color._id}`}>
                    <CiEdit className="my-[5px] text-yellow-500 cursor-pointer inline" />
                  </Link>
                </td>
                <td className="p-2">
                  <button
                    className={`${
                      color.status ? "bg-green-600" : "bg-red-600"
                    } text-white font-light rounded-md p-1 w-[80px] h-[35px] cursor-pointer`}
                    value={color._id}
                    onClick={handlechangestatus}
                  >
                    {color.status ? "Active" : "Inactive"}
                  </button>
                </td>
              </tr>
            ))}

            {/* <tr className="border-b">
              <td className="p-2">
                <input
                  type="checkbox"
                  name="delete"
                  className="cursor-pointer accent-[#5351c9] input"
                />
              </td>
              <td className="p-2">2</td>
              <td className="p-2">green</td>
              <td className="p-2">
                <div className="w-[90%] mx-auto h-[20px] bg-green-500 border"></div>
              </td>
              <td className="p-2">
                <MdDelete className="my-[5px] text-red-500 cursor-pointer inline" />{" "}
                |{" "}
                <Link to="/dashboard/color/update-colors">
                  <CiEdit className="my-[5px] text-yellow-500 cursor-pointer inline" />
                </Link>
              </td>
              <td className="p-2">
                <button className="bg-green-600 text-white font-light rounded-md p-1 w-[80px] h-[35px] cursor-pointer">
                  Active
                </button>
              </td>
            </tr>
            <tr className="border-b">
              <td className="p-2">
                <input
                  type="checkbox"
                  name="delete"
                  className="cursor-pointer accent-[#5351c9] input"
                />
              </td>
              <td className="p-2">3</td>
              <td className="p-2">blue</td>
              <td className="p-2">
                <div className="w-[90%] mx-auto h-[20px] bg-blue-500 border"></div>
              </td>
              <td className="p-2">
                <MdDelete className="my-[5px] text-red-500 cursor-pointer inline" />{" "}
                |{" "}
                <Link to="/dashboard/color/update-colors">
                  <CiEdit className="my-[5px] text-yellow-500 cursor-pointer inline" />
                </Link>
              </td>
              <td className="p-2">
                <button className="bg-green-600 text-white font-light rounded-md p-1 w-[80px] h-[35px] cursor-pointer">
                  Active
                </button>
              </td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewColor;
