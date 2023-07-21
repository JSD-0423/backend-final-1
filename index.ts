import https from "https";
import app from "./app";
import Database from "./database/Database";
import environment from "./config/environment";

const port = environment.port;

const server = https.createServer(app);

Database.getInstance()
  .sync()
  .then(() => {
    server.listen(port, () => console.log(`app is running on prot: ${port}`));
  })
  .catch(console.log);
