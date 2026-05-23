const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { randomUUID } = require("crypto");
const AppError = require("../lib/app-error");
const { HTTP_STATUS, RESPONSE_STATUS } = require("../config/constants");

const uploadDir = path.join(__dirname, "../../public/profile-images");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const validExtensions = [".jpg", ".jpeg", ".png"];
const maxFileSizeOnMB = 1;
const maxFileSize = maxFileSizeOnMB * 1024 * 1024; // 1MB

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();
    const fileName = `${Date.now()}-${randomUUID()}${extension}`;
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  const extension = path.extname(file.originalname).toLowerCase();
  if (!validExtensions.includes(extension)) {
    return cb(new AppError("Format Image tidak sesuai", HTTP_STATUS.VALIDATION_ERROR, RESPONSE_STATUS.INVALID_PARAMETERS), false);
  }
  cb(null, true);
};

const uploadProfileImage = multer({
  storage,
  limits: { fileSize: maxFileSize },
  fileFilter,
});

module.exports = {
  uploadProfileImage,
  maxFileSizeOnMB,
};
