const multer = require("multer");
const path = require("path");

//destination the store the images
const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = "";

    if (req.baseUrl.includes("products")) {
      folder = "products";
    }
    cb(null, `public/images/${folder}`);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      Date.now() +
        String(Math.floor(Math.random() * 100)) +
        path.extname(file.originalname)
    );
  },
});

const imageUpload = multer({
  storage: imageStorage,
  fileFilter(res, file, cb) {
    if (!file.originalname.match(/\.(jpg|png|jpeg|jfif|svg)$/)) {
      return cb(new Error("Por favor só envie images"));
    }
    cb(undefined, true);
  },
});

module.exports = { imageUpload };
