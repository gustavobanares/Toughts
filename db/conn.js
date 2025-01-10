import { Sequelize } from "sequelize";

const sequelize = new Sequelize("toughts", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

try {
  sequelize.authenticate();
  console.log("Conectamos com sucesso");
} catch (error) {
  console.log(`Nao foi possivel conectar ${err}`);
}

export default sequelize
