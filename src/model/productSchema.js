const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: [true, "product name is required"],
            trim: true,
        },
        slug: {
            type: String,
            require: true,
            unique: true,
        },
        price: {
            type: Number,
            require: [true, "product price is required"],
        },
        discription: {
            type: String,
            require: [true, "Product discription is here"],
            trim: true,
        },
        offer: {
            type: Number,
        },
        productPictures: [
            {
                img: { type: String },
            },
        ],
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
        },
        review: [
            // the person who gives the review must have the account and also logged in User
            {
                userId: mongoose.Schema.Types.ObjectId,
                ref: "User",
                review: String,
            },
        ],
        createdBy: {
            // admin id is required who is going to add the products in the stocks
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            updatedAt: Date,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Product", productSchema);
