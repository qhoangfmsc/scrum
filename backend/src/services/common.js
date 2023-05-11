require("dotenv").config();
const { Sequelize } = require("sequelize");

const db_config = {
  host: process.env.HOST,
  user: process.env.DB_USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE_NAME,
};

const sequelize = new Sequelize(db_config.database, db_config.user, db_config.password, {
  host: db_config.host,
  dialect: "mysql",
  define: {
    freezeTableName: true,
  },
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  timezone: "+07:00",
});

// API pagination
const pagination = {
  currentPage: 1,
  hasNext: false,
  hasPrevious: false,
  items: [],
  pages: 1,
  size: 0,
  total: 0,
};

const checkNextAndPreviousPage = (page, totalPages) => {
  let hasNext = false;
  let hasPrevious = false;
  // check if current page has next page and previous page
  if (page === totalPages) {
    hasNext = false;
  }
  if (page < totalPages) {
    hasNext = true;
  }
  if (page > 1 && page <= totalPages) {
    hasPrevious = true;
  }

  return { hasNext: hasNext, hasPrevious: hasPrevious };
};

module.exports = { db_config, sequelize, pagination, checkNextAndPreviousPage };
