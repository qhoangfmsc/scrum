const { sequelize } = require("../services/common");
const { DataTypes, Op } = require("sequelize");

const Account = sequelize.define(
  "account",
  {
    id: {
      type: DataTypes.STRING(25),
      primaryKey: true,
    },
    role_id: {
      type: DataTypes.STRING(25),
      allowNull: false,
      references: {
        model: "role",
        key: "id",
      },
    },
    name: {
      type: DataTypes.STRING(255),
    },
    email: {
      type: DataTypes.STRING(255),
      unique: true,
    },
    password: {
      type: DataTypes.STRING(100),
    },
    active_date: {
      type: DataTypes.STRING(25),
    },
    del_fag: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    timestamp: {
      type: DataTypes.STRING(25),
    },
  },
  {
    timestamps: false,
  }
);

async function insertAccount(id, role_id, name, email, password, timestamp) {
  try {
    await Account.create({
      id: id,
      role_id: role_id,
      name: name,
      email: email,
      password: password,
      del_fag: false,
      timestamp,
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function getAccountByEmailAndRole(email, role_id) {
  try {
    const data = await Account.findAll({
      where: {
        [Op.and]: [
          {
            email: {
              [Op.eq]: email,
            },
          },
          {
            role_id: {
              [Op.eq]: role_id,
            },
          },
        ],
      },
    });
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

async function getAccountById(userId) {
  return await Account.findAll({
    attributes: ["id", "email", "name"],
    where: {
      id: {
        [Op.eq]: userId,
      },
    },
  });
}

async function getAccountByIdAndRole(userId, role_id) {
  return await Account.findAll({
    attributes: ["email", "name"],
    where: {
      [Op.and]: [
        {
          id: {
            [Op.eq]: userId,
          },
        },
        {
          role_id: {
            [Op.eq]: role_id,
          },
        },
      ],
    },
  });
}

module.exports = { Account, insertAccount, getAccountByEmailAndRole, getAccountById, getAccountByIdAndRole };
