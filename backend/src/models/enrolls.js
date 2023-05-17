const { sequelize } = require("../services/common");
const { DataTypes, Op, QueryTypes } = require("sequelize");

const Enrolls = sequelize.define(
  "enrolls",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    accountid: {
      type: DataTypes.INTEGER,
    },
    companyid: {
      type: DataTypes.INTEGER,
    },
    career: {
      type: DataTypes.STRING(50),
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

async function insertEnrollment(accountid, companyid, career) {
  try {
    await Enrolls.create({
      accountid: accountid,
      companyid: companyid,
      career: career,
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function getAllEnrollments() {
  try {
    const data = await sequelize.query("Select * from Enrolls", { type: QueryTypes.SELECT });
    return data;
  } catch (err) {
    return false;
  }
}

async function getEnrollmentById(id) {
  try {
    const data = await sequelize.query("Select * from enrolls where id = '" + id + "'", {
      type: QueryTypes.SELECT,
    });
    return data;
  } catch (err) {
    return false;
  }
}

module.exports = {
  Enrolls,
  insertEnrollment,
  getAllEnrollments,
  getEnrollmentById,
};
