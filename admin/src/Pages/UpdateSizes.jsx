import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateSizes = () => {
  const [sizedata, setsizedata] = useState({
   name : "" ,
   order  : ""
  });
  const { _id } = useParams();
  const nav = useNavigate();

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/adminpanel/size/readsizebyid/${_id}`
      )

      .then((response) => {
        setsizedata(response.data.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [_id]);

  const hanldeupdatsize = (e) => {
    e.preventDefault();
    try {
      axios
        .put(
          `${process.env.REACT_APP_API_URL}/api/adminpanel/size/updatesize/${_id}`,
          {
            name: sizedata.name,
            order: sizedata.order,
          }
        )
        .then((response) => {
          console.log(response)
          nav("/dashboard/size/view-sizes");
        })

        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-[90%] mx-auto my-[150px] bg-white rounded-[10px] border">
      <span className="block bg-[#f8f8f9] text-[20px] font-bold p-[8px_16px] text-[#303640] border-b rounded-[10px_10px_0_0]">
        Update Size
      </span>
      <div className="w-[95%] mx-auto my-[20px]">
        <form>
          <div>
            <label htmlFor="size" className="block text-[#252b36f2]">
              Size Name
            </label>
            <input
              type="text"
              id="size"
              name="sizename"
              value={sizedata.name}
              onChange={(e) => {
                setsizedata({ ...sizedata, name: e.target.value });
              }}
              placeholder="Size Name"
              className="input p-2 border my-[20px] w-full rounded-[5px]"
            />
            <div className="w-full my-[10px] ">
              <label htmlFor="size" className="text-[#252b36f2] block">
                Size Order
              </label>
              <input
                type="text"
                name="sizeorder"
                value={sizedata.order}
                onChange={(e) => {
                  setsizedata({ ...sizedata, order: e.target.value });
                }}
                id="updated_size_order"
                placeholder="Size Order"
                className="w-full input rounded-[5px] p-2 border my-[10px]"
              />
            </div>
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="status" className="mr-[20px]">
              Status
            </label>
            <input
              type="radio"
              id="status"
              name="status"
              value="0"
              className="accent-[#5351c9] mx-[10px]"
            />
            <span>Display</span>
            <input
              type="radio"
              id="status"
              name="status"
              value="1"
              className="accent-[#5351c9] mx-[10px]"
            />
            <span>Hide</span>
          </div>
          <div className="w-full my-[30px]">
            <button
              className="w-[100px] rounded-[10px] bg-[#5351c9] border-none cursor-pointer text-white h-[30px]"
              type="submit"
              onClick={hanldeupdatsize}
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateSizes;
