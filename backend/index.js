const express = require("express");
const cors = require("cors");
const sequelize = require("./database");
const schoolRoutes = require("./routes/schools");
const classRoutes = require("./routes/classes");
const studentRoutes = require("./routes/students");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use("/api/schools", schoolRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/students", studentRoutes);

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Banco de dados sincronizado");
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Erro ao conectar ao MySQL:", err);
  });
