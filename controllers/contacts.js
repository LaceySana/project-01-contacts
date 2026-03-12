const mongodb = require('../database/contacts');
console.log(mongodb);
const objectId = require('mongodb').ObjectId;

const getAllContacts = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('contacts').find();
    result.toArray().then((contacts) => {
        res.setHeader('Contact-Type', 'application/json');
        res.status(200).json(contacts);
    });
};

const getContactById = async (req, res) => {
    const contactId = new objectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('contacts').find({ _id: contactId });
    result.toArray().then((contacts) => {
        res.setHeader('Contact-Type', 'application/json');
        res.status(200).json(contacts[0]);
    });
};

const createContact = async (req, res) => {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;
    const result = await mongodb.getDatabase().db().collection('contacts').insertOne({
        firstName: firstName,
        lastName: lastName,
        email: email,
        favoriteColor: favoriteColor,
        birthday: birthday
    });
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result.insertedId);
};

const updateContact = async (req, res) => {
    const contactId = new objectId(req.params.id);
    const update = {
        ...(req.body.firstName && { firstName: req.body.firstName }),
        ...(req.body.lastName && { lastName: req.body.lastName }),
        ...(req.body.email && { email: req.body.email }),
        ...(req.body.favoriteColor && { favoriteColor: req.body.favoriteColor }),
        ...(req.body.birthday && { birthday: req.body.birthday })
    };
    const result = await mongodb
        .getDatabase()
        .db()
        .collection('contacts')
        .updateOne({ _id: contactId }, { $set: update });
    if (!result.modifiedCount) {
        res.setHeader('Content-Type', 'application/json');
        res.status(500).json('Update not successful');
    } else {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json('Update successful');
    }
};

const deleteContact = async (req, res) => {
    const contactId = new objectId(req.params.id);
    const result = await mongodb
        .getDatabase()
        .db()
        .collection('contacts')
        .deleteOne({ _id: contactId });
    res.setHeader('Content-Type', 'application/json');
    result.deletedCount !== 0
        ? res.status(200).json('Contact deleted successfully.')
        : res.status(500).json('No matching contact found.');
};

module.exports = {
    getAllContacts,
    getContactById,
    createContact,
    updateContact,
    deleteContact
};
