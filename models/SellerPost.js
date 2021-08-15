const mongoose = require("mongoose");

const WasteItem = new mongoose.Schema({
    wasteType: String,
    item: String,
    avbDate: Date,
    quantity: Number,
    selectedFile: String,
})

const Location = new mongoose.Schema({
    latitude: Number,
    longitude: Number,
})
const postSchema = new mongoose.Schema({
    sellerId: String,
    postType: String,
    buyer: String,
    address: String,
    contact: Number,
    location: Location,
    createdAt: {
        type: Date,
        default: new Date(),
    },
    wasteItemList: [WasteItem],
    
})

const SellerPost = mongoose.model("SellerPost", postSchema);

module.exports = SellerPost;