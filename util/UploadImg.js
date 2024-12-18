const multer = require("multer");
const path = require("path");
const cloudinary = require("cloudinary").v2;
cloudinary.config({ 
  cloud_name: 'dd8pi6fw3', 
  api_key: '746346311168225', 
  api_secret: 'OmHBEiHJsMdYswiBVOUygPtBknQ' // Click 'View API Keys' above to copy your API secret
});
const upload = multer({
  storage: multer.memoryStorage(), // Store file in memory
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);
    console.log("image uploading");
    if (extName && mimeType) {
      return cb(null, true);
    } else {
      cb(new Error("Only images are allowed!"));
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});
module.exports=upload;
