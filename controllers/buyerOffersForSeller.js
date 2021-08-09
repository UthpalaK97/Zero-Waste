const express = require("express");
const mongoose = require("mongoose");

const BuyerOffersForSeller = require("../models/BuyerOffersForSeller");

exports.addSellerOffer= async (req,res)=>{
    const { value, expiryDate, collectingDate, collectingTime, quantity, status, buyerName, buyerEmail, postId, wasteItemsListId } = req.body;

    const newSellerOffer = new BuyerOffersForSeller({ value, expiryDate, collectingDate, status, collectingTime, quantity, buyerName, buyerEmail, postId, wasteItemsListId})

    try {
        await newSellerOffer.save();

        res.status(201).json(newSellerOffer);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

exports.viewPendingSellerOffers= async (req,res)=>{
    BuyerOffersForSeller.find().exec((err,offers)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingOffers:offers
        });
    });
}

exports.deletePendingSellerOffer = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await BuyerOffersForSeller.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}

exports.editPendingSellerOffer = async (req, res) => {
    const { id } = req.params;
    const { value, expiryDate, collectingDate, collectingTime, quantity } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { value, expiryDate, collectingDate, collectingTime, quantity, _id: id };

    await BuyerOffersForSeller.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

exports.buyerGetOneSellerOffer= async (req,res)=>{
    let offerId = req.params.id;

    BuyerOffersForSeller.findById(offerId,(err,offer)=>{
        if(err){
            return res.status(400).json({success:false, err});
        }
        return res.status(200).json({
            success:true,
            oneOffer:offer
        })
    })
}