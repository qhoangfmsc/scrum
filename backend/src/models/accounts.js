const { sequelize } = require("../services/common");
const { DataTypes, Op, QueryTypes } = require("sequelize");

const Accounts = sequelize.define(
  "accounts",
  {
    id: {
      type: DataTypes.STRING(50),
      primaryKey: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(255),
    },
    password: {
      type: DataTypes.STRING(255),
    },
    name: {
      type: DataTypes.STRING(255),
    },
    skill: {
      type: DataTypes.STRING(255),
    },
    createdAt: {
      type: DataTypes.DATE,
    },
  },
  {
    timestamps: true,
    createdAt: true,
    updatedAt: false,
  }
);

async function insertAccount(id, username, password, name, skill) {
  try {
    await Accounts.create({
      id: id,
      username: username,
      name: name,
      skill: skill,
      password: password,
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function getAccountByIdAndPassword(id, password) {
  try {
    const data = await sequelize.query(
      "select * from accounts where id ='" + id + "' and password ='" + password + "'",
      { type: QueryTypes.SELECT }
    );
    if (data.length > 0) {
      return data;
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function updateAccountPassword(id, password) {
  try {
    await Accounts.update(
      {
        password: password,
      },
      {
        where: {
          id: id,
        },
      }
    );
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function getAllAccounts() {
  try {
    const data = await sequelize.query("Select * from accounts", { type: QueryTypes.SELECT });
    return data;
  } catch (err) {
    return false;
  }
}

async function getAccountPasswordById(id) {
  try {
    const data = await sequelize.query("Select password from accounts where id = '" + id + "'", {
      type: QueryTypes.SELECT,
    });
    return data;
  } catch (err) {
    return false;
  }
}

async function getAccountById(id) {
  try {
    const data = await sequelize.query("Select * from accounts where id = '" + id + "'", {
      type: QueryTypes.SELECT,
    });
    return data;
  } catch (err) {
    return false;
  }
}

module.exports = {
  Accounts,
  insertAccount,
  updateAccountPassword,
  getAccountPasswordById,
  getAllAccounts,
  getAccountById,
  getAccountByIdAndPassword,
};
