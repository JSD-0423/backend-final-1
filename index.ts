import http from "http";
import app from "./app";
import Database from "./database/Database";
import environment from "./config/environment";

const port = environment.port;

const server = http.createServer(app);

Database.getInstance()
  .sync()
  .then(() => {
    server.listen(port, () => console.log("The server is running now!!"));
  })
  .catch(console.log);
