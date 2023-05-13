const { sequelize } = require("../services/common");
const { DataTypes, Op, QueryTypes } = require("sequelize");

const Companies = sequelize.define(
  "companies",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(255),
    },
    address: {
      type: DataTypes.STRING(255),
    },
    career: {
      type: DataTypes.STRING(255),
    },
    link: {
      type: DataTypes.STRING(255),
    },
    avatar: {
      type: DataTypes.STRING(255),
    },
    description: {
      type: DataTypes.STRING(500),
    },
    requirement: {
      type: DataTypes.STRING(500),
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

async function insertCompany(name, address, career, link, avatar, description, requirement) {
  try {
    await Companies.create({
      name: name,
      address: address,
      career: career,
      link: link,
      avatar: avatar,
      description: description,
      requirement: requirement,
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function updateCompany(id, name, address, career, link, avatar, description, requirement) {
  try {
    await Companies.update(
      {
        name: name,
        address: address,
        career: career,
        link: link,
        avatar: avatar,
        description: description,
        requirement: requirement,
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

async function insertCompany(name, address, career, link, avatar, description, requirement) {
  try {
    await Companies.create({
      name: name,
      address: address,
      career: career,
      link: link,
      avatar: avatar,
      description: description,
      requirement: requirement,
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function getAllCompanies() {
  try {
    const data = await sequelize.query("Select * from companies", { type: QueryTypes.SELECT });
    return data;
  } catch (err) {
    return false;
  }
}

module.exports = { Companies, insertCompany, updateCompany, getAllCompanies };
