const express = require("express");
const mongoose = require("mongoose");

const SellerPost = require("../models/SellerPost");
const BuyerOffersForSeller = require("../models/BuyerOffersForSeller");

exports.sellerAddPost = async (req, res) => {
    const sellerId = req.body.sellerId;
    const sellerName = req.body.sellerId;
    const postType = req.body.postType;
    const buyer = req.body.buyer;
    const sellerDistrict = req.body.district;
    const address = req.body.address;
    const location = req.body.location;
    const contact = Number(req.body.contact);
    const thumbnail = req.body.thumbnail;
    const wasteItemList = req.body.wasteItemList;

    const newSellerPost = new SellerPost({
        sellerId,
        sellerName,
        postType,
        buyer,
        sellerDistrict,
        address,
        location,
        contact,
        thumbnail,
        wasteItemList
    })
    try {
        await newSellerPost.save();

        res.status(201).json(newSellerPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }

};

exports.sellerViewPosts = async (req, res) => {

    let sellerIdd = req.params.id;

    SellerPost.find({ "sellerId": sellerIdd }).exec((err, posts) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: true,
            existingPosts: posts
        });
    });

    
}

exports.sellerViewOffers = async (req, res) => {
    let seller = req.params.id;
    BuyerOffersForSeller.find({ "sellerId": seller, "status": "pending" }).exec((err, posts) => {
        
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: true,
            existingOffers: posts
        });
    });

    
}

exports.sellerViewOnePostDetails = async (req, res) => {
    let postId = req.params.id;
    var post = {};
    SellerPost.findOne({ "_id": postId }).exec((err, posts) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }   
        post = posts;
        BuyerOffersForSeller.find({ "postId": postId, "status": "pending", "wasteItemsListId":"completePost" }).exec((err2, offers) => {
            if (err2) {
                return res.status(400).json({
                    error: err2
                });
            }
            return res.status(200).json({
                success: true,     
                post: post,
                offer: offers,
            });
        }); 
    });
    
    
}

exports.sellerAcceptPostOffer = async (req, res) => {
    const { id } = req.params;
    const { status, postId } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    const updatedOffer = { status };
    await BuyerOffersForSeller.updateMany({ "postId": postId, "_id": { $ne: id } }, { $set: { status: "Decline" } });
    
    await BuyerOffersForSeller.findByIdAndUpdate(id, updatedOffer, { new: true });
    
    res.json("Offer Accepted");
}

exports.sellerViewAcceptedOffers = async (req, res) => {
    BuyerOffersForSeller.find({ buyerName: "harshana" , status:"accepted" }).exec((err, posts) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            sucess: true,
            existingPosts: posts
        });
    });

}