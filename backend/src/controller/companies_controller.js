const { insertCompany, getAllCompanies, updateCompany, getCompanyById, jobFiltering } = require("../models/companies");

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
      } else res.status(200).json({ result: "fail", content: "Company added fail!" });
    } catch (err) {
      res.status(404).json({ result: "fail", content: err });
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
      } else res.status(200).json({ result: "fail", content: "Company update fail!" });
    } catch (err) {
      res.status(404).json({ result: "fail", content: err });
    }
  },

  displayAllCompanies: async function (req, res) {
    try {
      const data = await getAllCompanies();
      if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          const careerArray = data[i].career.replaceAll(" ", "").split(",");
          data[i].career = careerArray;
        }
        res.status(200).json({ result: "success", content: data });
      } else res.status(200).json({ result: "fail", content: "Get all companies fail" });
    } catch (err) {
      res.status(404).json({ result: "fail", content: err });
    }
  },

  displayCompanyInfo: async function (req, res) {
    try {
      const id = req.body.id;
      const data = await getCompanyById(id);
      if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          const careerArray = data[i].career.replaceAll(" ", "").split(",");
          data[i].career = careerArray;
        }
        res.status(200).json({ result: "success", content: data });
      } else res.status(200).json({ result: "fail", content: "Get company's information fail" });
    } catch (err) {
      res.status(404).json({ result: "fail", content: err });
    }
  },

  filtering: async function (req, res) {
    try {
      const value = req.body.value;
      const data = await jobFiltering(value);
      if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          const careerArray = data[i].career.replaceAll(" ", "").split(",");
          data[i].career = careerArray;
        }
        res.status(200).json({ result: "success", content: data });
      } else res.status(200).json({ result: "fail", content: "Filtering fail!" });
    } catch (err) {
      res.status(404).json({ result: "fail", content: err });
    }
  },
};
