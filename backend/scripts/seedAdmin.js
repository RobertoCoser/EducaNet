const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");
const sequelize = require("../database");

async function seedAdmin() {
  await sequelize.sync();

  const email = "admin@email.com";
  const password = "123";

  const hash = await bcrypt.hash(password, 10);

  const [admin, created] = await Admin.findOrCreate({
    where: { email },
    defaults: { password: hash },
  });

  if (created) {
    console.log(`Admin criado: ${email}`);
  } else {
    console.log(`Admin já existe: ${email}`);
  }
  process.exit();
}

seedAdmin();
