const { insertCompany, getAllCompanies } = require("../models/companies");

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
      res.status(500).send({ result: "fail", content: "Company added fail!" });
    }
  },

  displayAllCompanies: async function (req, res) {
    try {
      const data = await getAllCompanies();

      if (data) {
        res.status(200).json({ result: "success", content: data });
      }
    } catch (err) {
      res.status(500).send({ result: "fail", content: "Get companies fail!" });
    }
  },
  // createCompany: async function (req, res) {
  //   try {
  //     // const reqString = req.body;
  //     console.log("Req", req.body);

  //     // const reqObject = JSON.parse(reqString);

  //     // const name = reqObject.name;
  //     // const address = reqObject.address;
  //     // const career = reqObject.career;
  //     // const link = reqObject.link;
  //     // const avatar = reqObject.avatar;
  //     // const description = reqObject.description;
  //     // const requirement = reqObject.requirement;

  //     // console.log("Test", name, address, career, link, avatar, description, requirement);

  //     const result = await insertCompany(name, address, career, link, avatar, description, requirement);
  //     if (result) {
  //       res.status(200).json({ result: "success", content: "Company added successfully!" });
  //     }
  //   } catch (err) {
  //     res.status(500).send({ result: "fail", content: "Company added fail!" });
  //   }
  // },
};
