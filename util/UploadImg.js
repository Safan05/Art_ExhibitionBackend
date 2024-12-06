const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../../Web/ArtSpace/src/assets/testImages")); // Folder to store images
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    // Validate file type (allow only images)
    console.log("check file name");
    const fileTypes = /jpeg|jpg|png|gif/;
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);

    if (extName && mimeType) {
    
      return cb(null, true);
    } else {
      cb(new Error("Only images are allowed!"));
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});
module.exports=upload;
