const { insertCompany, getAllCompanies, updateCompany } = require("../models/companies");

module.exports = {
  createCompany: async function (req, res) {
    try {
      const name = req.body.name;
      const address = req.body.address;
      const career = req.body.career;
      const link = req.body.link;
      const avatar = req.body.avatar;
      const description = req.body.description;
      const requirement = req.body.requirement;

      const result = await insertCompany(name, address, career, link, avatar, description, requirement);
      if (result) {
        res.status(200).json({ result: "success", content: "Company added successfully!" });
      }
    } catch (err) {
      res.status(404).json({ result: "fail", content: "Company added fail!" });
    }
  },

  modifyCompany: async function (req, res) {
    try {
      const id = req.body.id;
      const name = req.body.name;
      const address = req.body.address;
      const career = req.body.career;
      const link = req.body.link;
      const avatar = req.body.avatar;
      const description = req.body.description;
      const requirement = req.body.requirement;

      const result = await updateCompany(id, name, address, career, link, avatar, description, requirement);
      if (result) {
        res.status(200).json({ result: "success", content: "Company update successfully!" });
      }
    } catch (err) {
      res.status(404).json({ result: "fail", content: "Company update fail!" });
    }
  },

  displayAllCompanies: async function (req, res) {
    try {
      const data = await getAllCompanies();
      for (let i = 0; i < data.length; i++) {
        const careerArray = data[i].career.split(", ");
        data[i].career = careerArray;
      }
      if (data) {
        res.status(200).json({ result: "success", content: data });
      }
    } catch (err) {
      res.status(404).json({ result: "fail", content: "Get companies fail!" });
    }
  },
};
