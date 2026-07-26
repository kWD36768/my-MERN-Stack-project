const multer = require("multer");

const path = require("path");

const multerstorage = (foldername) =>
  multer.diskStorage({
    destination: (req, file, cb) => {

      const fieldname = file.fieldname
       console.log("ABS PATH:", file);
      if(foldername === 'product'){
        cb(null, `uploads/${foldername}/${fieldname}`);
      }

      else{
       cb(null, `uploads/${foldername}`);
      }




    },

filename: (req, file, cb) => {
  const ext = file.mimetype.split("/")[1];

  const uniqueName =
    Date.now() +
    "-" +
    Math.floor(Math.random() * 100000) +
    "." +
    ext;

  console.log(uniqueName);

  cb(null, uniqueName);
},
  });

const fileuploads = (foldername) =>
  multer({ storage: multerstorage(foldername) }).fields([
    {
      name: "thumbnail",
      maxCount: 1,
    },
 
    {
      name: "logo",
      maxCount: 1,
    },
    {
      name: "fav_icon",
      maxCount: 1,
    },
    {
      name: "footer_icon",
      maxCount: 1,
    },

    {
      name : "product_img" , 
      maxCount : 1
    },

    {
      name : "image_animation" ,
      maxCount : 1
    } ,
    {
      name : "product_gallery" ,
      maxCount : 1
    }
  ]);

module.exports = fileuploads;
