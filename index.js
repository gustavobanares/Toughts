import express from "express";
import exphbs from "express-handlebars";
import session from "express-session";
import FileSotre from "session-file-store";
import flash from "express-flash";
import conn from "./db/conn.js";

const app = express();

conn
  .sync()
  .then(() => {
    app.listen(3001);
  })
  .catch((err) => console.log(err));
