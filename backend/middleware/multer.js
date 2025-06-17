import multer from "multer";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fieldSize: 10 * 1024 * 1024,
    fileSize: 5 * 1024 * 1024,
  },
});

export default upload;
