import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const ViewCategory = () => {
  const [categories, setcategories] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/adminpanel/productcategory/readproductcategory`,
      )

      .then((response) => {
        console.log(response);
        setcategories(response.data.data);
      })

      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="w-[90%] mx-auto my-[150px] bg-white rounded-[10px] border">
      <span className="block h-[40px] bg-[#f8f8f9] text-[20px] text-[#303640] p-[8px_16px] border-b rounded-[10px_10px_0_0]">
        View Category
      </span>
      <div className="w-[90%] mx-auto my-[20px]">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b">
              <th>
                Delete{" "}
                <input
                  type="checkbox"
                  name="deleteAll"
                  id="deleteAllCat"
                  className="accent-[#5351c9]"
                />
              </th>
              <th>Sno</th>
              <th>Category Name</th>
              <th>Parent Category</th>
              <th>Parent_Category Name</th>
              <th>Image</th>
              <th>Description</th>
              <th>Action</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr className="border-b" key={category._id}>
                <td>
                  <input
                    type="checkbox"
                    name="delete"
                    id="delete1"
                    className="accent-[#5351c9] cursor-pointer"
                  />
                </td>
                <td>{index + 1}</td>
                <td>{category.name}</td>

                {/* ✅ Parent category safe rendering */}
                <td>
                  {" "}
                  {category.parent_category ? (
                    category.parent_category.name
                  ) : (
                    <span className="text-muted">Root</span>
                  )}{" "}
                </td>

                <td className="object-contain p-2">
                  <img
                    src={category.thumbnail}
                    width={80}
                    height={80}
                  />
                </td>
                <td className="w-[200px] flex-wrap p-1">
                  <span>...Read</span>
                </td>
                <td>
                  <MdDelete className="my-[5px] text-red-500 cursor-pointer inline" />{" "}
                  |{" "}
                  <Link to="/dashboard/products/update-category">
                    <CiEdit className="my-[5px] text-yellow-500 cursor-pointer inline" />
                  </Link>
                </td>
                <td>Display</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewCategory;
