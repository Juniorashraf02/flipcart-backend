const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Category name required"],
            trim: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        // when we add sub categories then we need to specify the parent id
        parentId: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Category", categorySchema);
