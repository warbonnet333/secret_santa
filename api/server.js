const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const santasRouter = require("./santas/santas.router");

require("dotenv").config();

module.exports = class SantaServer {
  constructor() {
    this.server = null;
    this.port = process.env.PORT || 8585;
  }

  async start() {
    this.initServer();
    this.initMiddlewares();
    this.initRoutes();
    await this.initDatabase();
    return this.startListening();
  }

  initServer() {
    this.server = express();
  }

  initMiddlewares() {
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: true }));

    if (
      process.env.NODE_ENV === "production" ||
      process.env.NODE_ENV === "staging"
    ) {
      // Serve any static files
      this.server.use(express.static(path.join(__dirname + "../client/build")));

      // Handle React routing, return all requests to React app
      this.server.get("*", function (req, res) {
        res.sendFile(path.join(__dirname, "../client/build", "index.html"));
      });
    }

    // this.server.use('/', createProxyMiddleware({
    //   target: 'http://localhost:8585',
    //   changeOrigin: true,
    // }));
    // this.server.use(express.static("public"));
  }

  async initDatabase() {
    
    try {
      await mongoose.connect(process.env.SANTAS_UTL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      });
    } catch (error) {
      console.log("error", error);
      process.exit(1);
    }
  }

  initRoutes() {
    this.server.use("/santas", santasRouter);
  }

  startListening() {
    return this.server.listen(this.port, () => {
      console.log("Database connection successful...", this.port);
    });
  }
};
