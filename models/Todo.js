const mongoose = require("mongoose");

// const todoSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   date: { type: String },
//   content: { type: String },
//   createdAt: { type: Date, default: Date.now },
//   slug: {
//     type: String,
//     required: true,
//     unique: true,
//   },
// });

module.exports = mongoose.model("Todo", todoSchema);
