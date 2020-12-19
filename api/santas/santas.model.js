const { resolveSrv } = require("dns");
const mongoose = require("mongoose");
// const mongoosePaginate = require("mongoose-paginate-v2");
const { Schema } = mongoose;

require("dotenv").config();

const santaScheme = new Schema({
  name: { type: String, required: true },
  limit: { type: String, required: true },
  admin: { type: String, required: true },
  isPlayed: { type: Boolean, required: false, default: false },
  players: [{ name: String, email: String, prenestsTo: String, logo: String }],
});

// async function findContactByEmail(email) {
async function findTeamByName(name) {
  return this.findOne({ name: name }).exec();
}

async function findTeamByEmail(email) {
  return this.findOne({players: [{email}]})
}

santaScheme.statics.findTeamByName = findTeamByName;
santaScheme.statics.findTeamByEmail = findTeamByEmail;

const santaModel = mongoose.model("santas", santaScheme);
module.exports = santaModel;
