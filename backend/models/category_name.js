const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
const categoryNameSchema = mongoose.Schema({
  category_name: { type: String, required: true , unique : true},
});
categoryNameSchema.plugin(uniqueValidator);
module.exports = mongoose.model("CategoryName", categoryNameSchema);
