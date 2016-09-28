var donations = require('../models/donations');
var express = require('express');
var router = express.Router();

router.findAll = function(req, res) {
    // Return a JSON representation of our list
    res.json(donations);
}

router.findOne = function(req, res) {

    var donation = getByValue(donations,req.params.id);

    if(donation != null)
        res.json(donation);
    else
        res.json({ message: 'Donation NOT Found!'});
}

router.addDonation = function(req, res) {
    //Add a new donation to our list
    var id = Math.floor((Math.random() * 1000000) + 1); //Randomly generate an id
    var currentSize = donations.length;
    donations.push({"id":id,"paymenttype":req.body.paymenttype,"amount":req.body.amount,"upvotes":0});

    if((currentSize + 1) == donations.length)
        res.json({ message: 'Donation Added!'});
    else
        res.json({ message: 'Donation NOT Added!'});
}

router.incrementUpvotes = function(req, res) {
    //Add 1 to upvotes property of the selected donation based on its id
    var donation = getByValue(donations,req.params.id);
    donation.upvotes += 1;
}

router.deleteDonation = function(req, res) {
    //Delete the selected donation based on its id
    var donation = getByValue(donations,req.params.id);
    var index = donations.indexOf(donation);

    var currentSize = donations.length;
    donations.splice(index, 1);

    if((currentSize - 1) == donations.length)
        res.json({ message: 'Donation Deleted!'});
    else
        res.json({ message: 'Donation NOT Deleted!'});
}

module.exports = router;

function getByValue(arr, id) {

    var result  = arr.filter(function(o){return o.id == id;} );

    return result ? result[0] : null; // or undefined
}

