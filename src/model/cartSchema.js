const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            require: [true, "User is required"],
        },
        // one user can buy mulitple products so cartItems is a array and it can stores multiple products
        cartItems: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    require: [true, "product id required"],
                },
                quantity: { type: Number, default: 1 }, // default quantity 1
                price: { type: Number, require: [true, "Price is required"] },
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Cart", cartSchema);
