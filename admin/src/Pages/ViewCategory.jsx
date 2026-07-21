import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import tippy, { followCursor } from "tippy.js";
// import Swal from "sweetalert2";
// import tippy from 'tippy.js';
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";

const ViewCategory = () => {
  const [category, setcategory] = useState([]);
  const [checkedcategories, setcheckedcategories] = useState([]);
  const [ifAllChecked, setifAllChecked] = useState(false);

  const readparentcategory = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/adminpanel/parentcategory/readparentcategory`,
      );

      if (response.status !== 200) return alert("sometihing went wrong");

      console.log(response);

      setcategory(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    readparentcategory();
  }, []);

  const handledeletecategory = async (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axios
            .delete(
              `${process.env.REACT_APP_API_URL}/api/adminpanel/parentcategory/deleteparentcategory/${_id}`,
            )
            .then((response) => {
              if (response.status !== 200) return alert("try after sometime");

              setcategory((precategory) =>
                precategory.filter((category) => category._id !== _id),
              );
            });
        } catch (error) {
          console.log(error);
        }

        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  const handleupdatestatus = async (e) => {
    const newstatus = e.target.textContent !== "Active";

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/adminpanel/parentcategory/updatestatus/${e.target.value}`,
        { newstatus },
      );

      if (response.status !== 200) return alert("try after sometime");

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your status has been changed",
        showConfirmButton: false,
        timer: 1500,
      });

      //  setcategory((precategory)=>(
      //   precategory.map((category)=>{
      //      if(category._id === e.target.value) return {...category , status : newstatus}

      //      return category ;
      //   })
      //  ))

      console.log(response);

      setcategory((precategory) =>
        precategory.map((category) => {
          if (category._id === e.target.value)
            return { ...category, status: newstatus };

          return category;
        }),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handlecheckcategories = (e) => {
    if (e.target.checked) {
      setcheckedcategories([...checkedcategories, e.target.value]);

      console.log(...checkedcategories, e.target.value);
    } else {
      setcheckedcategories(
        checkedcategories.filter((item) => item !== e.target.value),
      );
    }
  };

  const handlemultidelete = (e) => {
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
          axios
            .put(
              `${process.env.REACT_APP_API_URL}/api/adminpanel/parentcategory/deletecategories`,
              { ids: checkedcategories },
            )
            .then((response) => {
              console.log(response.data);

              setcategory((precategory) =>
                precategory.filter(
                  (category) => !checkedcategories.includes(category._id),
                ),
              );

              setcheckedcategories([]);

              swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
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
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: '<a href="#">Why do I have this issue?</a>',
        });
      });
  };

  const handleallcheck = (e) => {
    if (e.target.checked) {
      setcheckedcategories(category.map((category) => category._id));

      console.log(checkedcategories);
    } else {
      setcheckedcategories([]);
    }
  };

  useEffect(() => {
    setifAllChecked(
      category.length === checkedcategories.length && category.length !== 0,
    );
  }, [checkedcategories, category]);

  const handlestatusbtn = (e) => {
    tippy("#statusbtn", {
      content: `Click to ${e.target.textContent === "Active" ? "Deactivate" : "Activate"}`,

      theme: "tomato",
      followCursor: true,
      plugins: [followCursor],
    });
  };

  const handlesearchcategory = (e) => {
    if (e.target.value) {
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/api/adminpanel/parentcategory/searchparentcategory/${e.target.value}`,
        )
        .then((response) => {
          if (response.status === 200) {
            setcategory(response.data.data);
          }
        })
        .catch((error) => {
            if (error.response && error.response.status === 404) {
          setcategory([]); // no data found
          Swal.fire({
            icon: "error",
            title: "No match found!",
            text: "Try a different name.",
          });
        } else {
          console.log(error);
        }
        })
    } else {
      readparentcategory();
    }
  };

  return (
    <div className="w-[90%] bg-white rounded-[10px] border mx-auto my-[150px]">
      <span className="block h-[40px] border-b rounded-[10px_10px_0_0] bg-[#f8f8f9] text-[#303640] p-[8px_16px] text-[20px]">
        View categorys
      </span>
      <div className="w-[90%] mx-auto my-[20px]">
        <div>
          <input
            onChange={handlesearchcategory}
            type="text"
            className="border p-2 mb-2 w-full"
            placeholder="Search"
          />
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b text-left">
              <th className="flex p-2">
                <button
                  className="bg-[#5351c9] font-light text-white rounded-md p-1 w-[80px] h-[35px] my-[10px] mr-[10px]"
                  onClick={handlemultidelete}
                >
                  Delete
                </button>
                <input
                  onClick={handleallcheck}
                  type="checkbox"
                  name="deleteAll"
                  className="cursor-pointer accent-[#5351c9] input"
                  checked={ifAllChecked}
                />
              </th>
              <th className="p-2">Sno.</th>
              <th className="p-2">Ctegory Name</th>
              <th className="p-2">description</th>
              <th className="p-2">Action</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {category.map((category, index) => (
              <tr className="border-b" key={index}>
                <td className="p-2">
                  <input
                    onClick={handlecheckcategories}
                    value={category._id}
                    type="checkbox"
                    name="delete"
                    className="cursor-pointer accent-[#5351c9] input"
                    checked={checkedcategories.includes(category._id)}
                  />
                </td>
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{category.name}</td>
                <td>{category.description}</td>
                <td className="p-2">
                  <MdDelete
                    className="my-[5px] text-red-500 cursor-pointer inline"
                    onClick={() => {
                      handledeletecategory(category._id);
                    }}
                  />
                  |{" "}
                  <Link
                    to={`/dashboard/category/update-category/${category._id}`}
                  >
                    <CiEdit className="my-[5px] text-yellow-500 cursor-pointer inline" />
                  </Link>
                </td>
                <td className="p-2">
                  <button
                    id="statusbtn"
                    value={category._id}
                    onMouseEnter={handlestatusbtn}
                    className={`${
                      category.status ? "bg-green-600" : "bg-red-600"
                    } text-white font-light rounded-md p-1 w-[80px] h-[35px] cursor-pointer`}
                    onClick={handleupdatestatus}
                  >
                    {category.status ? "Active" : "Inactive"}
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
              <Link to="/dashboard/category/update-category">
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
              <Link to="/dashboard/category/update-category">
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

export default ViewCategory;
