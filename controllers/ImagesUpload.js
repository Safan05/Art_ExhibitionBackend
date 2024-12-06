const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../upload")); // Folder to store images
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

// Controller function to handle upload
const uploadImage = (req, res) => {
  upload.single("image")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      
      return res.status(400).json({ message: err.message });
    } else if (err) {
      // Other errors
      console.log("error here!");
      return res.status(400).json({ message: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    res.status(200).json({
      message: "File uploaded successfully",
      imageUrl: `/upload/${req.file.filename}`,
    });
  });
};

module.exports={uploadImage}
