const express = require("express");
const SnataController = require("./santas.controller");
// const multer = require("multer");
// const path = require("path");

const santasRouter = express.Router();

santasRouter.get("/teams/:email", SnataController.getPlayerBeEmail);
santasRouter.get("/find/:id/:email", SnataController.findSantaName);
santasRouter.get("/:id", SnataController.findTeamById);
santasRouter.put("/:id", SnataController.addPlayer);
santasRouter.put("/playgame/:id", SnataController.startSanta);
santasRouter.put("/delete/:id", SnataController.deletePlayer);
santasRouter.post("/", SnataController.addTeam);
santasRouter.delete("/:id", SnataController.deleteTeam);

module.exports = santasRouter;
