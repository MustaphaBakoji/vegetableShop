const Product = require("../models/products.models");
const cloudinary = require("../Utils/cloudinary");

// cloudinary helper function

function deleteCloudinaryMedia(url) {
  if (!url) return;
  // Extract public_id from URL
  // Example: https://res.cloudinary.com/<cloud_name>/.../blaze_spices/recipes/images/abc123.jpg
  const matches = url.match(
    /\/blaze_spices\/recipes\/(?:images|videos)\/([^\.\/]+)\./
  );
  if (matches && matches[1]) {
    const publicId = `vegetables/${
      url.includes("/images/") ? "images" : "blank"
    }/${matches[1]}`;
    const resourceType = url.includes("/videos/") ? "video" : "image";
    cloudinary.uploader.destroy(
      publicId,
      { resource_type: resourceType },
      (error, result) => {
        if (error) console.warn("Cloudinary deletion error:", error);
      }
    );
  }
}

// ******************************************* */
//
// ADMIN PRODUCT CONTROLLERS
//
//******************************************* */
// async function productHandler(req, res) {
//   allProducts = await Product.find();
//   res.status(200).json({
//     status: "succcess",
//     data: allProducts,
//   });
// };
// const b64 = Buffer.from(req.file.buffer).toString("base64");
// let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
function createProduct(req, res, next) {
  if (!req.file) {
    return res.status(400).json({
      status: "fail",
      message: "No image file provided",
    });
  }

  const newProduct = {
    name: req.body.name,
    price: req.body.price,
  };
  if (req.file) {
    if (req.file.mimetype.startsWith("image/")) {
      newProduct.imageUrl = req.file.path; // Cloudinary URL
    }
  }
  Product.create(newProduct)
    .then((uploadedProduct) => {
      res.status(201).json({
        status: "success",
        message: "Product created successfully",
        product: uploadedProduct,
      });
      return next();
    })
    .catch((err) => {
      res.status(500).json({
        status: "fail",
        message: "Failed to create product",
        error: err,
      });
    });
}

function getProducts(req, res, next) {
  if (req.query.q) {
    const searchQuery = req.query.q;
    console.log("SEARCH QUERY: ", searchQuery);
    const regex = new RegExp(searchQuery, "i");
    return Product.find({ name: regex })
      .then((products) => {
        return res.status(200).json({
          status: "success",
          message: "Products fetched successfully",
          products: products,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: "fail",
          message: "Failed to fetch products",
          error: err,
        });
      });
  }
  return Product.find()
    .then((products) => {
      return res.status(200).json({
        status: "success",
        message: "Products fetched successfully",
        products: products,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: "fail",
        message: "Failed to fetch products",
        error: err,
      });
    });
}
function getProductById(req, res, next) {
  const productId = req.params.id;
  Product.findById(productId)
    .then((product) => {
      if (!product) {
        return res.status(404).json({
          status: "fail",
          message: "Product not found",
        });
      }
      return res.status(200).json({
        status: "success",
        message: "Product fetched successfully",
        product: product,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: "fail",
        message: "Failed to fetch product",
        error: err,
      });
    });
}
function updateProduct(req, res, next) {
  const productId = req.params.id;
  const updateData = {
    name: req.body.name,
    price: req.body.price,
  };

  if (req.file && req.file.mimetype.startsWith("image/")) {
    Product.findById(productId)
      .then((product) => {
        if (!product) {
          return res.status(404).json({
            status: "fail",
            message: "Product not found",
          });
        }

        if (product.image) {
          deleteCloudinaryMedia(product.image);
        }

        updateData.imageUrl = req.file.path; // Cloudinary URL

        return Product.findByIdAndUpdate(productId, updateData, { new: true });
      })
      .then((updatedProduct) => {
        if (!updatedProduct) {
          return res.status(404).json({
            status: "fail",
            message: "Product not found",
          });
        }
        return res.status(200).json({
          status: "success",
          message: "Product updated successfully5",
          product: updatedProduct,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: "fail",
          message: "Failed to update product",
          error: err,
        });
      });
  } else {
    Product.findByIdAndUpdate(productId, updateData, { new: true })
      .then((updatedProduct) => {
        if (!updatedProduct) {
          return res.status(404).json({
            status: "fail",
            message: "Product not found",
          });
        }
        return res.status(200).json({
          status: "success",
          message: "Product updated successfully",
          product: updatedProduct,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: "fail",
          message: "Failed to update product",
          error: err,
        });
      });
  }
}

function deleteProduct(req, res, next) {
  const productId = req.params.id;

  Product.findByIdAndDelete(productId)
    .then((deletedProduct) => {
      if (!deletedProduct) {
        return res.status(404).json({
          status: "fail",
          message: "Product not found",
        });
      }

      // 1) delete the image from Cloudinary
      //    your schema field is `imageUrl`, adjust if you used `image`
      deleteCloudinaryMedia(deletedProduct.imageUrl);

      // 2) send response
      return res.status(200).json({
        status: "success",
        message: "Product deleted successfully",
        product: deletedProduct,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: "fail",
        message: "Failed to delete product",
        error: err,
      });
    });
}

function searchProducts(req, res, next) {}

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  getProducts,
  searchProducts,
};
