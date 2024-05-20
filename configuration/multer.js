import multer from "multer";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (!file) {
    return cb(new Error("No file uploaded"), false);
  }
  const allowedFiles = ["image/jpeg", "image/png", "image/jpg"];
  if (!allowedFiles.includes(file.mimetype)) {
    return cb(new Error("Only JPEG and PNG Files are allowed"), false);
  }
  cb(null, true);
};

export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

export const handleMulterErrors = (err, req, res, next) => {
  let message = err.message;
  if (err) {
    return res.status(400).json({ message: message });
  } else {
    next();
  }
};
