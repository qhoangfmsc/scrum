const { insertEnrollment, getAllEnrollments, getEnrollmentById } = require("../models/enrolls");

module.exports = {
  createEnrollment: async function (req, res) {
    try {
      const accountid = req.body.accountid;
      const companyid = req.body.companyid;
      const career = req.body.career;

      const result = await insertEnrollment(accountid, companyid, career);
      if (result) {
        res.status(200).json({ result: "success", content: "Enrollment added successfully!" });
      } else res.status(200).json({ result: "fail", content: "Enrollment added fail!" });
    } catch (err) {
      res.status(404).json({ result: "fail", content: err });
    }
  },

  displayAllEnrollments: async function (req, res) {
    try {
      const data = await getAllEnrollments();
      if (data.length > 0) {
        res.status(200).json({ result: "success", content: data });
      } else res.status(200).json({ result: "fail", content: "Get all companies fail" });
    } catch (err) {
      res.status(404).json({ result: "fail", content: err });
    }
  },

  displayEnrollmentInfo: async function (req, res) {
    try {
      const id = req.body.id;
      const data = await getEnrollmentById(id);
      if (data.length > 0) {
        res.status(200).json({ result: "success", content: data });
      } else res.status(200).json({ result: "fail", content: "Get Enrollment's information fail" });
    } catch (err) {
      res.status(404).json({ result: "fail", content: err });
    }
  },
};
