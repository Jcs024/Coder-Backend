const multer = require('multer');
const path = require("path");

module.exports = {
  PORT: 8080,
  paths: {
    views: path.join(__dirname, "../views"),
    public: path.join(__dirname, "../../public"),
    upload: path.join(__dirname, "../../uploads"),
  },
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads'));
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${timestamp}${ext}`);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Solo se permiten imágenes'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    files: 4, 
    fileSize: 5 * 1024 * 1024 
  }
});

module.exports = upload;