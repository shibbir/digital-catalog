const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const FileSchema = require("../../core/server/file.model");

const ItemSchema = Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    description: String,
    categoryId: {
        required: true,
        type: Schema.Types.ObjectId
    },
    brandId: {
        required: true,
        type: Schema.Types.ObjectId
    },
    retailerId: {
        ref: "Retailer",
        type: Schema.Types.ObjectId
    },
    tags: Array,
    purchaseDate: Date,
    price: Number,
    currency: {
        type: String,
        required: true,
        enum: ["AUD", "BDT", "BGN", "CAD", "CNY", "EUR", "GBP", "INR", "JPY", "NZD", "RUB", "SGD", "USD"]
    },
    files: [ FileSchema ],
    createdBy: {
        ref: "User",
        required: true,
        type: Schema.Types.ObjectId
    },
    date: {
        type: Date,
        default: Date.now
    }
}, { toJSON: { virtuals: true } });

ItemSchema.virtual("category", {
    justOne: true,
    ref: "Category",
    foreignField: "_id",
    localField: "categoryId"
});

ItemSchema.virtual("brand", {
    ref: "Brand",
    justOne: true,
    foreignField: "_id",
    localField: "brandId"
});

ItemSchema.virtual("retailer", {
    ref: "Retailer",
    justOne: true,
    foreignField: "_id",
    localField: "retailerId"
});

module.exports = mongoose.model("Item", ItemSchema);
