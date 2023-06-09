const Product = require("../models/Product");

//helpers
const ObjectId = require("mongoose").Types.ObjectId;

module.exports = class ProductController {
  //create product
  static async create(req, res) {
    const { name, description, price } = req.body;

    const images = req.files;

    const available = true;

    //validations
    if (!name) {
      res.status(422).json({ message: "Nome é obrigatório" });
      return;
    }
    if (!description) {
      res.status(422).json({ message: "descrição é obrigatório" });
      return;
    }
    if (!price) {
      res.status(422).json({ message: "Preço é obrigatório" });
      return;
    }
    if (images.length === 0) {
      res.status(422).json({ message: "A imagem é obrigatório" });
      return;
    }
    const product = new Product({
      name,
      description,
      price,
      available,
      images: [],
    });

    images.map((img) => {
      product.images.push(img.filename);
    });

    try {
      const newProduct = await product.save();
      res
        .status(201)
        .json({ message: "Produto Cadastrado com Sucesso", newProduct });
    } catch (err) {
      res.status(500).json({ message: err });
    }
  }
  static async getAllProducts(req, res) {
    const products = await Product.find();

    res.status(200).json({ products: products });
  }
  static async getProductById(req, res) {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: "ID inválido" });
      return;
    }
    const product = await Product.findById(id);

    if (!product) {
      res.status(404).json({ message: "Produto não encontrado" });
      return;
    }
    res.status(200).json({ product });
  }
  static async deleteProductById(req, res) {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: "ID inválido" });
      return;
    }
    const product = await Product.findById(id);

    if (!product) {
      res.status(404).json({ message: "Produto não encontrado" });
      return;
    }

    await Product.findByIdAndRemove(id);

    res.status(200).json({ message: "Product removido com sucesso!" });
  }
  static async updateProduct(req, res) {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: "ID inválido" });
      return;
    }
    const product = await Product.findById(id);
    //check if product is exist
    if (!product) {
      res.status(404).json({ message: "Produto não encontrado" });
      return;
    }

    const { name, description, price, available } = req.body;

    const images = req.files;

    const updateData = {};

    //validation
    if (!name) {
      res.status(422).json({ message: "Nome é obrigatório" });
      return;
    }
    updateData.name = name;
    if (!description) {
      res.status(422).json({ message: "descrição é obrigatório" });
      return;
    }
    updateData.description = description;
    if (!price) {
      res.status(422).json({ message: "Preço é obrigatório" });
      return;
    }
    updateData.price = price;
    if (images.length > 0) {
      updateData.images = [];
      images.map((image) => {
        updateData.images.push(image.filename);
      });
    }

    await Product.findByIdAndUpdate(id, updateData);

    res.status(200).json({ message: "Produto atualizado com sucesso!" });
  }
};
