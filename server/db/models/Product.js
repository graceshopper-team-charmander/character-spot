const Sequelize = require("sequelize");
const db = require("../db");
const { Op } = require("sequelize");
const { DEFAULT_PAGESIZE } = require("../../../constants");
const { properCase } = require("../../../utility-funcs/string-manip");

const Product = db.define("product", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },

  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "/images/default-product.jpg"
  },

  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      min: 1
    }
  },

  description: {
    type: Sequelize.TEXT
  },

  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      notEmpty: true,
      min: 0
    }
  },
  fullTextSearch: {
    type: Sequelize.TSVECTOR
  }
});

/************************
 Model Methods          *
 ***********************/
/**
 *
 * @param {[Sequelize.Model]} products
 * @returns {Promise<void>}
 */
Product.updateInventory = async (orderedProducts) => {
  for (let i = 0; i < orderedProducts.length; i++) {
    let orderedProduct = orderedProducts[i];
    await orderedProduct.update({
      quantity: orderedProduct.quantity - orderedProduct.cart.cartQuantity
    });
  }
};

/************************
 Sequelize Helpers      *
 ***********************/
/**
 * returns a sequelize fragment for filtering by category
 * @param {string|null} categories
 * @returns {{where: sequelize.where}|{}}
 */
const categoryFilter = ({ categories }) => {
  if (categories) {
    categories = categories.split("|");
    return {
      where: {
        name: {
          [Op.in]: categories.map((cat) => properCase(cat))
        }
      }
    };
  }
  return {};
};

/**
 * returns a sequelize fragment for student sorting operations
 * @param {string|null} sort
 * @param {string|null} dir
 * @returns {{}|{order: (sequelize.literal|*|string)[][]}}
 */
const productSort = ({ sort, dir = "asc" }) => {
  if (sort && sort !== "none") {
    return {
      order: [[sort, dir.toUpperCase()]]
    };
  }
  return {};
};

/**
 * returns a sequelize fragment for pagination
 * @param {string} page
 * @param {number}pageSize
 * @returns {{offset: number, limit: number}|{}}
 */
const paginate = ({ page }, pageSize = DEFAULT_PAGESIZE) => {
  if (page) {
    return {
      limit: pageSize,
      offset: (page - 1) * pageSize
    };
  }
  return {};
};

//requires that you enable pg_trgm extension on this database via CREATE EXTENSION pg_trgm
const productSearch = (table, field, { search }) => {
  if (search) {
    return {
      where: Sequelize.literal(`similarity(${table}.${field}, '${search}') > 0.3`)
      // where: {
      //   // name: {
      //   //   [Op.match]: Sequelize.fn("to_tsquery", search)
      //   // }
      // }
    };
  }
  return {};
};

/*

CREATE TABLE  AS SELECT word FROM ts_stat('SELECT to_tsvector(''simple'', name) FROM products');
CREATE INDEX words_idx ON words USING GIN (word gin_trgm_ops);
CREATE INDEX CONCURRENTLY trgm_index_product_names ON products USING gin (lower(name) gin_trgm_ops);

https://about.gitlab.com/blog/2016/03/18/fast-search-using-postgresql-trigram-indexes/
ALTER TABLE products ADD COLUMN ts tsvector GENERATED ALWAYS AS (to_tsvector('english', name)) STORED;
CREATE INDEX ts_idx ON products USING GIN (ts gin_trgm_ops);


CREATE INDEX product_name_idx ON products USING gin (name gin_trgm_ops);
 */

module.exports = { Product, categoryFilter, productSort, paginate, productSearch };
