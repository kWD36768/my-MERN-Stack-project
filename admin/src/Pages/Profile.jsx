import React, { useEffect, useState } from "react";
import { RiFacebookFill } from "react-icons/ri";
import { CiInstagram } from "react-icons/ci";
import { FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

import axios from "axios";

function Profile() {
  const [admin, setadmin] = useState({});

  const [show, setshow] = useState(false);

  const [preview, setpreview] = useState({});

  const [filepath, setfilepath] = useState("");

  const [otpbtntext, setotpbtntext] = useState("Generate OTP");
  const [emailprocess, setemailprocess] = useState(false);

  useEffect(() => {
    try {
      axios
        .get(`${process.env.REACT_APP_API_URL}/api/adminpanel/admin/readadmin`)

        .then((response) => {
          setadmin(response.data.data[0]);
          setfilepath(response.data.path);
        })

        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handlepreview = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

    reader.onload = () =>{
      setpreview({})
    }
    }
  };

  const handleupdateadmin = (e) => {
    e.preventDefault();
    try {
      const form = new FormData(e.target);
      axios
        .put(
          `${process.env.REACT_APP_API_URL}/api/adminpanel/admin/updateadmin/${admin._id}`,
          form,
        )
        .then((response) => {
          console.log(response);
        })

        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const generateOTP = () => {

    axios.post(`${process.env.REACT_APP_API_URL}/api/adminpanel/admin/generatgeotandupdateemail` , 
      {email : admin.email}
    )

    .then((response)=>{

      console.log(response)
         setemailprocess(true);

    let i = 10;

    const interval = setInterval(() => {
      setotpbtntext(`${i}s`);
      i--;
      if (i === 0) {
        clearInterval(interval);
    setemailprocess(false);

    setotpbtntext("Generate OTP")

      }

    }, 1000);
    })
    
    .catch((error)=>{
      console.log(error)
    })
  };





  return (
    <div>
      <div>
        {/* <div style={{width:'300px', position:'fixed',  top:'50%', left:'50%', transform:'translate(-50%,-50%)', }}>

     <img src="https://www.superiorlawncareusa.com/wp-content/uploads/2020/05/loading-gif-png-5.gif" alt="" />
    </div> */}
      </div>
      <div className="w-[90%] mx-auto mt-[140px] mb-[20px] bg-white border rounded-[10px]">
        <span className="block text-[#303640] bg-[#f8f8f9] rounded-[10px_10px_0_0] h-[60px] p-[15px_15px] box-border font-bold text-[25px] border-b">
          Profile
        </span>
        <div className="w-full grid grid-cols-[2fr_2fr]">
          <div className="p-[10px]">
            <form method="post" onSubmit={handleupdateadmin}>
              <div className="w-full ">
                <span className="block m-[15px_0]">Name</span>
                <input
                  onChange={(e) => setadmin({ ...admin, name: e.target.value })}
                  type="text"
                  value={admin.name}
                  name="name"
                  className="w-full border h-[35px] rounded-[5px] p-2 input"
                />
              </div>
              <div className="w-full ">
                <span className="block m-[15px_0]">Social Link</span>
                <div className="w-full grid grid-cols-[10%_auto] mb-[10px]">
                  <span className="w-full h-full text-[20px] p-[8px]">
                    <RiFacebookFill />
                  </span>
                  <input
                    type="text"
                    value={admin.fb}
                    name="fb"
                    className="w-full border h-[35px] rounded-[5px] p-2 input"
                    onChange={(e) => setadmin({ ...admin, fb: e.target.value })}
                  />
                </div>
                <div className="w-full grid grid-cols-[10%_auto] mb-[10px]">
                  <span className="w-full h-full text-[20px] p-[8px]">
                    <CiInstagram />
                  </span>
                  <input
                    type="text"
                    name="instagram"
                    onChange={(e) =>
                      setadmin({ ...admin, instagram: e.target.value })
                    }
                    value={admin.instagram}
                    className="w-full border h-[35px] rounded-[5px] p-2 input"
                  />
                </div>
                <div className="w-full grid grid-cols-[10%_auto] mb-[10px]">
                  <span className="w-full h-full text-[20px] p-[8px]">
                    <FaYoutube />
                  </span>
                  <input
                    onChange={(e) =>
                      setadmin({ ...admin, youtube: e.target.value })
                    }
                    type="text"
                    value={admin.youtube}
                    name="youtube"
                    className="w-full border h-[35px] rounded-[5px] p-2 input"
                  />
                </div>
                <div className="w-full grid grid-cols-[10%_auto] mb-[10px]">
                  <span className="w-full h-full text-[20px] p-[8px]">
                    <FaXTwitter />
                  </span>
                  <input
                    onChange={(e) =>
                      setadmin({ ...admin, twitter: e.target.value })
                    }
                    type="text"
                    name="twitter"
                    value={admin.twitter}
                    className="w-full border h-[35px] rounded-[5px] p-2 input"
                  />
                </div>
              </div>
              <div className="w-full my-[20px]">
                <span className="block m-[15px_0]">Logo</span>
                <div className="w-[50px] h-[50px] object-fill">
                  <img src={preview.logo || filepath + admin.logo} alt="" />
                </div>
                <input
                  type="file"
                  name="logo"
                  className="input border w-full m-[10px_0] category"
                  onChange={handlepreview}
                />
              </div>
              <div className="w-full my-[20px]">
                <span className="block m-[15px_0]">Fav Icon</span>
                <div className="w-[50px] h-[50px] object-fill">
                  <img
                    src={preview.fav_icon || filepath + admin.fav_icon}
                    alt="Logo"
                    className="w-full h-full"
                  />
                </div>
                <input
                  type="file"
                  name="fav_icon"
                  className="input border w-full m-[10px_0] category"
                  onChange={handlepreview}
                />
              </div>

              <div className="w-full my-[20px]">
                <span className="block m-[15px_0]">Footer Logo</span>
                <div className="w-[50px] h-[50px] object-fill">
                  <img
                    alt="Logo"
                    src={preview.footer_icon || filepath + admin.footer_icon}
                    className="w-full h-full"
                  />
                </div>
                <input
                  type="file"
                  name="footer_icon"
                  className="input border w-full m-[10px_0] category"
                  onChange={handlepreview}
                />
              </div>
              <div className="w-full my-[20px] relative ">
                <span className="block m-[15px_0]">Password</span>
                <input
                  onChange={(e) =>
                    setadmin({ ...admin, password: e.target.value })
                  }
                  type={show === false ? "text" : "password"}
                  name="password"
                  value={admin.password}
                  className="w-full border h-[35px] rounded-[5px] p-2 input"
                />
                <span
                  className="absolute right-[20px] bottom-[10px] cursor-pointer text-[#303640]"
                  onClick={() => setshow(!show)}
                >
                  {show === false ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              <button
                type="submit"
                className="w-[150px] h-[40px] rounded-md text-white bg-[#5351c9] my-[30px]"
              >
                Update
              </button>
            </form>
          </div>
          <div className="flex flex-col justify-center p-[10px] box-border items-center gap-[10px] h-[400px]">
            <div className="border border-slate-300 w-[200px] h-[200px] rounded-[50%] object-contain">
              <img
                src="/profile.jpg"
                alt="profile img"
                className="w-full h-full rounded-[50%]"
              />
            </div>
            <span className="block text-center">Profile Image</span>
          </div>
        </div>
      </div>
      <div className="mb-[80px] w-[90%] mx-auto border rounded-[10px]">
        <span className="block text-[#303640] bg-[#f8f8f9] rounded-[10px_10px_0_0] h-[60px] p-[15px_15px] box-border font-bold text-[25px] border-b">
          Update Email
        </span>
        <div className="w-full p-[30px]">
          <form method="post">
            <div className="w-full mb-[10px]">
              <span className="block m-[15px_0]">Current Email</span>
              <input
                onChange={(e) => setadmin({ ...admin, email: e.target.value })}
                value={admin.email}
                type="email"
                readOnly
                className="w-full border h-[35px] rounded-[5px] p-2 input"
              />
            </div>
            <div>
              <button
              disabled = {emailprocess === true ? true : false}
                type="button"
                className={`w-[150px] block h-[40px] rounded-md text-white bg-[#5351c9]  my-[30px]`}
                onClick={generateOTP}
              >
                {otpbtntext}
              </button>
            </div>

            <div
              className="w-full mb-[10px]"
              style={{ display: (emailprocess ) ? "" : "none" }}
            >
              <span className="block m-[15px_0]">OTP</span>
              <input
                type="text"
                placeholder="Enter OTP"
                name="userotp"
                className="w-full border h-[35px] rounded-[5px] p-2 input"
              />
              <input
                type="text"
                placeholder="Enter new email"
                name="newemail"
                className="w-full border h-[35px] rounded-[5px] p-2 input"
              />

              <div></div>

              <button
                type="submit"
                className={`w-[150px] block h-[40px] rounded-md text-white bg-[#5351c9]  my-[30px]`}
              >
                Update Email
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
