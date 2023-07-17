import http from "http";
import app from "./app";
import Database from "./database/Database";
import environment from "./config/environment";

const port = environment.port;

const server = http.createServer(app);

Database.getInstance()
  .sync({ force: true })
  .then(() => {
    server.listen(port, () => console.log(`app is running on prot: ${port}`));
  })
  .catch(console.log);
