const { sequelize } = require("../services/common");
const { Companies } = require("./companies");

//console.clear();

sequelize
  .authenticate()
  .then(console.log("\nConnect database successfully"))
  .catch((err) => {
    console.log(err);
  });

console.log("\nAssociation done!!\n");
