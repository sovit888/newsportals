const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  author: { type: String, required: true },
  picture: { type: String, required: true },
  category: { type: String, required: true },
  date: { type: Date, default: Date.now() },
});
mongoose.model("tblpost", postSchema);
