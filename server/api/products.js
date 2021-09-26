const router = require("express").Router();
const {
  models: { Product, ProductCategory, categoryFilter }
} = require("../db");
const { idSchema } = require("./validationSchemas");
const { productSort, paginate, productSearch } = require("../db/models/Product");
const { DEFAULT_PAGESIZE } = require("../../constants");

//GET /products - returns all the products
router.get("/", async (req, res, next) => {
  try {
    const { rows: products, count: totalItems } = await Product.findAndCountAll({
      attributes: ["id", "name", "description", "price", "imageUrl", "quantity"],
      include: [
        {
          model: ProductCategory,
          as: "categories",
          ...categoryFilter(req.query),
          ...productSearch('category', 'name', req.body)
        }
      ],
      ...productSort(req.query),
      ...paginate(req.query, DEFAULT_PAGESIZE),
      ...productSearch('product', 'name', req.body),
      logging: console.log
    });

    res.json({ products, totalItems });
  } catch (err) {
    next(err);
  }
});

/*

CREATE TABLE  AS SELECT word FROM ts_stat('SELECT to_tsvector(''simple'', name) FROM products');

        CREATE INDEX words_idx ON words USING GIN (word gin_trgm_ops);

        CREATE INDEX CONCURRENTLY trgm_index_product_names ON products USING gin (lower(name) gin_trgm_ops);


        https://about.gitlab.com/blog/2016/03/18/fast-search-using-postgresql-trigram-indexes/
ALTER TABLE products ADD COLUMN ts tsvector GENERATED ALWAYS AS (to_tsvector('english', name)) STORED;
CREATE INDEX ts_idx ON products USING GIN (ts gin_trgm_ops);


CREATE INDEX product_name_idx ON products USING gin (name gin_trgm_ops);
 */

//GET /products/categories - returns all categories
router.get("/categories", async (req, res, next) => {
  try {
    const categories = await ProductCategory.findAll({
      attributes: ["id", "name"]
    });
    res.json(categories);
  } catch (err) {
    next(err);
  }
});

//GET /products/:id - returns a single product, specified by ID
router.get("/:id", async (req, res, next) => {
  try {
    //make sure the ID is a number
    await idSchema.validate(req.params);
    const product = await Product.findByPk(req.params.id, {
      attributes: ["id", "name", "description", "price", "imageUrl"]
    });
    if (product) {
      res.send(product);
    } else {
      throw { status: 404, message: "No such product!" };
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
