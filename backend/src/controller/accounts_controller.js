const {
  insertAccount,
  getAllAccounts,
  updateAccountPassword,
  getAccountById,
  getAccountPasswordById,
  generateAccountSessionKey,
  checkAccountSessionKey,
  deleteAccountSessionKey,
  getAccountByIdAndPassword,
} = require("../models/accounts");
const bcrypt = require("bcryptjs");
const funtioncs = require("../global/functions");
const generateRandomString = funtioncs.generateRandomString;

module.exports = {
  createAccount: async function (req, res) {
    try {
      const id = req.body.id;
      const degree = req.body.degree;
      const username = req.body.username;
      const password = req.body.password;
      const skill = req.body.skill;
      let hashedPassword = "";

      // Hash password
      bcrypt.genSalt(10, function (err, Salt) {
        bcrypt.hash(password, Salt, async function (err, hash) {
          if (err) {
            res.status(200).json({ result: "fail", content: "there is an error while register account" });
            return console.log("Cannot encrypt");
          }

          hashedPassword = hash;
          // Insert account into database
          const check = await getAccountById(id);
          if (check.length == 1) {
            res.status(404).json({ result: "fail", content: "This ID is already exists" });
          } else {
            const result = await insertAccount(id, username, hashedPassword, degree, skill);
            if (result) {
              res.status(200).json({ result: "success", content: "Register account successfully" });
            } else {
              res.status(404).json({ result: "fail", content: "Register account fail!" });
            }
          }
        });
      });
    } catch (err) {
      res.status(404).json({ result: "fail", content: err });
    }
  },

  logoutAccount: async function (req, res) {
    try {
      const id = req.body.id;
      const result = await deleteAccountSessionKey(id);
      if (result) {
        res.status(200).json({ result: "success", content: "Logout successfully" });
      } else {
        res.status(404).json({ result: "fail", content: "Logout fail!" });
      }
    } catch (err) {
      res.status(404).json({ result: "fail", content: err });
    }
  },

  checkAccountSession: async function (req, res) {
    try {
      const id = req.body.id;
      const result = await checkAccountSessionKey(id);
      if (result.length == 1) {
        res.status(200).json({ result: "success", content: "Session key exist" });
      } else {
        res.status(404).json({ result: "fail", content: "Session key doesnt exist!" });
      }
    } catch (err) {
      res.status(404).json({ result: "fail", content: err });
    }
  },

  loginAccount: async function (req, res) {
    try {
      const id = req.body.id;
      const password = req.body.password;
      // Check if given account is exists
      let account = await getAccountById(id);
      if (account === null) {
        res.status(404).json({ result: "fail", content: "Account not exists or invalid login info" });
      } else {
        account = account[0];
        const hashedPassword = account.password;
        bcrypt.compare(password, hashedPassword, async function (err, isMatch) {
          if (err) {
            res.status(404).json({ result: "fail", content: "Check input data again" });
            return;
          }
          if (!isMatch) {
            res.status(404).json({ result: "fail", content: "Password is incorrect" });
            return;
          } else {
            const sessionKey = generateRandomString();
            generateAccountSessionKey(id, sessionKey);
            res.status(200).json({ result: "success", content: "Login successfully" });
            return;
          }
        });
      }
    } catch (err) {
      res.status(404).json({ result: "fail", content: err });
    }
  },

  changePassword: async function (req, res) {
    try {
      const id = req.body.id;
      const oldpassword = req.body.oldpassword;
      const newpassword = req.body.newpassword;

      let saved_oldpassword = await getAccountPasswordById(id);
      saved_oldpassword = saved_oldpassword[0].password;

      bcrypt.compare(oldpassword, saved_oldpassword, async function (err, isMatch) {
        if (err) {
          res.status(404).json({ result: "fail", content: err });
          return;
        }
        if (!isMatch) {
          res.status(404).json({ result: "fail", content: "Your current password is not matching" });
          return;
        } else {
          bcrypt.compare(newpassword, saved_oldpassword, async function (err, isMatch) {
            if (err) {
              res.status(404).json({ result: "fail", content: err });
              return;
            }
            if (isMatch) {
              res.status(404).json({ result: "fail", content: "New password can not be same to old password" });
              return;
            } else {
              bcrypt.genSalt(10, function (err, Salt) {
                bcrypt.hash(newpassword, Salt, async function (err, hash) {
                  if (err) {
                    res.status(404).json({ result: "fail", content: err });
                    return;
                  }
                  let newHashedPassword = hash;
                  const result = await updateAccountPassword(id, newHashedPassword);
                  if (result) {
                    res.status(200).json({ result: "success", content: "Change password successfully!" });
                    return;
                  } else {
                    res.status(404).json({ result: "fail", content: "Change password fail!" });
                    return;
                  }
                });
              });
            }
          });
        }
      });
    } catch (err) {
      res.status(404).json({ result: "fail", content: err });
    }
  },

  displayAllAccounts: async function (req, res) {
    try {
      const data = await getAllAccounts();
      if (data.length > 0) {
        res.status(200).json({ result: "success", content: data });
      } else res.status(404).json({ result: "fail", content: "Get accounts fail!" });
    } catch (err) {
      res.status(404).json({ result: "fail", content: err });
    }
  },
};
