const router = require("express").Router();

//middleware
const {imageUpload} = require("../helpers/image-upload")


//Controller
const ProductController = require("../controllers/ProductController")

router.post("/create", imageUpload.array("images"), ProductController.create)
router.get("/", ProductController.getAllProducts)
router.get("/:id", ProductController.getProductById)
router.delete("/:id", ProductController.deleteProductById)
router.patch("/:id", imageUpload.array("images"), ProductController.updateProduct)

module.exports = router;