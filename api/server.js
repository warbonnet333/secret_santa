const express = require("express");
const mongoose = require("mongoose");
const santasRouter = require("./santas/santas.router");
const MongoClient = require("mongodb").MongoClient;
const { createProxyMiddleware } = require('http-proxy-middleware');

require("dotenv").config();

module.exports = class SantaServer {
  constructor() {
    this.server = null;
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
    console.log(process.env.NODE_ENV)
    return this.server.listen(process.env.PORT, () => {
      console.log("Database connection successful...", process.env.PORT);
    });
  }
};
